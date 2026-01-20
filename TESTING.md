# Testing Guide for NextUp API

## Quick Start

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Access Swagger UI (Interactive Testing):**
   - Open: http://localhost:3000/docs
   - This provides an interactive interface to test all endpoints

3. **View API Documentation:**
   - Open: http://localhost:3000/api/docs
   - Returns the OpenAPI JSON specification

---

## Testing Methods

### Method 1: Swagger UI (Recommended - Easiest)

1. Start the server: `npm run dev`
2. Go to: http://localhost:3000/docs
3. Click on any endpoint to expand it
4. Click "Try it out"
5. Fill in the request body/parameters
6. Click "Execute"
7. See the response below

**Note:** For authenticated endpoints (upvote/downvote), you'll need to:
- First sign in via the app at http://localhost:3000
- Get your session cookie
- Use it in the Swagger UI (if supported) or use Method 2/3

---

### Method 2: Using cURL (Command Line)

#### 1. Create a Stream
```bash
curl -X POST http://localhost:3000/api/streams \
  -H "Content-Type: application/json" \
  -d '{
    "creatorId": "YOUR_USER_ID_HERE",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }'
```

#### 2. Get Streams by Creator
```bash
curl "http://localhost:3000/api/streams/upvote?creatorId=YOUR_USER_ID_HERE"
```

#### 3. Upvote a Stream (Requires Authentication)
```bash
# First, you need to get your session cookie by signing in via browser
# Then use it in the request:
curl -X POST http://localhost:3000/api/streams/upvote \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "streamId": "STREAM_ID_HERE"
  }'
```

#### 4. Remove Upvote (Requires Authentication)
```bash
curl -X POST http://localhost:3000/api/streams/downvote \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "streamId": "STREAM_ID_HERE"
  }'
```

---

### Method 3: Using Postman or Insomnia

1. **Import the OpenAPI spec:**
   - Open Postman/Insomnia
   - Import from URL: `http://localhost:3000/api/docs`
   - Or import the JSON directly

2. **Set up environment variables:**
   - `base_url`: `http://localhost:3000`
   - `user_id`: Your user ID from the database
   - `stream_id`: A stream ID to test with

3. **For authenticated requests:**
   - Sign in via the browser first
   - Copy the `next-auth.session-token` cookie
   - Add it as a Cookie header in Postman

---

### Method 4: Using the Test Script

Run the automated test script:
```bash
npm run test:api
```

---

## Prerequisites for Testing

### 1. Create a Test User

Before testing, you need a user in the database. You can:

**Option A: Sign in via the app**
1. Go to http://localhost:3000
2. Click "Sign In" with Google
3. This will create a user in the database
4. Get the user ID from Prisma Studio: `npm run db:studio`

**Option B: Create user manually via Prisma Studio**
1. Run: `npm run db:studio`
2. Go to http://localhost:5555
3. Click on "User" table
4. Click "Add record"
5. Fill in: `id` (UUID), `email`, `provider` (Google)
6. Copy the `id` for use in API calls

### 2. Get Your User ID

**Using Prisma Studio:**
```bash
npm run db:studio
```
- Open http://localhost:5555
- Click on "User" table
- Copy the `id` field

**Using Database Query:**
```bash
npx prisma studio
```

---

## Testing Checklist

### ✅ Stream Creation
- [ ] Create stream with valid YouTube URL
- [ ] Test with `youtube.com/watch?v=` format
- [ ] Test with `youtu.be/` format
- [ ] Test with invalid URL (should return 400)
- [ ] Test with missing fields (should return 400)

### ✅ Get Streams
- [ ] Get streams by creator ID
- [ ] Test with invalid creator ID
- [ ] Test without creatorId parameter (should return 400)

### ✅ Upvote
- [ ] Upvote a stream (requires auth)
- [ ] Test without authentication (should return 401)
- [ ] Test with invalid stream ID

### ✅ Downvote
- [ ] Remove upvote (requires auth)
- [ ] Test without authentication (should return 401)
- [ ] Test removing non-existent upvote

---

## Example Test Flow

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Create a user** (via browser sign-in or Prisma Studio)

3. **Get the user ID** from Prisma Studio

4. **Create a stream:**
   ```bash
   curl -X POST http://localhost:3000/api/streams \
     -H "Content-Type: application/json" \
     -d '{
       "creatorId": "YOUR_USER_ID",
       "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
     }'
   ```
   - Copy the `id` from the response (this is your stream ID)

5. **Get streams by creator:**
   ```bash
   curl "http://localhost:3000/api/streams/upvote?creatorId=YOUR_USER_ID"
   ```

6. **Upvote the stream:**
   - Sign in via browser first to get session cookie
   - Then use the cookie in your request

---

## Troubleshooting

### "User not found" error
- Make sure you created a user first
- Check the user ID is correct
- Verify the user exists in the database

### "Unauthorized" error
- You need to sign in via the browser first
- Get the session cookie from browser dev tools
- Use it in your API requests

### "Invalid YouTube URL" error
- Make sure the URL is a valid YouTube URL
- Supported formats:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `http://youtube.com/watch?v=VIDEO_ID`

### Database connection issues
- Check your `.env` file has `DATABASE_URL`
- Verify the database is accessible
- Run `npm run db:generate` if Prisma client is missing

---

## Useful Commands

```bash
# Start dev server
npm run dev

# View database in browser
npm run db:studio

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Check API docs
curl http://localhost:3000/api/docs
```



## Quick Start

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Access Swagger UI (Interactive Testing):**
   - Open: http://localhost:3000/docs
   - This provides an interactive interface to test all endpoints

3. **View API Documentation:**
   - Open: http://localhost:3000/api/docs
   - Returns the OpenAPI JSON specification

---

## Testing Methods

### Method 1: Swagger UI (Recommended - Easiest)

1. Start the server: `npm run dev`
2. Go to: http://localhost:3000/docs
3. Click on any endpoint to expand it
4. Click "Try it out"
5. Fill in the request body/parameters
6. Click "Execute"
7. See the response below

**Note:** For authenticated endpoints (upvote/downvote), you'll need to:
- First sign in via the app at http://localhost:3000
- Get your session cookie
- Use it in the Swagger UI (if supported) or use Method 2/3

---

### Method 2: Using cURL (Command Line)

#### 1. Create a Stream
```bash
curl -X POST http://localhost:3000/api/streams \
  -H "Content-Type: application/json" \
  -d '{
    "creatorId": "YOUR_USER_ID_HERE",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }'
```

#### 2. Get Streams by Creator
```bash
curl "http://localhost:3000/api/streams/upvote?creatorId=YOUR_USER_ID_HERE"
```

#### 3. Upvote a Stream (Requires Authentication)
```bash
# First, you need to get your session cookie by signing in via browser
# Then use it in the request:
curl -X POST http://localhost:3000/api/streams/upvote \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "streamId": "STREAM_ID_HERE"
  }'
```

#### 4. Remove Upvote (Requires Authentication)
```bash
curl -X POST http://localhost:3000/api/streams/downvote \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "streamId": "STREAM_ID_HERE"
  }'
```

---

### Method 3: Using Postman or Insomnia

1. **Import the OpenAPI spec:**
   - Open Postman/Insomnia
   - Import from URL: `http://localhost:3000/api/docs`
   - Or import the JSON directly

2. **Set up environment variables:**
   - `base_url`: `http://localhost:3000`
   - `user_id`: Your user ID from the database
   - `stream_id`: A stream ID to test with

3. **For authenticated requests:**
   - Sign in via the browser first
   - Copy the `next-auth.session-token` cookie
   - Add it as a Cookie header in Postman

---

### Method 4: Using the Test Script

Run the automated test script:
```bash
npm run test:api
```

---

## Prerequisites for Testing

### 1. Create a Test User

Before testing, you need a user in the database. You can:

**Option A: Sign in via the app**
1. Go to http://localhost:3000
2. Click "Sign In" with Google
3. This will create a user in the database
4. Get the user ID from Prisma Studio: `npm run db:studio`

**Option B: Create user manually via Prisma Studio**
1. Run: `npm run db:studio`
2. Go to http://localhost:5555
3. Click on "User" table
4. Click "Add record"
5. Fill in: `id` (UUID), `email`, `provider` (Google)
6. Copy the `id` for use in API calls

### 2. Get Your User ID

**Using Prisma Studio:**
```bash
npm run db:studio
```
- Open http://localhost:5555
- Click on "User" table
- Copy the `id` field

**Using Database Query:**
```bash
npx prisma studio
```

---

## Testing Checklist

### ✅ Stream Creation
- [ ] Create stream with valid YouTube URL
- [ ] Test with `youtube.com/watch?v=` format
- [ ] Test with `youtu.be/` format
- [ ] Test with invalid URL (should return 400)
- [ ] Test with missing fields (should return 400)

### ✅ Get Streams
- [ ] Get streams by creator ID
- [ ] Test with invalid creator ID
- [ ] Test without creatorId parameter (should return 400)

### ✅ Upvote
- [ ] Upvote a stream (requires auth)
- [ ] Test without authentication (should return 401)
- [ ] Test with invalid stream ID

### ✅ Downvote
- [ ] Remove upvote (requires auth)
- [ ] Test without authentication (should return 401)
- [ ] Test removing non-existent upvote

---

## Example Test Flow

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Create a user** (via browser sign-in or Prisma Studio)

3. **Get the user ID** from Prisma Studio

4. **Create a stream:**
   ```bash
   curl -X POST http://localhost:3000/api/streams \
     -H "Content-Type: application/json" \
     -d '{
       "creatorId": "YOUR_USER_ID",
       "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
     }'
   ```
   - Copy the `id` from the response (this is your stream ID)

5. **Get streams by creator:**
   ```bash
   curl "http://localhost:3000/api/streams/upvote?creatorId=YOUR_USER_ID"
   ```

6. **Upvote the stream:**
   - Sign in via browser first to get session cookie
   - Then use the cookie in your request

---

## Troubleshooting

### "User not found" error
- Make sure you created a user first
- Check the user ID is correct
- Verify the user exists in the database

### "Unauthorized" error
- You need to sign in via the browser first
- Get the session cookie from browser dev tools
- Use it in your API requests

### "Invalid YouTube URL" error
- Make sure the URL is a valid YouTube URL
- Supported formats:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `http://youtube.com/watch?v=VIDEO_ID`

### Database connection issues
- Check your `.env` file has `DATABASE_URL`
- Verify the database is accessible
- Run `npm run db:generate` if Prisma client is missing

---

## Useful Commands

```bash
# Start dev server
npm run dev

# View database in browser
npm run db:studio

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Check API docs
curl http://localhost:3000/api/docs
```



















