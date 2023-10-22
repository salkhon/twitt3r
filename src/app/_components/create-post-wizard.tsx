"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export function CreatePostWizard() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isSignedIn || !user) return null;
  if (!isLoaded) return <p>Loading...</p>;

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
