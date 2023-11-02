import { api } from "~/trpc/server";
import PageLayout from "../../_components/layout";
import PostView from "~/app/_components/postview";

/**
 * This is a page that will render a single post
 */
export default async function GET({ params }: { params: { postId: string } }) {
  const data = await api.post.getById.query({ id: params.postId });

  if (!data) return <div>404</div>;

  return (
    <PageLayout>
      <PostView {...data} />
    </PageLayout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}) {
  const data = await api.post.getById.query({ id: params.postId });

  return {
    title: `${data?.post.content} - @${data?.author.username}`,
    description: data?.post.content,
    image: data?.author.imageUrl,
  };
}
