"use client";

import { contents, contentsOffset } from "@/config";
import Link from "@/components/ui/link";

export default function Contents() {
  return (
    <main className="page">
      <div className="text-2xl font-medium">Contents</div>
      <div className="overflow-y-auto flex flex-col gap-1 p-4">
        {contents.map(({ title, link, page, type, variant }, i) => (
          <Link
            href={link}
            key={i}
            contentStyle="flex justify-between items-center w-full font-medium gap-2"
            className={`${i > contentsOffset ? "pl-6" : ""}`}
            underLineStyle="h-[2px]"
          >
            <div
              className={`w-2 h-2 border ${
                variant === "filled"
                  ? "border-secondary bg-secondary"
                  : variant === "active"
                  ? "border-foreground bg-foreground"
                  : "border-foreground"
              } ${type === "dot" ? "rounded-full" : ""}`}
              key={i}
            ></div>
            <div className="w-full text-left">
              {i > contentsOffset && `${i - contentsOffset}.`} {title}
            </div>
            <div>{page}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
