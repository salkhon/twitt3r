export default function GET({ params }: { params: { userid: string } }) {
  return (
    <main className="flex h-screen justify-center">
      <div className="w-full border-x border-slate-400 md:max-w-4xl">
        <div>profile id {params.userid}</div>
      </div>
    </main>
  );
}
