import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  UserButton,
  currentUser,
} from "@clerk/nextjs";

import { api } from "~/trpc/server";
import { CreatePostWizard } from "./_components/create-post-wizard";
import type { RouterOutput } from "~/server/api/trpc";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default async function Home() {
  //* this is SSR
  const user = await currentUser();
  const posts = await api.post.getAll.query();

  return (
    <main className="flex h-screen justify-center">
      <div className="w-full border-x border-slate-400 md:max-w-4xl">
        <div className="flex justify-end border-b border-slate-400 p-4">
          <div>
            <ClerkLoading>
              <p>Loading...</p>
            </ClerkLoading>
            <ClerkLoaded>
              {!!user ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
            </ClerkLoaded>
          </div>
        </div>

        {!!user && (
          <div className="flex border-b border-slate-400 p-4">
            <CreatePostWizard />
          </div>
        )}

        <div className="flex flex-col">
          {posts.map((postWithAuthor) => (
            <PostView key={postWithAuthor.post.id} {...postWithAuthor} />
          ))}
        </div>
      </div>
    </main>
  );
}

// this is where trpc magic shines. We need a post to render this view. That can be INFERRED from existing routes
type PostWithUser = RouterOutput["post"]["getAll"][number];
function PostView(props: PostWithUser) {
  const { post, author } = props;
  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-400 p-4">
      <Image
        src={author.imageUrl}
        alt="Profile Picture"
        height="12"
        width="12"
        className="h-12 w-12 rounded-full"
      />
      <div className="flex flex-col">
        <div className="flex gap-4 text-slate-300">
          <span>{`@${author.username}`}</span>
          <span>{"·"}</span>
          <span className="font-thin">{`${dayjs(
            post.createdAt,
          ).fromNow()}`}</span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
}
