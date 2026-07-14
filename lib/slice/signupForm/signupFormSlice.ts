import type {
  introSignupDataType,
  roleDataType,
  signUpFormDataType,
  skillOptionDataType,
} from "@/app/(public)/(auth)/signup/(forms)/type";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: signUpFormDataType = {
  name: "",
  age: "",
  email: "",
  phone: "",
  profileImg: "",
  skills: [],
  bio: "",
  password: "",
  role: "",
};

export const signUpFormSlice = createSlice({
  name: "signUpForm",
  initialState,
  reducers: {
    updateRole: (state, action: PayloadAction<roleDataType>) => {
      state.role = action.payload;
    },

    updateIntroForm: (state, action: PayloadAction<introSignupDataType>) => {
      Object.assign(state, action.payload);
    },

    updateSkillRateForm: (
      state,
      action: PayloadAction<skillOptionDataType[]>,
    ) => {
      state.skills = action.payload;
    },

    resetForm: () => initialState,
  },
});

export const { updateRole, updateIntroForm, updateSkillRateForm, resetForm } =
  signUpFormSlice.actions;
export default signUpFormSlice.reducer;
