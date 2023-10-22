import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-900 via-red-800 to-purple-950">
      <SignUp />
    </div>
  );
}
