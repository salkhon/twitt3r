"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { LoadingSpinner } from "./loading";
import { api } from "~/trpc/react";
import { useRef } from "react";

export function CreatePostWizard() {
  const { isSignedIn, user, isLoaded: userLoaded } = useUser();
  const inputRef = useRef<HTMLInputElement>(null);

  const ctx = api.useUtils(); // queryClient methods

  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      inputRef.current!.value = "";
      void ctx.post.getAll.invalidate(); // this is async, void tells TS to ignore the promise's result w/o waiting for it
    },
  });

  if (!userLoaded) return <LoadingSpinner size={48} />;
  if (!isSignedIn || !user) return null;

  const handleButtonClick = () => {
    const text = inputRef.current?.value;
    if (!text) return;
    mutate({ content: text });
  };

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
        type="text"
        className="grow bg-transparent outline-none"
        ref={inputRef}
        disabled={isPosting}
      />
      <button onClick={handleButtonClick}>Post</button>
    </div>
  );
}
