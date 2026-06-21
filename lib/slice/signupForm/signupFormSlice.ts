import type {
  introSignupDataType,
  signUpFormDataType,
  skillOptionDataType,
} from "@/app/(public)/(auth)/signup/(forms)/type";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: signUpFormDataType = {
  name: "",
  age: "",
  email: "",
  phone: "",
  profileImg: "asdasdasd",
  skill: [],
  bio: "",
  password: "",
};

export const signUpFormSlice = createSlice({
  name: "signUpForm",
  initialState,
  reducers: {
    updateIntroForm: (state, action: PayloadAction<introSignupDataType>) => {
      return { ...state, ...action.payload };
    },

    updateSkillRateForm: (
      state,
      action: PayloadAction<skillOptionDataType[]>,
    ) => {
      state.skill = action.payload;
    },

    resetForm: () => initialState,
  },
});

export const { updateIntroForm, updateSkillRateForm, resetForm } =
  signUpFormSlice.actions;
export default signUpFormSlice.reducer;
