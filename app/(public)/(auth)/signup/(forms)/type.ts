export type stepsDataType = {
  label: string;
};

export type roleDataType = "CONSUMER" | "PRODUCER" | "";

export type introSignupDataType = {
  name: string;
  age: string;
  email: string;
  phone: string;
  profileImg: string;
  bio: string;
};

export type skillOptionDataType = {
  value: string;
  label: string;
  rate: string | undefined;
  rateType: "per Hour" | "per Task" | "per Day";
  isSelected?: boolean;
};

export type signUpFormDataType = introSignupDataType & {
  skills: skillOptionDataType[];
  password: string;
  role: roleDataType;
};

export type LocationCordType = {
  type: "Point";
  coordinates?: [number, number];
};

export type afterLoginDataType = {
  _id: string;
  name: string;
  age: string;
  email: string;
  phone: string;
  profileImg: string;
  skills: skillOptionDataType[];
  bio: string;
  role: string;
  locationCord: LocationCordType;

  createdAt: string;
  updatedAt: string;
};

export type loginFormDataType = {
  email: string;
  password: string;
  // coordinate:
};
