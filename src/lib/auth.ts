import { getToken } from "next-auth/jwt";

export async function auth() {
  try {
    const token = await getToken({
      secret: process.env.NEXTAUTH_SECRET,
    } as any);

    if (!token) {
      return null;
    }

    return {
      id: token.sub as string,
      email: token.email,
      name: token.name,
      image: token.picture,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}
