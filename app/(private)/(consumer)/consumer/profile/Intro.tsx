import dbConnect from "@/lib/dbConnect";
import { getCurrentUserData } from "@/lib/hooks/getCurrentUserData";
import UserModel from "@/lib/model/auth/UserModel";
import Image from "next/image";

const Intro = async () => {
  const user = await getCurrentUserData();
  const getSkillAndBio = async () => {
    try {
      await dbConnect();
      const data = await UserModel.findById(
        user?.id,
        "skills email createdAt bio -_id",
      );
      return data;
    } catch (Error) {
      console.log("ERROR IN CONSUMER PROFILE INTRO: ", Error);
    }
  };
  const skillsAndBio = await getSkillAndBio();
  const joinedDate = new Date(skillsAndBio.createdAt)
    .toISOString()
    .split("T")[0]
    .split("-")[0];
  console.log("USER DATA :", skillsAndBio);

  return (
    <section className="rounded-md  gap-4 p-4 h-[50vh] bg-surface flex">
      <div className="relative  flex-1  overflow-hidden">
        <Image
          src={user?.profileImg || "/hero/kaamdhaam_hero.jpeg"}
          alt={user?.name || "User Image"}
          fill
          className="object-cover object-center aspect-square "
        />
      </div>

      <div className="flex flex-2 flex-col justify-around ">
        <div className="flex flex-col gap-4">
          <div className=" tracking-tight leading-tight">
            <h1 className="captialize">{user?.name}</h1>
            <code className="text-muted-text">{skillsAndBio.email}</code>
          </div>
          <div className="">Joined in {joinedDate}</div>
        </div>

        {/* <div className="flex  flex-col"> */}
        {/* <p className="text-xs">Skills</p> */}
        <div className="flex gap-4 flex-wrap">
          {skillsAndBio.skills.map((e, index: number) => (
            <p key={index} className="px-2 py-1 text-xs bg-gray-300 rounded-md">
              {e.label}
            </p>
          ))}
        </div>
        {/* </div> */}

        {/* <div>
            <div>Trust Score </div>
            <div>3/5 </div>
          </div>
          <div>
            <div>Total Tour </div>
            <div>25 </div>
          </div> */}
      </div>
    </section>
  );
};

export default Intro;
