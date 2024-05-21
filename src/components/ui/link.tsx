import L, { LinkProps } from "next/link";
import { HTMLAttributes } from "react";
import Underline from "./underline";

interface Props extends LinkProps, HTMLAttributes<HTMLAnchorElement> {
  underLineStyle?: string;
  contentStyle?: string;
}

export default function Link({
  underLineStyle,
  contentStyle,
  className,
  children,
  ...props
}: Props) {
  return (
    <L className={`group flex flex-col items-center ${className}`} {...props}>
      <div className={`font-bold ${contentStyle}`}>{children}</div>
      <Underline className={underLineStyle} />
    </L>
  );
}
