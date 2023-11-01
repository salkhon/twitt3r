/**
 * This is a page that will render a single post
 */
export default function GET({ params }: { params: { id: string } }) {
  return (
    <main className="flex h-screen justify-center">
      <div>post id {params.id}</div>
    </main>
  );
}

export const metadata = {
  title: "Post",
};
