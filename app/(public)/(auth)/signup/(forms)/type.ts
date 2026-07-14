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
};

export type signUpFormDataType = introSignupDataType & {
  skills: skillOptionDataType[];
  password: string;
  role: roleDataType;
};

export type loginFormDataType = {
  email: string;
  password: string;
  // coordinate:
};
