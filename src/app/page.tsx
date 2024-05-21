import { Raleway, Tangerine } from "next/font/google";
import Link from "@/components/ui/link";
import LeftArrowIcon from "../assets/icons/left-arrow";
import Underline from "@/components/ui/underline";

const headerFont = Raleway({ subsets: ["latin"] });
const handwriting = Tangerine({ weight: "700", subsets: ["latin"] });

export default function Home() {
  return (
    <main className="page !gap-20">
      <div>
        <div className={`text-6xl text-center ${handwriting.className}`}>
          our
        </div>
        <div className={`font-thin text-9xl ${headerFont.className}`}>GITA</div>
      </div>
      <div className={`text-3xl font-bold -mb-2 ${headerFont.className}`}>
        BHAGAVAD GITA
      </div>
      <div className="flex justify-center gap-20 w-full">
        <div className="text-center flex flex-col items-center">
          Design inspired by: <br />
          <Link href={"https://devdutt.com/my-gita/"}>My Gita</Link>
        </div>
        <div className="text-center">
          Powered by: <br />
          <Link href={"https://github.com/gita/bhagavad-gita-api"}>
            Bhagavad Gita API
          </Link>
        </div>
      </div>
    </main>
  );
}
