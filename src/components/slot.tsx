import { ReactNode } from "react";

export default function Slot({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
