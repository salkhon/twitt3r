"use client";
import { api as clientApi } from "~/trpc/react";
import { LoadingPage } from "./loading";
import type { RouterOutput } from "~/server/api/trpc";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/**
 * This is a component that will render a list of posts (Feed of tweets)
 */
export function Feed() {
  const { data: posts, isFetching: isPostsFetching } =
    clientApi.post.getAll.useQuery();

  if (isPostsFetching || !posts) return <LoadingPage />;

  return (
    <div className="flex flex-col">
      {posts.map((postWithAuthor) => (
        <PostView key={postWithAuthor.post.id} {...postWithAuthor} />
      ))}
    </div>
  );
}

/**
 * This is a component that will render a single post
 */
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
      <div className="flex flex-col gap-1">
        <div className="flex gap-4 text-slate-300">
          <span>{`@${author.username}`}</span>
          <span>{"·"}</span>
          <span className="font-thin">{`${dayjs(
            post.createdAt,
          ).fromNow()}`}</span>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
}
