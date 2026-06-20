export type stepsDataType = {
  label: string;
};

export type skillOptionDataType = {
  value: string;
  label: string;
  rate: string;
  rateType: "per Hour" | "per Task" | "per Day";
};

export type skillRateDataType = {
  skill: string;
  rate: string;
};

export type signoutFormDataType = {
  name: string;
  age: string;
  email: string;
  phone: string;
  profileImg: string;
  skill: skillRateDataType[];
  bio: string;
};

export type loginFormDataType = {
  email: string;
  password: string;
  // coordinate:
};
