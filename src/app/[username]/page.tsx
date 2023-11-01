import { api } from "~/trpc/server";
import PageLayout from "../_components/layout";
import Image from "next/image";
import ProfileFeed from "../_components/userpostfeed";

/**
 * This is a page that will render a single user profile
 */
export default async function GET({
  params,
}: {
  params: { username: string };
}) {
  const user = await api.profile.getUserByUsername.query({
    username: params.username,
  });

  return (
    <PageLayout>
      <div className="relative h-36 bg-slate-600">
        <Image
          src={user.imageUrl}
          alt={`${user.username}'s profile pic`}
          width={128}
          height={128}
          className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
        />
      </div>
      <div className="mt-16 p-4 text-2xl font-bold">{`@${user.username}`}</div>
      <div className="w-full border-b border-slate-400"></div>
      <ProfileFeed userId={user.id} />
    </PageLayout>
  );
}

export function generateMetadata({ params }: { params: { username: string } }) {
  return {
    title: params.username,
  };
}
