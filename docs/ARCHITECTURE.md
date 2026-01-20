# NextUp Architecture Overview

## Introduction

NextUp is a fan-driven music streaming platform built with Next.js 16, TypeScript, Prisma, and PostgreSQL. This document provides an overview of the application's architecture and design decisions.

## Architecture Pattern

The application follows a **hybrid architecture** combining:
- **Feature-based organization** for domain logic (auth, rooms, streams, youtube)
- **Layer-based organization** for shared resources (components, utilities, types)

This approach provides:
- Clear separation of concerns
- Easy feature discovery
- Reusable shared components
- Scalable codebase structure

## Directory Structure

```
nextup/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (Next.js requirement)
│   ├── (auth)/            # Auth route group (login, signup)
│   ├── (dashboard)/       # Dashboard route group (dashboard, rooms, streams)
│   ├── (marketing)/       # Marketing route group (home, docs)
│   └── generated/         # Prisma generated client
│
├── src/                    # Main application code
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── features/     # Feature-specific components
│   │   ├── scenes/        # 3D scene components
│   │   └── index.ts      # Barrel export
│   │
│   ├── features/          # Feature modules (business logic)
│   │   ├── auth/         # Each feature has services/ and index.ts
│   │   ├── rooms/
│   │   ├── streams/
│   │   └── youtube/
│   │
│   ├── validation/        # Centralized validation schemas
│   │   ├── auth/         # Auth validation schemas
│   │   ├── rooms/        # Rooms validation schemas
│   │   ├── streams/      # Streams validation schemas
│   │   ├── youtube/      # YouTube validation schemas
│   │   └── index.ts      # Barrel export
│   │
│   ├── types/            # Centralized TypeScript types
│   │   ├── auth/         # Auth types
│   │   ├── rooms/        # Room types
│   │   ├── streams/     # Stream types
│   │   ├── youtube/      # YouTube types
│   │   └── index.ts      # Barrel export
│   │
│   ├── constants/        # Constants organized by section
│   │   ├── app/         # App-level constants
│   │   ├── auth/        # Auth constants
│   │   ├── rooms/       # Room constants
│   │   └── index.ts     # Barrel export
│   │
│   ├── lib/              # Core libraries & utilities
│   │   ├── api/          # API utilities
│   │   │   ├── errors/  # Error handling (customErrors, errorConstants)
│   │   │   ├── auth/    # Authentication utilities
│   │   │   ├── validation/  # Request validation utilities
│   │   │   └── index.ts
│   │   ├── utils/        # General utilities organized by category
│   │   │   ├── date/    # Date utilities
│   │   │   ├── string/  # String utilities
│   │   │   ├── async/   # Async utilities
│   │   │   ├── validation/  # Validation utilities
│   │   │   └── index.ts
│   │   ├── youtube/      # YouTube utilities
│   │   │   └── index.ts
│   │   ├── db.ts        # Prisma client
│   │   └── index.ts     # Barrel export
│   └── hooks/            # Custom React hooks
│       └── index.ts     # Barrel export
│
├── prisma/                # Prisma schema & migrations
└── public/                # Static assets
```

## Key Components

### 1. Feature Modules (`src/features/`)

Each feature module contains:
- **services/**: Business logic and data operations

Example structure:
```
src/features/auth/
├── services/
│   └── auth.service.ts    # Authentication business logic
└── index.ts              # Feature barrel export
```

**Note**: 
- Validation schemas are centralized in `src/validation/` (see below).
- Types are centralized in `src/types/` (see below).

### 1.1. Validation (`src/validation/`)

Validation schemas are centralized and organized by section:
- **auth/**: Authentication validation schemas
- **rooms/**: Room validation schemas
- **streams/**: Stream validation schemas
- **youtube/**: YouTube validation schemas

Example structure:
```
src/validation/auth/
├── auth.validation.ts     # Auth validation schemas
└── index.ts               # Barrel export
```

This separation provides:
- Clear distinction between validation and business logic
- Easy discovery of all validation rules
- Centralized maintenance of validation schemas
- All inline schemas from API routes are moved here

### 1.2. Types (`src/types/`)

TypeScript types are centralized and organized by section:
- **auth/**: Authentication types
- **rooms/**: Room types
- **streams/**: Stream types
- **youtube/**: YouTube types

Example structure:
```
src/types/auth/
├── auth.types.ts     # Auth type definitions
└── index.ts          # Barrel export
```

This provides:
- Consistent organization matching validation structure
- Easy discovery of all types for a section
- Centralized type maintenance

### 1.3. Constants (`src/constants/`)

Constants are organized by section:
- **app/**: Application-level constants (APP_NAME, pagination, etc.)
- **auth/**: Authentication constants (MIN_PASSWORD_LENGTH, etc.)
- **rooms/**: Room constants (MAX_ROOM_NAME_LENGTH, etc.)

Example structure:
```
src/constants/rooms/
├── rooms.constants.ts  # Room constants
└── index.ts            # Barrel export
```

### 1.4. Utilities (`src/lib/utils/`)

General utility functions are organized by category:
- **date/**: Date formatting utilities (`formatDate`, `formatRelativeTime`)
- **string/**: String manipulation utilities (`truncate`, `capitalize`)
- **async/**: Async utilities (`sleep`, `debounce`)
- **validation/**: Validation and helper utilities (`generateId`, `isEmpty`)

Example structure:
```
src/lib/utils/date/
├── date.utils.ts  # Date utility functions
└── index.ts       # Barrel export
```

This provides:
- Easy discovery of utilities by category
- Consistent organization matching other structures
- Scalable structure for adding new utilities

**YouTube Utilities** (`src/lib/youtube/`):
YouTube-specific utilities are organized in their own folder for future expansion.

### 2. Components (`src/components/`)

Organized by purpose:
- **ui/**: Reusable UI components (Appbar, Footer, Logo, etc.)
- **features/**: Feature-specific components (Hero, Features, HowItWorks)
- **scenes/**: 3D scene components (Three.js/React Three Fiber)

### 3. API Routes (`app/api/`)

API routes are kept in `app/api/` (Next.js requirement) but delegate business logic to feature services. The project includes shared API utilities for error handling and validation:

```typescript
// app/api/auth/register/route.ts
import { AuthService } from "@/src/features/auth";
import { RegisterSchema } from "@/src/validation/auth";
import { handleApiError, validateRequest } from "@/src/lib/api";

export async function POST(req: NextRequest) {
  try {
    const body = await validateRequest(req, RegisterSchema);
    const result = await AuthService.register(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleApiError(error, "register");
  }
}
```

**API Utilities** (`src/lib/api/`):
- `errors/`: Error handling (custom error classes, error constants)
- `auth/`: Authentication utilities (getAuthenticatedUser, requireAuth, etc.)
- `validation/`: Request body parsing and query parameter utilities
- `errors.ts`: Error handling utilities (handleApiError, successResponse)

### 4. Database Layer

- **Prisma Client**: Generated in `app/generated/prisma/`
- **Database utilities**: `src/lib/db.ts` exports `prismaClient`
- **Migrations**: Stored in `prisma/migrations/`

## Data Flow

1. **Client Request** → API Route (`app/api/`)
2. **API Route** → Feature Service (`src/features/*/services/`)
3. **Feature Service** → Database (`src/lib/db.ts` → Prisma)
4. **Response** → Client

## Authentication

- **NextAuth.js** for authentication
- Supports Google OAuth and Email/Password
- Session management via NextAuth
- Protected routes using `getServerSession`

## Real-time Features

- **Ably** for real-time communication
- Used for room playback synchronization
- Custom hook: `src/hooks/useRoomAbly.ts`

## Type Safety

- **TypeScript** throughout
- **Zod** for runtime validation
- **Prisma** generates types from schema
- Centralized types in `src/types/` organized by section
- Global types in `src/types/youtube.d.ts`

## Best Practices

1. **Separation of Concerns**: Business logic in services, not API routes
2. **Type Safety**: Use TypeScript types and Zod schemas
3. **Error Handling**: Use `handleApiError` from `@/src/lib/api` for consistent error responses
4. **Validation**: Validate all inputs using Zod schemas and `parseRequestBody` utility
5. **Reusability**: Shared components in `src/components/ui/`
6. **Scalability**: Feature-based organization allows easy feature addition
7. **Barrel Exports**: Use barrel exports (index.ts) for cleaner imports
8. **Route Groups**: Organize pages using Next.js route groups for better structure

## Adding a New Feature

1. Create feature folder: `src/features/new-feature/`
2. Add `services/` subfolder
3. Create service class with business logic
4. Create `index.ts` barrel export for the feature
5. Create types folder: `src/types/new-feature/`
6. Create types file: `src/types/new-feature/new-feature.types.ts`
7. Create `index.ts` barrel export for types
8. Create validation folder: `src/validation/new-feature/`
9. Create validation schema: `src/validation/new-feature/new-feature.validation.ts`
10. Create `index.ts` barrel export for validation
11. Create constants folder (if needed): `src/constants/new-feature/`
12. Create API routes in `app/api/new-feature/`
13. Use service in API routes with proper error handling
14. Use `handleApiError` and `validateRequest` from `@/src/lib/api`
15. Import validation schemas from `@/src/validation/new-feature`
16. Import types from `@/src/types/new-feature`

## Testing Strategy

- Services can be easily unit tested (pure functions)
- API routes can be integration tested
- Components can be component tested

## Deployment

- **Vercel** recommended (Next.js optimized)
- Environment variables required:
  - `DATABASE_URL`
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `NEXT_PUBLIC_ABLY_API_KEY`

