"use client";

import Header from "@/components/header";
import Gita from "@/lib/gita";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouteHistory } from "@/store";

interface Props {
  params: { page: number };
}

const pageVariants = {
  popIn: {
    scale: 0.75,
    opacity: 0,
  },
  right: {
    translateX: "-14rem",
  },
  animate: {
    translateX: "0rem",
    scale: 1,
    opacity: 1,
  },
  left: {
    translateX: "14rem",
  },
};

export default function Page({ params: { page } }: Props) {
  const router = useRouter();
  const routeHistory = useRouteHistory((state) => state.routeHistory);
  const pathname = usePathname();

  page = page - 1;
  const { chapter, content, data } = Gita.pages[page];

  let initial = "";
  let exit = "";
  if (routeHistory[0] !== "" && routeHistory[0]?.includes("/page/")) {
    const lastPage = Number(routeHistory[0].replace("/page/", ""));
    if (page + 1 > lastPage) {
      initial = "left";
      exit = "right";
    } else {
      initial = "right";
      exit = "left";
    }
  }

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.clientX < window.innerWidth / 2)
        router.push(`/page/${Math.max(page, 1)}`);
      else if (e.clientX > window.innerWidth / 2) {
        router.push(`/page/${Math.min(page + 2, Gita.pages.length)}`);
      }
    });
  }, []);

  return (
    <motion.main className="flex flex-col w-screen h-screen p-6 items-center">
      <Header chapterNo={chapter.chapter_number} />
      <AnimatePresence mode="wait">
        <motion.div
          className="page max-w-md !pb-1 !gap-0 h-full"
          key={pathname}
          variants={pageVariants}
          initial={"popIn"}
          animate="animate"
          exit={exit}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {content === "Summary" ? (
            <div className="w-full flex flex-col gap-12 max-h-[80vh] my-auto">
              <div className="text-2xl font-medium text-center space-y-2">
                <div>{chapter.chapter_number}.</div>
                <div>{chapter.name_meaning}</div>
              </div>
              <div className="overflow-y-auto px-4">
                {chapter.chapter_summary}
              </div>{" "}
            </div>
          ) : (
            <div className="overflow-y-auto flex flex-col gap-6 px-4 my-auto max-h-[80vh]">
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
          <div className="bottom-0 right-0 mt-auto">{page + 1}</div>
        </motion.div>
      </AnimatePresence>
      <div className="flex max-w-md w-full items-center gap-6">
        <div className="text-sm italic w-full text-center">
          {chapter.name_meaning}
        </div>
      </div>
    </motion.main>
  );
}
