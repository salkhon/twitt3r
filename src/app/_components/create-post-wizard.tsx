"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { LoadingSpinner } from "./loading";

export function CreatePostWizard() {
  const { isSignedIn, user, isLoaded: userLoaded } = useUser();

  if (!userLoaded) return <LoadingSpinner size={48} />;
  if (!isSignedIn || !user) return null;

  return (
    <div className="flex w-full gap-3">
      <Image
        src={user.imageUrl}
        alt="Profile Picture"
        width={12}
        height={12}
        className="h-12 w-12 rounded-full"
      />
      <input
        placeholder="Type something!"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
}
