import { Children, HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { MotionProps, motion } from "framer-motion";
import Book from "@/lib/book";

let parentVariant = {
  initial: {
    overflow: "hidden",
  },
  animate: {
    overflow: "visible",
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    overflow: "hidden",
  },
};

let childrenVariant = {
  initial: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  animate: {
    y: 0,
    x: 0,
    opacity: 1,
  },
  exit: {
    y: 0,
    x: 0,
    opacity: 0,
  },
};

type Props = HTMLAttributes<HTMLDivElement>;

const Page = ({ className, children, ...props }: Props & MotionProps) => {
  const navigate = useNavigate();

  // const is3d = ["true", ""].includes(String(useSearchParams()[0].get("3d")));
  // const Wrapper = is3d ? Canvas3D : Slot;

  const pageNo = Book.pages.indexOf(window.location.pathname);

  // // @ts-ignore
  // if (is3d) childrenVariant = {};

  function onKeyUp(event: KeyboardEvent) {
    if (event.code === "ArrowDown") toNextPage();
    if (event.code === "ArrowUp") toPrevPage();
  }

  document.body.onkeyup = onKeyUp;

  function toNextPage() {
    if (pageNo + 1 < Book.pages.length) {
      if (window.innerWidth > window.innerHeight) {
        childrenVariant.initial.y = 50;
        childrenVariant.exit.y = -50;
        childrenVariant.initial.x = 0;
        childrenVariant.exit.x = 0;
      } else {
        childrenVariant.initial.y = 0;
        childrenVariant.exit.y = 0;
        childrenVariant.initial.x = 50;
        childrenVariant.exit.x = -50;
      }
      navigate(Book.pages[pageNo + 1] + window.location.search);
    }
  }

  function toPrevPage() {
    if (pageNo - 1 >= 0) {
      if (window.innerWidth > window.innerHeight) {
        childrenVariant.initial.y = -50;
        childrenVariant.exit.y = 50;
        childrenVariant.initial.x = 0;
        childrenVariant.exit.x = 0;
      } else {
        childrenVariant.initial.y = 0;
        childrenVariant.exit.y = 0;
        childrenVariant.initial.x = -50;
        childrenVariant.exit.x = 50;
      }
      navigate(Book.pages[pageNo - 1] + window.location.search);
    }
  }

  return (
    <>
      <Section
        className={
          "w-screen !h-[100dvh] p-12 bg-background gap-12 has-[.page-header]:pt-0 has-[.page-footer]:pb-0 justify-between " +
          className
        }
        {...props}
      >
        {children}
      </Section>
      {window.innerWidth < window.innerHeight && (
        <>
          <div
            onClick={toPrevPage}
            className="fixed left-0 top-1/2 -translate-y-1/2 w-1/5 h-2/3"
          />
          <div
            onClick={toNextPage}
            className="fixed right-0 top-1/2 -translate-y-1/2 w-1/5 h-2/3 "
          />
        </>
      )}
    </>
  );
};

const Section = ({
  className,
  children,
  childClass = "",
  ...props
}: Props & MotionProps & { childClass?: string }) => (
  <motion.div
    className={"w-full flex flex-col items-center " + className}
    variants={parentVariant}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.5 }}
    {...props}
  >
    {Children.map(children, (child, i) => (
      <>
        {/* @ts-ignore */}
        {["Header", "Footer"].includes(child?.type?.name) ? (
          <>{child}</>
        ) : (
          <motion.div
            className={childClass}
            variants={childrenVariant}
            transition={{ duration: 0.5 }}
            key={i}
          >
            {child}
          </motion.div>
        )}
      </>
    ))}
  </motion.div>
);

const Header = ({ className, ...props }: Props) => (
  <div
    className={
      "w-full p-4 text-center page-header flex justify-center items-center" +
      className
    }
    {...props}
  />
);

const Footer = ({ className, ...props }: Props) => (
  <div
    className={"w-full p-4 text-center page-footer " + className}
    {...props}
  />
);

const Cursive = ({ className, ...props }: Props) => (
  <div className={"text-6xl cursive font-semibold " + className} {...props} />
);

const Heading = ({ className, ...props }: Props) => (
  <div className={"text-9xl header font-thin " + className} {...props} />
);

const Title = ({ className, ...props }: Props) => (
  <div className={"text-2xl " + className} {...props} />
);

export { Page, Section, Header, Footer, Cursive, Heading, Title };
