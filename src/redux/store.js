import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import profileReducer from "./slices/profileSlice";
import cartReducer from "./slices/cartSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile : profileReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
