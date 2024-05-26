"use client";

import { useRouteHistory } from "@/store";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const loaderVariants = {
  initial: {
    display: "none",
    width: "0vw",
    transition: {
      duration: 0,
    },
  },
  loading: {
    display: "block",
    width: "80vw",
    transition: {
      duration: 15,
      ease: [0.05, 0.87, 0.42, 0.93],
    },
  },
  loaded: {
    display: "block",
    width: "100vw",
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
};

export default function TopLoader() {
  const [animateState, setAnimateState] = useState("initial");
  const pathname = usePathname();
  const routeHistory = useRouteHistory((state) => state.routeHistory);
  const pushRoute = useRouteHistory((state) => state.pushRoute);

  useEffect(() => {
    setAnimateState("loaded");
    setTimeout(() => {
      setAnimateState("initial");
    }, 100);
    if (routeHistory.length === 0) pushRoute("");
    else pushRoute(pathname);
    return () => {
      setAnimateState("loading");
    };
  }, [pathname]);
  return (
    <motion.div
      className="fixed top-0 left-0 h-1 w-0 bg-foreground"
      variants={loaderVariants}
      animate={animateState}
    />
  );
}
