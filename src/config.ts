import Gita from "./lib/gita";

const chapter = (
  title: string,
  link: string,
  page: number | string,
  type: "box" | "dot" = "box",
  variant: "hollow" | "filled" | "active" = "hollow"
) => ({ title, link, page, type, variant });

const contentsOffset = 1; // no of extra contents - 1
const contents: Array<ReturnType<typeof chapter>> = [
  chapter("Contents", "/contents", "I"),
  chapter("About OurGita", "/about", "II"),

  // Renders contents for the 18 chapters
  ...Array(18)
    .fill("")
    .map((_val, i) => {
      const page_number = Gita.getPage({
        chapter: Gita.chapters[i],
        content: "Summary",
      })?.id;

      return chapter(
        Gita.chapters[i]?.name_meaning,
        `/${page_number}`,
        page_number ?? -1,
        "dot"
      );
    }),
];

export { contents, contentsOffset };
