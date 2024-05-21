import authors from "./data/authors.json";
import chapters from "./data/chapters.json";
import commentaries from "./data/commentary.json";
import languages from "./data/languages.json";
import translations from "./data/translation.json";
import verses from "./data/verse.json";

const versePerPage = 4;

const Gita = {
  authors,
  chapters,
  commentaries,
  languages,
  translations,
  verses,

  // add helper functions by time...
  getVerse(filter: object) {
    return verses.find((verse) => {
      // @ts-ignore
      for (const key in filter) if (verse[key] !== filter[key]) return false;
      return true;
    });
  },

  getTranslation(filter: object) {
    return translations.find((translation) => {
      for (const key in filter) {
        // @ts-ignore
        if (translation[key] !== filter[key]) return false;
      }
      return true;
    });
  },

  getPage(filter: object) {
    return Gita.pages.find((page) => {
      for (const key in filter) {
        // @ts-ignore
        if (page[key] !== filter[key]) return false;
      }
      return true;
    });
  },

  pages: (() => {
    const pages: {
      chapter: (typeof chapters)[0];
      content: string;
      data: any;
      id: number;
    }[] = [];

    let pageNo = 1;
    chapters.forEach((chapter) => {
      pages.push({
        chapter,
        content: "Summary",
        data: chapter.chapter_summary,
        id: pageNo,
      });
      pageNo++;

      for (let i = 1; i < chapter.verses_count; i += versePerPage) {
        pages.push({
          chapter,
          content: `Verses`,
          data: Array(versePerPage)
            .fill(i)
            .map((val, j) => val + j),
          id: pageNo,
        });
        pageNo++;
      }
    });

    return pages;
  })(),
};
export default Gita;
