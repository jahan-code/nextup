# CI/CD Setup Guide

This project uses GitHub Actions for CI/CD and deploys to Vercel with two environments:
- **Develop** (Preview): Deploys from `develop` branch
- **Production**: Deploys from `main` branch

## Quick Setup Checklist

### 1. GitHub Secrets Configuration

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

#### Required Secrets:

```
VERCEL_TOKEN=your-vercel-token-here
VERCEL_ORG_ID=team_hJ1pPIwnKONxOPxIitOi0j6B
VERCEL_PROJECT_ID_DEVELOP=your-develop-project-id
VERCEL_PROJECT_ID_MAIN=your-main-project-id
```

#### Optional Secrets (for CI testing):

```
DATABASE_URL_TEST=postgresql://user:pass@localhost:5432/test
NEXT_PUBLIC_ABLY_API_KEY_TEST=test-key
```

### 2. Getting Vercel Credentials

#### Get Vercel Token:
1. Go to https://vercel.com/account/tokens
2. Create a new token
3. Copy and add to `VERCEL_TOKEN` secret

#### Get Vercel Org ID:
- Your Org ID: `team_hJ1pPIwnKONxOPxIitOi0j6B`
- Add to `VERCEL_ORG_ID` secret

#### Get Project IDs:
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → General
4. Copy the "Project ID"
5. Add to `VERCEL_PROJECT_ID_DEVELOP` or `VERCEL_PROJECT_ID_MAIN`

### 3. Vercel Project Setup

#### Create Two Projects:

**Project 1: Develop Environment**
1. Go to Vercel Dashboard → Add New Project
2. Import your GitHub repository
3. Project Name: `nextup-develop` (or your preference)
4. Framework Preset: Next.js
5. Root Directory: `./`
6. Branch: Select `develop` as production branch
7. Build Command: `npm run build` (automatically includes Prisma generate)
8. Install Command: `npm ci`
9. Output Directory: `.next`

**Project 2: Production Environment**
1. Go to Vercel Dashboard → Add New Project
2. Import the same GitHub repository
3. Project Name: `nextup-main` (or your preference)
4. Framework Preset: Next.js
5. Root Directory: `./`
6. Branch: Select `main` as production branch
7. Build Command: `npm run build`
8. Install Command: `npm ci`
9. Output Directory: `.next`

### 4. Environment Variables in Vercel

For each project (develop and main), add these environment variables:

Go to Project Settings → Environment Variables:

```
# Database (use different databases for dev/prod)
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Ably
NEXT_PUBLIC_ABLY_API_KEY=your-ably-key

# YouTube API (Optional)
YOUTUBE_API_KEY=your-youtube-key
```

**Important:**
- For Develop: Use `NEXTAUTH_URL=https://your-develop-project.vercel.app`
- For Production: Use `NEXTAUTH_URL=https://your-production-project.vercel.app`

### 5. Database Migrations

Vercel will automatically run `prisma generate` during build (via `postinstall` script).

For migrations, you have two options:

#### Option A: Automatic (Recommended)
Add this to your build command in Vercel:
```
prisma generate && prisma migrate deploy && next build
```

Or set up a Post-Deploy hook in Vercel that runs:
```bash
npx prisma migrate deploy
```

#### Option B: Manual
SSH into your Vercel deployment and run:
```bash
npx prisma migrate deploy
```

### 6. Workflow Overview

```
┌─────────────┐
│   develop   │
│   branch    │
└──────┬──────┘
       │
       ├─→ GitHub Actions: Lint & Test
       │
       └─→ Deploy to Vercel (Preview)
          └─→ URL: nextup-develop.vercel.app
       
       (After testing...)
       
┌─────────────┐
│    main     │
│   branch    │
└──────┬──────┘
       │
       ├─→ GitHub Actions: Lint & Test
       │
       └─→ Deploy to Vercel (Production)
          └─→ URL: nextup-main.vercel.app
```

### 7. Branch Workflow

**Daily Development:**
```bash
# Work on develop branch
git checkout develop
git pull origin develop

# Make changes, commit, push
git add .
git commit -m "feat: add new feature"
git push origin develop

# Automatic deployment to Vercel develop preview
```

**Release to Production:**
```bash
# Merge develop to main
git checkout main
git pull origin main
git merge develop
git push origin main

# Automatic deployment to Vercel production
```

### 8. Testing the Setup

1. Push to `develop` branch:
   ```bash
   git checkout develop
   git push origin develop
   ```
   - Check GitHub Actions: Should run CI/CD pipeline
   - Check Vercel: Should deploy to develop preview

2. Merge to `main`:
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```
   - Check GitHub Actions: Should run CI/CD pipeline
   - Check Vercel: Should deploy to production

### 9. Troubleshooting

#### Build Fails on Vercel:
- Check environment variables are set correctly
- Verify `DATABASE_URL` is accessible from Vercel
- Check build logs for specific errors
- Ensure Prisma migrations are applied

#### GitHub Actions Fails:
- Verify all secrets are set correctly
- Check Vercel token permissions
- Ensure project IDs match Vercel dashboard
- Check workflow logs for detailed errors

#### Database Connection Issues:
- Verify `DATABASE_URL` is correct
- Check if database allows external connections
- For cloud databases (Neon, Supabase), ensure SSL is configured

### 10. Useful Commands

```bash
# Generate Prisma Client
npm run db:generate

# Run database migrations
npm run db:migrate

# Push schema changes (development only)
npm run db:push

# Local build test
npm run build

# Check deployment status
# Visit: https://vercel.com/dashboard
```

### 11. Environment Variables Template

Create a `.env` file locally with:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXT_PUBLIC_ABLY_API_KEY="your-ably-api-key"
YOUTUBE_API_KEY="your-youtube-api-key"
```

**Never commit `.env` files!** They're already in `.gitignore`.

---

## Need Help?

- Check GitHub Actions logs: Repository → Actions tab
- Check Vercel deployment logs: Vercel Dashboard → Project → Deployments
- Review Prisma migration status: `npx prisma migrate status`
