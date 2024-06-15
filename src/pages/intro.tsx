import { Cursive, Page, Section, Heading } from "@/components/page";
import { Link } from "react-router-dom";

export default function Intro() {
  return (
    <Page className="justify-center">
      <Section>
        <Cursive>our</Cursive>
        <Heading>GITA</Heading>
      </Section>
      <Section>
        <Heading className="!text-3xl !font-bold">BHAGAVAD GITA</Heading>
      </Section>
      <Section>
        <div className="flex gap-2">
          Design inspired by:
          <Link to="https://devdutt.com/my-gita/">My Gita</Link>
        </div>
      </Section>
    </Page>
  );
}
