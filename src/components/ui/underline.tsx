import { HTMLAttributes } from "react";

export default function Underline({
  className,
  ...props
}: HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={`h-1 w-0 transition-all bg-foreground group-hover:w-full -mt-1 ${className}`}
      {...props}
    />
  );
}
