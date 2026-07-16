import { afterLoginDataType } from "@/app/(public)/(auth)/signup/(forms)/type";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: afterLoginDataType = {
  _id: "",
  name: "",
  age: "",
  email: "",
  phone: "",
  profileImg: "",
  skills: [],
  bio: "",
  role: "",
  locationCord: { type: "Point" },
  createdAt: "",
  updatedAt: "",
};

export const afterLoginSlice = createSlice({
  name: "afterLoginSlice",
  initialState,
  reducers: {
    saveLoginDataFromDb: (state, action: PayloadAction<afterLoginDataType>) => {
      console.log("Reducer called", action.payload);
      const {
        _id,
        name,
        age,
        email,
        phone,
        profileImg,
        skills,
        bio,
        role,
        locationCord,
        createdAt,
        updatedAt,
      } = action.payload;

      Object.assign(state, {
        _id,
        name,
        age,
        email,
        phone,
        profileImg,
        skills,
        bio,
        role,
        locationCord,
        createdAt,
        updatedAt,
      });
    },
  },
});

export const { saveLoginDataFromDb } = afterLoginSlice.actions;
export default afterLoginSlice.reducer;
