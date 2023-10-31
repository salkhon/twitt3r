"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { LoadingSpinner } from "./loading";
import { api } from "~/trpc/react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export function CreatePostWizard() {
  const { isSignedIn, user, isLoaded: userLoaded } = useUser();
  const inputRef = useRef<HTMLInputElement>(null); // not necessary, keeping to show recommended way
  const [inputVal, setInputVal] = useState(""); // need state for POST button disabling

  const ctx = api.useUtils(); // queryClient methods

  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      inputRef.current!.value = "";
      setInputVal("");
      void ctx.post.getAll.invalidate(); // this is async, void tells TS to ignore the promise's result w/o waiting for it
    },
    onError: (err) => {
      const errMsg = err.data?.zodError?.fieldErrors.content;
      if (errMsg?.[0]) toast.error(errMsg[0]);
      else toast.error("Failed to create post: " + err.message);
    },
  });

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
        type="text"
        className="grow bg-transparent outline-none"
        ref={inputRef}
        value={inputVal}
        disabled={isPosting}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && mutate({ content: inputVal })}
      />
      {!!inputVal && !isPosting && (
        <button
          onClick={(e) => {
            e.preventDefault();
            const text = inputRef.current?.value;
            if (!text) return;
            mutate({ content: text });
          }}
        >
          Post
        </button>
      )}

      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={24} />
        </div>
      )}
    </div>
  );
}
