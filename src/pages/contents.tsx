import { Page, Section, Title } from "@/components/page";
import { Link } from "react-router-dom";
import Book from "@/lib/book";

export default function Contents() {
  return (
    <Page>
      <Section>
        <Title>Contents</Title>
      </Section>
      <Section
        className="!items-start gap-1 !overflow-y-auto max-h-[75vh] w-full p-4"
        childClass="w-full max-w-md"
      >
        {Book.contents.map(({ title, url, pageNo, type, variant }, i) => (
          <Link
            to={url + window.location.search}
            key={i}
            className={`${
              typeof pageNo === "number" ? "pl-6" : ""
            } w-full h-fit hover:after:w-[100%]`}
          >
            <div className="flex w-full max-w-md items-end gap-2">
              <div
                className={`w-2 h-2 border self-start mt-2 ${
                  variant === "filled"
                    ? "border-secondary bg-secondary"
                    : variant === "active"
                    ? "border-foreground bg-foreground"
                    : "border-foreground"
                } ${type === "dot" ? "rounded-full" : "w-3"}`}
                key={i}
              ></div>
              <div className="w-full text-left">
                {i >= Book.contentOffset && i - Book.contentOffset + 1 + "."}{" "}
                {title}
              </div>
              <div>{pageNo}</div>
            </div>
          </Link>
        ))}
      </Section>
    </Page>
  );
}
