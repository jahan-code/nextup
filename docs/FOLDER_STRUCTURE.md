# NextUp Folder Structure Guide

This document provides a detailed explanation of the NextUp project's folder structure, designed to be beginner-friendly while maintaining professional standards.

## Overview

The project uses a hybrid structure:
- **Feature-based** for business logic (auth, rooms, streams, youtube)
- **Layer-based** for shared resources (components, utilities, types)

## Root Directory

```
nextup/
├── app/              # Next.js App Router (pages & API routes)
├── src/              # Main application source code
├── prisma/           # Database schema & migrations
├── public/           # Static assets (images, icons, etc.)
├── docs/             # Documentation
├── node_modules/     # Dependencies (auto-generated)
├── .env              # Environment variables (not in git)
├── package.json      # Project dependencies
├── tsconfig.json     # TypeScript configuration
└── next.config.ts    # Next.js configuration
```

## `/app` Directory

The `app` directory is where Next.js App Router lives. This is required by Next.js.

```
app/
├── api/                    # API routes (Next.js requirement)
│   ├── auth/
│   │   ├── [...nextauth]/ # NextAuth configuration
│   │   └── register/      # User registration endpoint
│   ├── rooms/             # Room-related endpoints
│   ├── streams/            # Stream-related endpoints
│   ├── youtube/            # YouTube integration endpoints
│   ├── user/               # User endpoints
│   └── time/               # Server time endpoint
│
├── (auth)/                 # Route group for auth pages
│   ├── login/              # Login page
│   └── signup/             # Signup page
│
├── (dashboard)/            # Route group for dashboard pages
│   ├── dashboard/          # Main dashboard
│   ├── rooms/              # Rooms pages
│   │   ├── create/         # Create room page
│   │   ├── [id]/           # Individual room page
│   │   └── page.tsx        # Rooms list page
│   └── streams/            # Streams page
│
├── (marketing)/            # Route group for public/marketing pages
│   ├── page.tsx            # Home page
│   └── docs/               # Documentation page
│
├── generated/              # Generated files (Prisma client)
│   └── prisma/
│
├── layout.tsx              # Root layout
├── providers.tsx           # React providers (NextAuth, etc.)
└── globals.css             # Global styles
```

### Why API Routes Stay in `/app`

Next.js requires API routes to be in `app/api/`. However, we keep business logic in `src/features/` and only use API routes as thin controllers.

## `/src` Directory

This is where all your main application code lives. It's organized for clarity and scalability.

```
src/
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   │   ├── Appbar.tsx     # Navigation bar
│   │   ├── Footer.tsx     # Footer component
│   │   ├── Logo.tsx       # Logo component
│   │   ├── MagneticButton.tsx  # Interactive button
│   │   └── index.ts       # Barrel export
│   │
│   ├── features/          # Feature-specific components
│   │   ├── Hero.tsx       # Landing page hero section
│   │   ├── Features.tsx   # Features showcase
│   │   ├── HowItWorks.tsx # How it works section
│   │   ├── ParallaxSection.tsx  # Parallax effect component
│   │   └── index.ts       # Barrel export
│   │
│   ├── scenes/            # 3D scene components
│   │   ├── 3DCard.tsx
│   │   ├── 3DScene.tsx
│   │   ├── 3DFeatureScene.tsx
│   │   ├── 3DHowItWorksScene.tsx
│   │   ├── 3DStatsScene.tsx
│   │   └── index.ts       # Barrel export
│   │
│   └── index.ts           # Main component barrel export
│
├── features/              # Feature modules (business logic)
│   ├── auth/
│   │   ├── services/
│   │   │   └── auth.service.ts    # Authentication logic
│   │   └── index.ts                # Feature barrel export
│   │
│   ├── rooms/
│   │   ├── services/
│   │   │   └── rooms.service.ts
│   │   └── index.ts                # Feature barrel export
│   │
│   ├── streams/
│   │   ├── services/
│   │   │   └── streams.service.ts
│   │   └── index.ts                # Feature barrel export
│   │
│   └── youtube/
│       ├── services/
│       │   └── youtube.service.ts
│       └── index.ts                # Feature barrel export
│
├── validation/            # Centralized validation schemas
│   ├── auth/
│   │   ├── auth.validation.ts     # Auth validation schemas
│   │   └── index.ts                # Barrel export
│   ├── rooms/
│   │   ├── rooms.validation.ts    # Rooms validation schemas
│   │   └── index.ts                # Barrel export
│   ├── streams/
│   │   ├── streams.validation.ts   # Streams validation schemas
│   │   └── index.ts                # Barrel export
│   ├── youtube/
│   │   ├── youtube.validation.ts  # YouTube validation schemas
│   │   └── index.ts                # Barrel export
│   └── index.ts                    # Main validation barrel export
│
├── lib/                   # Core libraries & utilities
│   ├── api/               # API utilities
│   │   ├── errors/        # Error handling
│   │   │   ├── customErrors.ts  # Custom error classes
│   │   │   └── index.ts
│   │   ├── auth/          # Authentication utilities
│   │   │   └── index.ts
│   │   ├── validation/    # Request validation utilities
│   │   │   └── index.ts
│   │   ├── errorConstants.ts  # Error codes and messages
│   │   ├── errors.ts      # Error handling utilities
│   │   └── index.ts       # API utilities barrel export
│   ├── utils/             # General utilities organized by category
│   │   ├── date/          # Date utilities
│   │   │   ├── date.utils.ts
│   │   │   └── index.ts
│   │   ├── string/         # String utilities
│   │   │   ├── string.utils.ts
│   │   │   └── index.ts
│   │   ├── async/          # Async utilities
│   │   │   ├── async.utils.ts
│   │   │   └── index.ts
│   │   ├── validation/     # Validation utilities
│   │   │   ├── validation.utils.ts
│   │   │   └── index.ts
│   │   └── index.ts        # Utilities barrel export
│   ├── youtube/            # YouTube utilities
│   │   ├── youtube.utils.ts
│   │   └── index.ts
│   ├── db.ts              # Prisma client instance
│   └── index.ts           # Library barrel export
│
├── hooks/                 # Custom React hooks
│   ├── useRoomAbly.ts     # Ably real-time hook
│   └── index.ts           # Hooks barrel export
│
├── types/                 # Centralized TypeScript types
│   ├── auth/              # Auth types
│   │   ├── auth.types.ts
│   │   └── index.ts
│   ├── rooms/             # Room types
│   │   ├── rooms.types.ts
│   │   └── index.ts
│   ├── streams/           # Stream types
│   │   ├── streams.types.ts
│   │   └── index.ts
│   ├── youtube/           # YouTube types
│   │   ├── youtube.types.ts
│   │   └── index.ts
│   ├── youtube.d.ts        # YouTube API global types
│   └── index.ts            # Re-export all types
│
└── constants/             # Constants organized by section
    ├── app/               # App-level constants
    │   ├── app.constants.ts
    │   └── index.ts
    ├── auth/              # Auth constants
    │   ├── auth.constants.ts
    │   └── index.ts
    ├── rooms/             # Room constants
    │   ├── rooms.constants.ts
    │   └── index.ts
    └── index.ts            # Re-export all constants
```

## Feature Module Structure

Each feature follows the same pattern:

```
src/features/[feature-name]/
├── services/
│   └── [feature].service.ts    # Business logic
└── index.ts                    # Feature barrel export
```

**Note**: 
- Validation schemas are centralized in `src/validation/[feature-name]/` (see Validation Structure below).
- Types are centralized in `src/types/[feature-name]/` (see Types Structure below).

## Validation Structure

Validation schemas are centralized and organized by section:

```
src/validation/[section-name]/
├── [section].validation.ts     # Validation schemas
└── index.ts                    # Barrel export
```

Example:
```
src/validation/auth/
├── auth.validation.ts          # Auth validation schemas
└── index.ts                    # Barrel export
```

This structure provides:
- **Centralized Organization**: All validation in one place
- **Better Separation**: Validation separated from business logic
- **Easy Maintenance**: Easy to find and update validation rules

### Services (`services/`)

Services contain business logic. They're pure functions that can be easily tested.

Example:
```typescript
// src/features/auth/services/auth.service.ts
export class AuthService {
  static async register(data: RegisterInput): Promise<RegisterResponse> {
    // Business logic here
  }
}
```

### Validation (`src/validation/`)

Zod schemas for input validation are centralized in `src/validation/` organized by section.

Example:
```typescript
// src/validation/auth/auth.validation.ts
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

Import validation schemas:
```typescript
import { RegisterSchema } from "@/src/validation/auth";
```

**Note**: All inline schemas from API routes have been moved to the appropriate validation files. For example, `AddStreamSchema` and `PlaybackUpdateSchema` are in `src/validation/rooms/`, while `UpvoteSchema` and `DownvoteSchema` are in `src/validation/streams/`.

### Types (`src/types/`)

TypeScript type definitions are centralized and organized by section:

```
src/types/[section-name]/
├── [section].types.ts     # Type definitions
└── index.ts              # Barrel export
```

Example:
```typescript
// src/types/auth/auth.types.ts
export interface RegisterResponse {
  message: string;
  user: { id: string; email: string };
}
```

Import types:
```typescript
import type { RegisterResponse } from "@/src/types/auth";
```

### Constants (`src/constants/`)

Constants are organized by section:

```
src/constants/[section-name]/
├── [section].constants.ts  # Constants
└── index.ts               # Barrel export
```

Example:
```typescript
// src/constants/rooms/rooms.constants.ts
export const MAX_ROOM_NAME_LENGTH = 100;
export const MAX_ROOM_DESCRIPTION_LENGTH = 500;
```

Import constants:
```typescript
import { MAX_ROOM_NAME_LENGTH } from "@/src/constants/rooms";
```

### Utilities (`src/lib/utils/`)

Utilities are organized by category:

```
src/lib/utils/[category]/
├── [category].utils.ts  # Utility functions
└── index.ts             # Barrel export
```

Categories:
- **date/**: Date formatting utilities (`formatDate`, `formatRelativeTime`)
- **string/**: String manipulation utilities (`truncate`, `capitalize`)
- **async/**: Async utilities (`sleep`, `debounce`)
- **validation/**: Validation and helper utilities (`generateId`, `isEmpty`)

Example:
```typescript
// src/lib/utils/date/date.utils.ts
export function formatDate(date: Date | string): string {
  // ... implementation
}
```

Import utilities:
```typescript
// From main barrel export (recommended)
import { formatDate, truncate, sleep } from '@/src/lib';

// Or from specific category
import { formatDate, formatRelativeTime } from '@/src/lib/utils/date';
import { truncate, capitalize } from '@/src/lib/utils/string';
```

### YouTube Utilities (`src/lib/youtube/`)

YouTube-specific utilities are organized in their own folder:

```
src/lib/youtube/
├── youtube.utils.ts  # YouTube utilities
└── index.ts          # Barrel export
```

## Component Organization

### UI Components (`components/ui/`)

Reusable components used throughout the app:
- `Appbar.tsx` - Navigation bar
- `Footer.tsx` - Footer
- `Logo.tsx` - Logo component
- `MagneticButton.tsx` - Interactive button

### Feature Components (`components/features/`)

Components specific to features:
- `Hero.tsx` - Landing page hero
- `Features.tsx` - Features showcase
- `HowItWorks.tsx` - How it works section

### Scene Components (`components/scenes/`)

3D components using Three.js/React Three Fiber:
- `3DScene.tsx` - Main 3D scene
- `3DCard.tsx` - 3D card component
- Other 3D scene components

## Import Paths

The project uses path aliases configured in `tsconfig.json`:

- `@/app/*` - Points to `app/` directory
- `@/src/*` - Points to `src/` directory

Examples:
```typescript
// Import from src using barrel exports (recommended)
import { AuthService } from "@/src/features/auth";
import { Appbar, Footer, Hero } from "@/src/components";
import { prismaClient } from "@/src/lib";
import { useRoomAbly } from "@/src/hooks";

// Direct imports (also work, but barrel exports are preferred)
import { AuthService } from "@/src/features/auth/services/auth.service";
import Appbar from "@/src/components/ui/Appbar";

// Import from app (Next.js specific)
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
```

### Barrel Exports

The project uses barrel exports (index.ts files) to simplify imports:

- **Components**: `@/src/components` exports all UI, feature, and scene components
- **Features**: `@/src/features/[feature]` exports services, schemas, and types
- **Lib**: `@/src/lib` exports all utilities, API helpers, and database client
- **Hooks**: `@/src/hooks` exports all custom hooks

This allows cleaner imports:
```typescript
// Instead of:
import { AuthService } from "@/src/features/auth/services/auth.service";
import { RegisterSchema } from "@/src/validation/auth/auth.validation";
import type { RegisterResponse } from "@/src/features/auth/types/auth.types";

// You can do:
import { AuthService, type RegisterResponse } from "@/src/features/auth";
import { RegisterSchema } from "@/src/validation/auth";
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `Appbar.tsx`, `Hero.tsx`)
- **Services**: camelCase with `.service.ts` suffix (e.g., `auth.service.ts`)
- **Validation**: camelCase with `.validation.ts` suffix (e.g., `auth.validation.ts`)
- **Types**: camelCase with `.types.ts` suffix (e.g., `auth.types.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useRoomAbly.ts`)
- **Utilities**: camelCase with `.utils.ts` suffix (e.g., `date.utils.ts`, `string.utils.ts`)

## Adding New Code

### Adding a New Feature

1. Create folder: `src/features/new-feature/`
2. Add subfolders: `services/`, `types/`
3. Create service and types files
4. Create validation folder: `src/validation/new-feature/`
5. Create validation schema: `src/validation/new-feature/new-feature.validation.ts`
6. Create `index.ts` barrel export for validation
7. Create API routes in `app/api/new-feature/`
8. Use the service in API routes
9. Import validation schemas from `@/src/validation/new-feature`

### Adding a New Component

1. Determine category:
   - Reusable UI → `src/components/ui/`
   - Feature-specific → `src/components/features/`
   - 3D scene → `src/components/scenes/`
2. Create component file
3. Export component
4. Import where needed

### Adding a New API Route

1. Create route in `app/api/[feature]/route.ts`
2. Import feature service from `src/features/[feature]/services/`
3. Use service for business logic
4. Return JSON response

## Benefits of This Structure

1. **Beginner-Friendly**: Clear organization makes it easy to find code
2. **Scalable**: Easy to add new features without cluttering
3. **Maintainable**: Related code is grouped together
4. **Type-Safe**: Types organized by feature and globally
5. **Testable**: Services can be easily unit tested
6. **Professional**: Follows industry best practices

## Common Tasks

### Finding Code

- **Business Logic**: `src/features/[feature]/services/`
- **Validation**: `src/validation/[section]/`
- **Types**: `src/features/[feature]/types/` or `src/types/`
- **Components**: `src/components/[category]/`
- **API Routes**: `app/api/[feature]/`
- **Pages**: `app/[route]/page.tsx`

### Understanding Data Flow

1. User action → Component
2. Component → API route (`app/api/`)
3. API route → Feature service (`src/features/*/services/`)
4. Service → Database (`src/lib/db.ts`)
5. Response flows back up

## Tips for Beginners

1. **Start with components**: Look at `src/components/` to understand UI
2. **Follow the pattern**: Each feature follows the same structure
3. **Check services**: Business logic is in `src/features/*/services/`
4. **Use types**: Check `src/features/*/types/` for data structures
5. **Validate inputs**: Validation schemas in `src/validation/*/` show expected data

## Questions?

- Check `docs/ARCHITECTURE.md` for architecture details
- Check `README.md` for setup instructions
- Check `BEGINNER_GUIDE.md` for beginner-friendly tutorials

