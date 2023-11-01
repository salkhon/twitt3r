"use client";
import { api } from "~/trpc/react";
import { LoadingPage } from "../_components/loading";
import PostView from "../_components/postview";

export default function ProfileFeed(props: { userId: string }) {
  const { data, isLoading } = api.post.getPostsByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) return <LoadingPage />;

  if (!data || data.length === 0) {
    return <div className="text-center">No posts yet</div>;
  }

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
}
