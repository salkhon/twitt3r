"use client";
import { api as clientApi } from "~/trpc/react";
import { LoadingPage } from "./loading";
import PostView from "./postview";

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
