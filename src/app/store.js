import { configureStore } from "@reduxjs/toolkit";
import shoppingListSlice from "../features/shoppingListSlice";

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListSlice,
  },
});