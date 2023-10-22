import {
  SignInButton,
  SignOutButton,
  UserButton,
  currentUser,
} from "@clerk/nextjs";

import { api } from "~/trpc/server";

export default async function Home() {
  const user = await currentUser();
  const posts = await api.post.getAll.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="flex flex-col items-center gap-2">
          <UserButton afterSignOutUrl="/" />
        </div>

        <div className="flex flex-col items-center gap-2">
          {!!user ? <SignOutButton /> : <SignInButton />}
        </div>

        <div className="flex flex-col items-center gap-2">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col items-center gap-2">
              <div>{post.content}</div>
              <div>{post.createdAt.toISOString()}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
