import ChapterShortcuts from "@/components/chapter-shortcuts";
import { Footer, Header, Page, Section, Title } from "@/components/page";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Page>
      <Header>
        <ChapterShortcuts chapterNo={0} />
      </Header>
      <Section className="gap-8">
        <Section>
          <Title>I.</Title>
          <Title>About</Title>
        </Section>
        <Section className="text-center gap-4">
          <div className="w-full max-w-md">
            This website is a simple personal project I made in React.
            Animations are powered by Framer Motion and all the gita data is
            used from the repo &nbsp;
            <Link className="inline-flex" to={"https://github.com/gita/gita"}>
              Gita
            </Link>
            . &nbsp; The design of this website is highly inspired by the book
            &nbsp;
            <Link className="inline-flex" to={"https://devdutt.com/my-gita/"}>
              MyGita
            </Link>
            .
          </div>
          <div className="w-full max-w-md ">
            I plan on adding animated graphics throughout the website and making
            it highly interactive.
          </div>
        </Section>
      </Section>
      <Footer>Enjoy the journey!</Footer>
    </Page>
  );
}
