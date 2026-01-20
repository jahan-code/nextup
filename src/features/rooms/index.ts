// Rooms feature exports
export { RoomsService } from './services/rooms.service';

// Re-export types from centralized types
export type { RoomWithDetails, RoomListResponse } from '@/src/types/rooms';

// Re-export validation schemas from centralized validation
export { CreateRoomSchema, type CreateRoomInput } from '@/src/validation/rooms';


