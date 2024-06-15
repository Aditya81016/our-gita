import authors from "./data/authors.json";
import chapters from "./data/chapters.json";
import languages from "./data/languages.json";
import translations from "./data/translation.json";
import verses from "./data/verse.json";

const versePerPage = 4;

const Gita = {
  authors,
  chapters,
  languages,
  translations,
  verses,

  pages: (() => {
    const pages: {
      chapter: (typeof chapters)[0];
      content: string;
      data: string | number[];
      id: number;
      url: string;
    }[] = [];

    let pageNo = 1;
    chapters.forEach((chapter) => {
      pages.push({
        chapter,
        content: "summary",
        data: chapter.chapter_summary,
        id: pageNo,
        url: "/page/" + pageNo,
      });
      pageNo++;

      for (let i = 1; i < chapter.verses_count; i += versePerPage) {
        pages.push({
          chapter,
          content: `verses`,
          data: Array(
            chapter.verses_count - i > versePerPage
              ? versePerPage
              : chapter.verses_count - i + 1
          )
            .fill(i)
            .map((val, j) => val + j),
          id: pageNo,
          url: "/page/" + pageNo,
        });
        pageNo++;
      }
    });

    return pages;
  })(),

  // add helper functions by time...
  getFrom(field: string, filter: object): any {
    // @ts-ignore
    return Gita[field].find((ele) => {
      // @ts-ignore
      for (const key in filter) if (ele[key] !== filter[key]) return false;
      return true;
    });
  },
};

export default Gita;
