import { Cursive, Heading, Page, Section, Title } from "@/components/page";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Page className="!justify-center">
      <Section>
        <Cursive>404</Cursive>
        <Heading className="max-md:text-6xl max-sm:text-5xl">NOT FOUND</Heading>
      </Section>
      <hr className="w-[75vw] h-[2px] bg-foreground -mt-8" />
      <Section className="!max-w-lg -mt-12">
        <Title className="max-md:text-xl">YOU ARE ON THE WRONG PATH!</Title>
        <Link className="text-xl" to="/">
          HOME ⇢
        </Link>
      </Section>
    </Page>
  );
}
