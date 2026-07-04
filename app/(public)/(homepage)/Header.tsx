import Link from "next/link";
import { headerNavData } from "./data";
import type { headerNavDataType } from "./type";

const Header = () => {
  return (
    <header className=" fixed z-50 w-full mt-2 flex justify-center items-center">
      <div className="  bg-dark flex justify-center items-center gap-8 p-4 rounded-md">
        <div>KAAMDHAAM</div>
        {headerNavData.map((e: headerNavDataType, index: number) => (
          <div
            className="text-xs text-black scale-100 hover:scale-105 hover:cursor-pointer hover:text-tertiary/85 transition-all duration-500"
            key={index}
          >
            {e.title}
          </div>
        ))}

        <nav className="hover:cursor-pointer">
          <Link
            href={"/login"}
            className="border p-2 rounded-md bg-tertiary/85 text-white hover:cursor-pointer hover:bg-dark/65 hover:text-tertiary/85 transition-all duration-500"
          >
            LOGIN
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
