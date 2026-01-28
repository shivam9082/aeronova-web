import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice"; // <-- import
import productReducer from "./slices/productSlice"; // <-- import


export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile : profileReducer,
    product: productReducer,
  },
});
