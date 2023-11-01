import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  UserButton,
  currentUser,
} from "@clerk/nextjs";

import { CreatePostWizard } from "./_components/create-post-wizard";
import { LoadingSpinner } from "./_components/loading";
import { Feed } from "./_components/feed";
import PageLayout from "./_components/layout";

export default async function Home() {
  //* this is SSR
  const user = await currentUser();

  return (
    <PageLayout>
      <div className="flex justify-end border-b border-slate-400 p-4">
        <div>
          <ClerkLoading>
            <LoadingSpinner />
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

      <Feed />
    </PageLayout>
  );
}
