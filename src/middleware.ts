import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// the name middleware.tx tells nextjs - use this before backend api routes