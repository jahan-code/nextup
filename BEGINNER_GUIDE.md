# NextUp - Complete Beginner's Guide to Next.js Frontend Development

## 📚 Table of Contents
1. [Understanding the Project Structure](#understanding-the-project-structure)
2. [What APIs We Have](#what-apis-we-have)
3. [What Frontend Pages We Need](#what-frontend-pages-we-need)
4. [How Next.js Works (Simple Explanation)](#how-nextjs-works-simple-explanation)
5. [Your First Step: Create a Dashboard Page](#your-first-step-create-a-dashboard-page)
6. [Step-by-Step Tutorial](#step-by-step-tutorial)

---

## Understanding the Project Structure

### Current Folder Structure
```
nextup/
├── app/                          # Next.js App Router (pages & API routes)
│   ├── api/                      # Backend API routes (Next.js requirement)
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── rooms/                # Room management APIs
│   │   ├── streams/              # Stream management APIs
│   │   └── youtube/              # YouTube integration APIs
│   ├── (auth)/                   # Auth route group
│   │   ├── login/                # Login page
│   │   └── signup/               # Signup page
│   ├── (dashboard)/              # Dashboard route group
│   │   ├── dashboard/            # Main dashboard
│   │   ├── rooms/                # Rooms pages
│   │   └── streams/               # Streams page
│   ├── (marketing)/              # Marketing route group
│   │   ├── page.tsx              # Home page (landing page)
│   │   └── docs/                 # Documentation page
│   ├── layout.tsx                # Root layout (wraps all pages)
│   └── providers.tsx             # React context providers
│
├── src/                          # Main application source code
│   ├── components/               # React components
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── Appbar.tsx       # Navigation bar
│   │   │   ├── Footer.tsx        # Footer
│   │   │   ├── Logo.tsx         # Logo component
│   │   │   ├── MagneticButton.tsx  # Interactive button
│   │   │   └── index.ts         # Barrel export
│   │   ├── features/             # Feature-specific components
│   │   │   ├── Hero.tsx         # Landing page hero section
│   │   │   ├── Features.tsx      # Features section
│   │   │   ├── HowItWorks.tsx   # How it works section
│   │   │   ├── ParallaxSection.tsx  # Parallax effect
│   │   │   └── index.ts         # Barrel export
│   │   ├── scenes/               # 3D scene components
│   │   │   └── index.ts          # Barrel export
│   │   └── index.ts              # Main component barrel export
│   │
│   ├── features/                 # Feature modules (business logic)
│   │   ├── auth/                 # Authentication feature
│   │   ├── rooms/                # Rooms feature
│   │   ├── streams/              # Streams feature
│   │   └── youtube/              # YouTube feature
│   │
│   ├── lib/                      # Core libraries & utilities
│   │   └── db.ts                 # Database client
│   ├── hooks/                    # Custom React hooks
│   ├── types/                    # Global TypeScript types
│   └── constants/                # Constants & configuration
│
├── prisma/                       # Database schema
│   └── schema.prisma             # Database models
└── package.json                  # Dependencies
```

**Note**: For detailed folder structure explanation, see `docs/FOLDER_STRUCTURE.md`

### Key Concepts for Beginners

**1. Pages in Next.js**
- `app/page.tsx` = Home page (URL: `/`)
- `app/dashboard/page.tsx` = Dashboard page (URL: `/dashboard`)
- `app/streams/page.tsx` = Streams page (URL: `/streams`)

**2. Components**
- Reusable pieces of UI (like buttons, cards, forms)
- Organized in `src/components/`:
  - `ui/` - Reusable UI components (Appbar, Footer, Logo)
  - `features/` - Feature-specific components (Hero, Features)
  - `scenes/` - 3D scene components
- Can be used in any page

**3. API Routes**
- Backend code that handles requests
- Located in `app/api/`
- Already built for you!

---

## What APIs We Have

### ✅ Available APIs (Already Built)

#### 1. **POST /api/streams** - Create a Stream
**What it does:** Adds a new YouTube stream to the database
**Needs:**
- `creatorId` (string) - User's ID
- `url` (string) - YouTube URL

**Returns:** Created stream object with title, images, etc.

#### 2. **GET /api/streams/upvote?creatorId=xxx** - Get Streams
**What it does:** Gets all streams for a specific creator
**Needs:**
- `creatorId` (query parameter) - User's ID

**Returns:** List of streams with upvote counts

#### 3. **POST /api/streams/upvote** - Upvote a Stream
**What it does:** Adds an upvote to a stream
**Needs:**
- User must be signed in
- `streamId` (string) - Stream's ID

**Returns:** Created upvote object

#### 4. **POST /api/streams/downvote** - Remove Upvote
**What it does:** Removes an upvote from a stream
**Needs:**
- User must be signed in
- `streamId` (string) - Stream's ID

**Returns:** Success message

#### 5. **Authentication** - Google Sign In
**What it does:** Handles user login with Google
**Location:** `/api/auth/[...nextauth]`

---

## What Frontend Pages We Need

### 🎯 Pages to Build

#### 1. **Dashboard Page** (`/dashboard`)
**Purpose:** Where creators manage their streams
**Features needed:**
- Show list of user's streams
- Add new stream (form with YouTube URL)
- See upvote counts
- Delete/edit streams (optional)

#### 2. **Streams Page** (`/streams`)
**Purpose:** Public page showing all streams
**Features needed:**
- Display all streams in a grid/list
- Show upvote counts
- Allow upvoting (if signed in)
- Filter/search functionality (optional)

#### 3. **Stream Detail Page** (`/streams/[id]`)
**Purpose:** Individual stream page
**Features needed:**
- Show stream details
- Display upvote count
- Upvote button
- Share functionality (optional)

---

## How Next.js Works (Simple Explanation)

### The Flow:
```
User visits website
    ↓
Next.js loads page.tsx
    ↓
Page shows components (like Hero, Features)
    ↓
User clicks button
    ↓
Component calls API (fetch to /api/streams)
    ↓
API processes request, saves to database
    ↓
API returns data
    ↓
Component updates UI with new data
```

### Important Concepts:

**1. Server vs Client Components**
- **Server Component** (default): Runs on server, can't use interactivity
- **Client Component** (`'use client'`): Runs in browser, can use buttons, forms, etc.

**2. API Calls**
```typescript
// In a Client Component
const response = await fetch('/api/streams', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ creatorId: 'xxx', url: 'https://...' })
});
const data = await response.json();
```

**3. Authentication**
```typescript
import { useSession } from 'next-auth/react';

const { data: session } = useSession();
// session?.user?.email - user's email
// session?.user?.name - user's name
```

---

## Your First Step: Create a Dashboard Page

### 🎯 Goal
Create a page where logged-in users can:
1. See their streams
2. Add a new stream

### 📝 Step-by-Step Instructions

#### Step 1: Create the Dashboard Page File

**Location:** Create `app/(dashboard)/dashboard/page.tsx`

**Note:** Pages are organized using Next.js route groups. The `(dashboard)` folder doesn't affect the URL - the page will still be accessible at `/dashboard`.

**What to do:**
1. Open your project in VS Code
2. Navigate to `app` folder
3. Create a new folder called `dashboard`
4. Inside `dashboard`, create a file called `page.tsx`

#### Step 2: Basic Page Structure

Copy this starter code:

```typescript
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Appbar } from '@/src/components';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // Get user's streams
  useEffect(() => {
    if (session?.user?.email) {
      fetchStreams();
    }
  }, [session]);

  const fetchStreams = async () => {
    // We'll implement this next
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Appbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          My Dashboard
        </h1>
        {/* Your content here */}
      </div>
    </div>
  );
}
```

#### Step 3: Get User ID

We need to get the user's ID from the database. Create a helper function:

**Create:** `app/lib/user.ts`

```typescript
import { prismaClient } from './db';

export async function getUserIdByEmail(email: string) {
  const user = await prismaClient.user.findUnique({
    where: { email },
  });
  return user?.id;
}
```

**But wait!** This is a server function. We need an API route instead.

**Create:** `app/api/user/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prismaClient } from '@/src/lib';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prismaClient.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}
```

#### Step 4: Fetch Streams in Dashboard

Update your dashboard page:

```typescript
const fetchStreams = async () => {
  try {
    setLoading(true);
    
    // First, get user ID
    const userResponse = await fetch('/api/user');
    if (!userResponse.ok) return;
    
    const user = await userResponse.json();
    
    // Then, get streams
    const streamsResponse = await fetch(
      `/api/streams/upvote?creatorId=${user.id}`
    );
    const data = await streamsResponse.json();
    
    setStreams(data.streams || []);
  } catch (error) {
    console.error('Error fetching streams:', error);
  } finally {
    setLoading(false);
  }
};
```

#### Step 5: Display Streams

Add this to your return statement:

```typescript
return (
  <div className="min-h-screen bg-gray-900">
    <Appbar />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent mb-8">
        My Dashboard
      </h1>
      
      {loading ? (
        <div className="text-white">Loading streams...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className="bg-gray-800 rounded-lg p-6 border border-purple-500/20"
            >
              <img
                src={stream.bigImg || stream.smallImg}
                alt={stream.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-white font-semibold mb-2">{stream.title}</h3>
              <p className="text-gray-400 text-sm mb-4">
                {stream.upvotes?.length || 0} upvotes
              </p>
              <a
                href={stream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300"
              >
                Watch on YouTube →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
```

#### Step 6: Add Stream Form

Add this form to create new streams:

```typescript
const [newStreamUrl, setNewStreamUrl] = useState('');
const [isAdding, setIsAdding] = useState(false);

const handleAddStream = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    setIsAdding(true);
    
    // Get user ID
    const userResponse = await fetch('/api/user');
    const user = await userResponse.json();
    
    // Create stream
    const response = await fetch('/api/streams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creatorId: user.id,
        url: newStreamUrl,
      }),
    });
    
    if (response.ok) {
      setNewStreamUrl('');
      fetchStreams(); // Refresh list
    }
  } catch (error) {
    console.error('Error adding stream:', error);
  } finally {
    setIsAdding(false);
  }
};

// Add this form before the streams grid:
<form onSubmit={handleAddStream} className="mb-8">
  <div className="flex gap-4">
    <input
      type="text"
      value={newStreamUrl}
      onChange={(e) => setNewStreamUrl(e.target.value)}
      placeholder="Paste YouTube URL here..."
      className="flex-1 px-4 py-2 bg-gray-800 border border-purple-500/20 rounded-lg text-white placeholder-gray-500"
      required
    />
    <button
      type="submit"
      disabled={isAdding}
      className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
    >
      {isAdding ? 'Adding...' : 'Add Stream'}
    </button>
  </div>
</form>
```

---

## 🎓 Learning Path

### Week 1: Understand Basics
- [ ] Read this guide completely
- [ ] Create the dashboard page following steps above
- [ ] Test adding a stream
- [ ] Test viewing your streams

### Week 2: Enhance Dashboard
- [ ] Add delete stream functionality
- [ ] Add edit stream functionality
- [ ] Add loading states
- [ ] Add error handling

### Week 3: Create Public Streams Page
- [ ] Create `/streams` page
- [ ] Show all streams
- [ ] Add upvote functionality
- [ ] Add search/filter

### Week 4: Polish & Deploy
- [ ] Add animations
- [ ] Improve UI/UX
- [ ] Test everything
- [ ] Deploy to production

---

## 🛠️ Common Tasks Explained

### How to Call an API

```typescript
// 1. Use fetch() function
const response = await fetch('/api/streams', {
  method: 'POST',              // GET, POST, PUT, DELETE
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({        // Data to send
    creatorId: 'xxx',
    url: 'https://...'
  }),
});

// 2. Check if successful
if (response.ok) {
  const data = await response.json();
  // Use the data
} else {
  // Handle error
  console.error('Error:', response.status);
}
```

### How to Use State

```typescript
// 1. Import useState
import { useState } from 'react';

// 2. Create state
const [streams, setStreams] = useState([]);

// 3. Update state
setStreams([...streams, newStream]);

// 4. Use state
{streams.map(stream => ...)}
```

### How to Check Authentication

```typescript
import { useSession } from 'next-auth/react';

const { data: session, status } = useSession();

// status can be: 'loading', 'authenticated', 'unauthenticated'
// session?.user?.email - user's email
// session?.user?.name - user's name
```

---

## 📖 Next Steps After Dashboard

1. **Create Streams Listing Page** - Show all public streams
2. **Add Upvote Feature** - Let users upvote streams
3. **Add Search/Filter** - Find streams easily
4. **Add Stream Details Page** - Individual stream view
5. **Add User Profile** - Show user stats

---

## 💡 Tips for Beginners

1. **Start Small** - Build one feature at a time
2. **Test Often** - Check your work frequently
3. **Read Errors** - Error messages tell you what's wrong
4. **Use Console.log** - Print values to see what's happening
5. **Ask Questions** - Google is your friend!

---

## 🆘 Getting Help

- Check browser console for errors (F12)
- Check terminal for server errors
- Read Next.js docs: https://nextjs.org/docs
- Check React docs: https://react.dev

---

## ✅ Checklist: Your First Dashboard

- [ ] Create `app/dashboard/page.tsx`
- [ ] Create `app/api/user/route.ts`
- [ ] Add authentication check
- [ ] Fetch and display streams
- [ ] Add form to create new stream
- [ ] Test adding a stream
- [ ] Test viewing streams
- [ ] Style with Tailwind CSS

Good luck! 🚀













