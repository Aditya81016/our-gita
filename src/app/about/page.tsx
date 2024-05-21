import Header from "@/components/header";

export default function About() {
  return (
    <main className="page">
      <Header chapterNo={0} />
      <div className="text-2xl font-medium text-center space-y-2">
        <div>About</div>
      </div>
      <div className="overflow-y-auto px-4">A project build in NextJS</div>
    </main>
  );
}
