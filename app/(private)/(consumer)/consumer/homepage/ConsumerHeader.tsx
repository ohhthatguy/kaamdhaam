import { getCurrentUserData } from "@/lib/hooks/getCurrentUserData";
import Link from "next/link";

type consumerDataType = {
  title: string;
  link: string;
};

const consumerData: consumerDataType[] = [
  {
    title: "Home",
    link: "/consumer/homepage",
  },

  {
    title: "My Application",
    link: "/consumer/applications",
  },

  {
    title: "Profile",
    link: "",
  },

  {
    title: "Home",
    link: "/consumer/homepage",
  },
];

const ConsumerHeader = async () => {
  const user = await getCurrentUserData();
  return (
    <header className=" flex justify-between items-center px-4 h-18 bg-light">
      <nav className="flex   items-center gap-8">
        <Link href={"/consumer/homepage"} className="mr-8 text-xl">
          KAAMDHAAM
        </Link>
        {consumerData.map((e: consumerDataType, index: number) => (
          <Link
            href={
              e.title === "Profile" ? `/profile?workerId=${user?.id}` : e.link
            }
            className="relative text-md hover:cursor-pointer hover:font-semibold transition-all duration-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current hover:after:w-full after:transition-all after:duration-300"
            key={index}
          >
            {e.title}
          </Link>
        ))}
      </nav>

      <nav className="text-md">Logout</nav>
    </header>
  );
};

export default ConsumerHeader;
