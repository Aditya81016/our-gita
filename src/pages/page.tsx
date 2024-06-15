import ChapterShortcuts from "@/components/chapter-shortcuts";
import { Footer, Header, Page, Section, Title } from "@/components/page";
import Gita from "@/lib/gita";
import { useParams } from "react-router-dom";

export default function GitaPage() {
  const pageNo = Number(useParams().pageNo) - 1 ?? 0;
  const page = Gita.pages[pageNo];

  return (
    <Page className="!gap-8">
      <Header>
        <ChapterShortcuts chapterNo={page.chapter.chapter_number} />
      </Header>
      {/* ===== SUMMARY ===== */}
      {page.content === "summary" && typeof page.data === "string" ? (
        <Section className="gap-8 !overflow-y-auto max-h-[70vh] max-w-md px-4">
          <Section>
            <Title>{page.chapter.chapter_number}</Title>
            <Title className="text-center">{page.chapter.name_meaning}</Title>
          </Section>
          <Section className="w-[28rem] max-w-md">{page.data}</Section>
        </Section>
      ) : (
        <>
          {/* ===== VERSES ===== */}
          {page.content === "verses" && typeof page.data !== "string" && (
            <Section className="gap-8 !overflow-y-auto max-h-[70vh] px-4">
              {page.data.map((verseNo) => {
                const verse = Gita.getFrom("verses", {
                  chapter_number: page.chapter.chapter_number,
                  verse_number: verseNo,
                });
                const translation = Gita.getFrom("translations", {
                  verse_id: verse?.id,
                  lang: "english",
                });
                return (
                  <div
                    className="text-center w-full max-w-md"
                    key={verse?.verse_number}
                  >
                    <div className="font-bold inline text-xs relative -top-1">
                      {verse?.verse_number}
                    </div>
                    &ensp;
                    {translation?.description}
                  </div>
                );
              })}
            </Section>
          )}
        </>
      )}
      <Footer>
        {page.chapter.name_meaning}
        <div className="fixed bottom-4 right-4">{pageNo + 1}</div>
      </Footer>
    </Page>
  );
}
