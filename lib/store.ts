import { configureStore } from "@reduxjs/toolkit";

import afterLoginReducer from "./slice/afterLoginSlice/afterLoginSlice";
import signupFormReducer from "./slice/signupForm/signupFormSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      signUpForm: signupFormReducer,
      afterLoginSlice: afterLoginReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
