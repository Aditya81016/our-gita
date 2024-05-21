import { HTMLAttributes } from "react";

export default function Section({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SectionTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`font-bold my-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SectionPara({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${className}`} {...props}>
      &ensp;{children}
    </div>
  );
}
