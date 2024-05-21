import { contents, contentsOffset } from "@/config";
import Link from "next/link";

interface Props {
  chapterNo: number;
}

export default function Header({ chapterNo }: Props) {
  for (let i = 0; i < contentsOffset + chapterNo; i++)
    contents[i].variant = "filled";
  contents[contentsOffset + chapterNo].variant = "active";
  for (let i = contentsOffset + chapterNo + 1; i < contents.length; i++)
    contents[i].variant = "hollow";
  return (
    <header className="flex gap-1">
      {contents.map(({ type, variant, link }, i) => (
        <Link
          href={link}
          className={`w-2 h-2 border ${
            variant === "filled"
              ? "border-secondary bg-secondary"
              : variant === "active"
              ? "border-foreground bg-foreground"
              : "border-foreground"
          } ${type === "dot" ? "rounded-full" : ""}`}
          key={i}
        ></Link>
      ))}
    </header>
  );
}
