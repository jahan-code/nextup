# Plan: Creator Leave & End Stream When Everyone Leaves

## Current behavior

- **Creator** is stored in both `Room.creatorId` and as a `RoomMember` with `role: CREATOR`.
- **Leave** (`POST /api/rooms/[id]/leave`): Only non-creator members can leave. Creator gets "Room creator cannot leave. Delete the room instead." and the Leave button is disabled for them.
- There is **no "delete room"** or "end room" API today.
- When the last **non-creator** leaves, the room stays open with only the creator in it; nothing special happens.

## Goals

1. **When the creator leaves** → Decide who becomes the next creator (or end the room if no one else is there).
2. **When everyone has left** → End the stream/room (so the room does not stay open with 0 people).

---

## Recommended behavior

### 1. When the creator leaves

- **If there is at least one other member**
  - **Transfer creator** to one existing member.
  - **Who becomes the next creator?** Recommended: **oldest remaining member** (first `joinedAt`), so the person who has been in the room longest becomes the new host. Alternative: first by user id for deterministic behavior.
  - Steps:
    1. Find remaining members (excluding the leaving creator), ordered by `joinedAt` asc.
    2. Pick the first one as the new creator.
    3. Update `Room.creatorId` to that user’s id.
    4. Update that member’s `RoomMember.role` from `MEMBER` to `CREATOR`.
    5. Delete the leaving creator’s `RoomMember` row.
  - Result: Room continues with a new creator; stream keeps playing.

- **If the creator is the only member**
  - Do **not** transfer (no one to transfer to).
  - **End the room**: delete the room (or mark it ended). Cascades will remove all `RoomMember` and `RoomStream` rows.
  - Result: Stream is ended; room no longer exists (or is hidden if you add an "ended" status later).

### 2. When any member leaves (including after a transfer)

- After removing that user from `RoomMember`, **check how many members are left** (count `RoomMember` for this room).
- **If count is 0** → **End the room**: delete the room (same as above).
- Result: "When everyone leaves, the stream gets ended."

### 3. Optional: explicit "End room" for creator

- You can add **DELETE /api/rooms/[id]** allowed only for the room creator.
- Action: delete the room (and cascade members/streams).
- Use case: Creator wants to end the stream for everyone without "leaving" first. Fits the same "stream gets ended" idea.

---

## Summary table

| Scenario                         | Action                                                                 |
|----------------------------------|------------------------------------------------------------------------|
| Creator leaves, others in room   | Transfer creator to oldest remaining member; remove creator from room. |
| Creator leaves, alone in room   | End room (delete).                                                     |
| Last non-creator leaves          | After removing member, member count = 0 → end room (delete).          |
| Creator explicitly "End room"   | Optional: DELETE room (creator only).                                   |

---

## Implementation outline

### Backend

1. **`POST /api/rooms/[id]/leave`** (extend current behavior)
   - If the user is **not** the creator:
     - Delete their `RoomMember` row.
     - Then: count remaining members for this room. If count = 0, delete the room (end stream).
   - If the user **is** the creator:
     - Count other members (excluding creator).  
       - If **no other members**: delete the room (end stream).  
       - If **there are other members**:  
         - Choose new creator = oldest remaining member (min `joinedAt`).  
         - Update `Room.creatorId` to that user.  
         - Update that member’s `RoomMember.role` to `CREATOR`.  
         - Delete the leaving creator’s `RoomMember` row.
   - Return success; clients can refetch room or listen for room closure.

2. **Optional: `DELETE /api/rooms/[id]`**
   - Allowed only if requester is `Room.creatorId`.
   - Delete the room (cascade clears members and room streams). Optionally notify via Ably that the room ended.

3. **Realtime (Ably)**
   - When creator is transferred: publish e.g. `room:creator_transferred` with new `creatorId` so UIs update.
   - When room is deleted: publish e.g. `room:ended` so clients can redirect (e.g. to room list or home).

### Frontend

1. **Leave button**
   - Allow creator to click "Leave" (remove `disabled={isRoomCreator}` and the "Creator cannot leave. Delete room instead."-only behavior).
   - After leave: if response is success and room no longer exists (e.g. 404 on refetch or `room:ended`), redirect to dashboard/room list and show "Room ended" or "You left the room."
   - If creator left but room continues (transfer), refetch room so the new creator and member list are shown.

2. **Optional: "End room" button**
   - Shown only to creator. Calls `DELETE /api/rooms/[id]`. On success, redirect and show "Room ended."

3. **Empty room**
   - If you ever show a room with 0 members (e.g. race condition), treat it as ended and redirect.

---

## "End room" = delete vs soft status

- **Delete room** (recommended for "stream gets ended"):
  - Simple: one action, DB cascades clean up members and room streams.
  - Room disappears from listings; no extra schema change.
- **Soft "ended" status** (e.g. `Room.status = 'active' | 'ended'`):
  - Lets you keep history or analytics. Requires schema change and filtering in "list rooms" (e.g. only `status = 'active'`).
  - You can add this later if you want to keep ended rooms for history.

---

## Edge cases

- **Concurrent leaves**: Two users leave at the same time; one might become new creator, then the other leave. Handle with normal DB updates; last leave that brings count to 0 deletes the room.
- **New creator’s role**: Ensure the new creator has exactly one `RoomMember` row with `role: CREATOR` (update existing row to CREATOR).
- **Ably**: If the leaving user is still subscribed, they might get `room:ended` or `room:creator_transferred` after they left; ignore or unsubscribe on leave.

---

## Next steps

1. Implement the updated **leave** logic in `POST /api/rooms/[id]/leave` (creator transfer + end when 0 members).
2. Optionally add **DELETE /api/rooms/[id]** for creator-only room end.
3. Update the room page UI so the creator can leave (and optionally add "End room").
4. Add Ably events for `room:creator_transferred` and `room:ended` if you use realtime updates.

---

## Implementation status

- **Leave route**: Implemented. Creator can leave (transfer or end room); last member leave ends room.
- **DELETE /api/rooms/[id]**: Implemented. Creator-only; deletes room (cascade clears members/streams).
- **Frontend**: Creator can leave; "End room" button for creator; redirect to `/rooms` on 404 (room ended).
- **Ably**: Not implemented server-side (Ably is client-only). Remaining members see new creator on next refetch.
