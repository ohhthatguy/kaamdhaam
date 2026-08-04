import { headers } from "next/headers";

type CurrentUserData = {
  name: string;
  email: string;
  role: "CONSUMER" | "PRODUCER" | "ADMIN";
  profileImg: string;
  id: string;
};

export const getCurrentUserData = async (): Promise<
  CurrentUserData | undefined
> => {
  // server side only
  try {
    const headerlist = await headers();

    const name = headerlist.get("x-user-name");
    const email = headerlist.get("x-user-email");
    const role = headerlist.get("x-user-role") as
      | "CONSUMER"
      | "PRODUCER"
      | "ADMIN";
    const profileImg = headerlist.get("x-user-profileImg");
    const id = headerlist.get("x-user-id");

    if (!id || !name || !profileImg || !email || !role) {
      throw new Error("Invalid user: Missing required headers");
    }

    const userData = { name, email, role, profileImg, id };

    return userData;
  } catch (err) {
    console.log("ERROR IN useCurrentUserData(): ", err);
  }
};
