import Link from "next/link";
import { headerNavData } from "./data";
import type { headerNavDataType } from "./type";

const Header = () => {
  return (
    <header className="border fixed w-full bg-dark px-lg h-22 flex justify-between items-center">
      <nav className="flex w-2/5 justify-between ">
        <div>KAAMDHAAM</div>
        {headerNavData.map((e: headerNavDataType, index: number) => (
          <div key={index}>{e.title}</div>
        ))}
      </nav>

      <nav className="">
        <Link href={"/login"}>Explore</Link>
      </nav>
    </header>
  );
};

export default Header;
