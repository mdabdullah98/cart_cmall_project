import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./Slices";

const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
  },
});
export default store;
