This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Structure

NextUp uses a hybrid folder structure combining feature-based and layer-based organization:

```
nextup/
├── app/              # Next.js App Router (pages & API routes)
├── src/              # Main application source code
│   ├── components/   # React components (ui/, features/, scenes/)
│   ├── features/     # Feature modules (auth, rooms, streams, youtube)
│   ├── lib/          # Core libraries & utilities
│   ├── hooks/        # Custom React hooks
│   ├── types/        # Global TypeScript types
│   └── constants/    # Constants & configuration
├── prisma/           # Database schema & migrations
└── docs/             # Documentation
```

**Key Features:**
- **Feature-based** organization for business logic (auth, rooms, streams, youtube)
- **Layer-based** organization for shared resources (components, utilities, types)
- Clear separation of concerns
- Beginner-friendly structure

For detailed information, see:
- [`docs/FOLDER_STRUCTURE.md`](docs/FOLDER_STRUCTURE.md) - Detailed folder structure guide
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) - Architecture overview
- [`BEGINNER_GUIDE.md`](BEGINNER_GUIDE.md) - Beginner-friendly tutorial

## Getting Started

### Database Setup

This project uses PostgreSQL with Prisma. Here are your options, ordered from lightest to heaviest:

#### Option 1: Cloud Database (Lightest - Recommended for Low-End PCs) ⭐

**No local installation needed!** These services offer free PostgreSQL databases:

- **Neon** (https://neon.tech) - Free tier with 0.5GB storage
- **Supabase** (https://supabase.com) - Free tier with 500MB database
- **Railway** (https://railway.app) - Free tier available

**Quick Setup with Neon:**
1. Sign up at https://neon.tech (free)
2. Create a new project
3. Copy the connection string
4. Use it as your `DATABASE_URL` in `.env`

#### Option 2: Local PostgreSQL Installation (Medium Resource Usage)

1. **Download PostgreSQL for Windows:**
   - Download from: https://www.postgresql.org/download/windows/
   - Install with default settings (~200MB)
   - Remember the password you set for the `postgres` user

2. **Create a database:**
   ```sql
   CREATE DATABASE nextup;
   ```

#### Option 3: Docker (Heaviest - Requires Docker Desktop)

**Note:** Docker Desktop uses ~2-4GB RAM and can be resource-intensive. Only use if you need containerization.

**To make Docker lighter:**
1. Install Docker Desktop: https://www.docker.com/products/docker-desktop/
2. Go to Settings → Resources → Advanced
3. Reduce allocated resources:
   - Memory: 2GB (minimum)
   - CPUs: 2 cores
   - Disk: 20GB
4. Disable unnecessary features in Settings

**Run PostgreSQL container:**
```bash
docker run -p 5432:5432 -e POSTGRES_PASSWORD=randompassword -e POSTGRES_USER=postgres -e POSTGRES_DB=nextup --name nextup-postgres -d postgres
```

### Environment Variables

1. **Create a `.env` file** in the root directory:
   ```env
   DATABASE_URL="postgresql://postgres:randompassword@localhost:5432/nextup?schema=public"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

2. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev
   ```

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

### Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

**Note:** Main application code is in the `src/` directory. Components are in `src/components/`, business logic is in `src/features/`, and API routes are in `app/api/`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
