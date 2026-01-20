import { prismaClient } from "@/src/lib";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/auth/[...nextauth]/route.ts:19',message:'Credentials authorize - starting',data:{hasEmail:!!credentials?.email,hasPassword:!!credentials?.password},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        if (!credentials?.email || !credentials?.password) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/auth/[...nextauth]/route.ts:21',message:'Credentials authorize - missing credentials',data:{hasEmail:!!credentials?.email,hasPassword:!!credentials?.password},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
          // #endregion
          return null;
        }

        const user = await prismaClient.user.findUnique({
          where: { email: credentials.email },
        });
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/auth/[...nextauth]/route.ts:26',message:'Credentials authorize - user lookup',data:{email:credentials.email,userFound:!!user,hasPassword:!!user?.password},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion

        if (!user || !user.password) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/auth/[...nextauth]/route.ts:29',message:'Credentials authorize - user not found or no password',data:{userFound:!!user,hasPassword:!!user?.password},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
          // #endregion
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/auth/[...nextauth]/route.ts:35',message:'Credentials authorize - password check',data:{isPasswordValid},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion

        if (!isPasswordValid) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/auth/[...nextauth]/route.ts:38',message:'Credentials authorize - invalid password',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
          // #endregion
          return null;
        }

        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a46e77e0-b8d3-4f82-be7a-d50704bb9982',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/auth/[...nextauth]/route.ts:42',message:'Credentials authorize - success',data:{userId:user.id,email:user.email},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT strategy for better compatibility
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure secret is set
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;
      
      // Skip database update for credentials provider (already handled in authorize)
      if (account?.provider === 'credentials') {
        return true;
      }
      
      try {
        await prismaClient.user.upsert({
          where: { email: user.email },
          update: {},
          create: {
            id: user.id ?? crypto.randomUUID(),
            email: user.email,
            provider: account?.provider === 'google' ? "Google" : "Email",
          },
        });
      } catch (error) {
        console.error("Error creating/updating user:", error);
        return false;
      }
      return true;
    },
    async session({ session, token }) {
      // Ensure session has user email
      if (session.user && token.email) {
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };