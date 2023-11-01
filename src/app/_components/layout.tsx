import { type PropsWithChildren } from "react";

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-screen justify-center">
      <div className="w-full overflow-y-scroll border-x border-slate-400 md:max-w-4xl">
        <div>{children}</div>
      </div>
    </main>
  );
}
