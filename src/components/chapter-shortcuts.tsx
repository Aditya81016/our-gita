import { Link } from "react-router-dom";
import Book from "@/lib/book";

interface Props {
  chapterNo: number;
}

export default function ChapterShortcuts({ chapterNo }: Props) {
  for (let i = 0; i < Book.contentOffset + chapterNo - 1; i++)
    Book.contents[i].variant = "filled";
  Book.contents[Book.contentOffset + chapterNo - 1].variant = "active";
  for (let i = Book.contentOffset + chapterNo; i < Book.contents.length; i++)
    Book.contents[i].variant = "hollow";
  return (
    <header className="flex gap-1">
      <Link
        to={"/contents"}
        className={`w-2 h-2 border border-secondary bg-secondary`}
      />
      {Book.contents.map(({ type, variant, url }, i) => (
        <Link
          to={url}
          className={`w-2 h-2 border ${
            variant === "filled"
              ? "border-secondary bg-secondary"
              : variant === "active"
              ? "border-foreground bg-foreground"
              : "border-foreground"
          } ${type === "dot" ? "rounded-full" : ""}`}
          key={i}
        />
      ))}
    </header>
  );
}
