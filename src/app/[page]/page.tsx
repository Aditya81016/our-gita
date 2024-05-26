"use client";

import Header from "@/components/header";
import Gita from "@/lib/gita";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  params: { page: number };
}

export default function Page({ params: { page } }: Props) {
  const router = useRouter();

  page = page - 1;
  const { chapter, content, data } = Gita.pages[page];

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.clientX < window.innerWidth / 2)
        router.push(`/${Math.max(page, 1)}`);
      else if (e.clientX > window.innerWidth / 2) {
        router.push(`/${Math.min(page + 2, Gita.pages.length)}`);
      }
    });
  }, []);

  return (
    <main className="flex flex-col w-screen h-screen p-6 items-center">
      <Header chapterNo={chapter.chapter_number} />
      <div className="page max-w-md !gap-14 max-h-[86vh]">
        {content === "Summary" ? (
          <>
            <div className="text-2xl font-medium text-center space-y-2">
              <div>{chapter.chapter_number}.</div>
              <div>{chapter.name_meaning}</div>
            </div>
            <div className="overflow-y-auto px-4">
              {chapter.chapter_summary}
            </div>{" "}
          </>
        ) : (
          <div className="overflow-y-auto flex flex-col gap-6 px-4">
            {data.map((verse_number: number) => {
              const verse = Gita.getVerse({
                chapter_number: chapter.chapter_number,
                verse_number,
              });
              const translation = Gita.getTranslation({
                verse_id: verse?.id,
                lang: "english",
              });
              return (
                <div className="text-center" key={verse?.verse_number}>
                  <div className="font-bold inline text-xs relative -top-1">
                    {verse?.verse_number}
                  </div>
                  &ensp;
                  {translation?.description}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex max-w-md w-full items-center gap-6">
        <div className="text-sm italic w-full text-center">
          {chapter.name_meaning}
        </div>
        <div className="max-sm:fixed bottom-2 right-2">{page + 1}</div>
      </div>
    </main>
  );
}
