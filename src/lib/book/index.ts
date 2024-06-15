import Gita from "../gita";

const content = (
  title: string,
  url: string,
  pageNo: number | string,
  type: "box" | "dot" = "box",
  variant: "hollow" | "filled" | "active" = "hollow"
) => ({ title, url, pageNo, type, variant });

const contents = [
  content("About", "/about", "I"),
  ...Array(18)
    .fill("")
    .map((_val, i) => {
      const page_number = Gita.getFrom("pages", {
        chapter: Gita.chapters[i],
        content: "summary",
      })?.id;

      return content(
        Gita.chapters[i]?.name_meaning,
        `/page/${page_number}`,
        page_number ?? -1,
        "dot"
      );
    }),
];

const pages = [
  "/",
  "/intro",
  "/contents",
  "/about",
  ...Gita.pages.map((page) => page.url),
];

const Book = {
  contentOffset: 1,
  contents,
  pages,
};

export default Book;
