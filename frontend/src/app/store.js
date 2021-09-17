import { configureStore } from "@reduxjs/toolkit";

import orderBooksReducer from "../features/orderBooks/orderBooksSlice";
import userReducer from "../features/orderBooks/userSlice";

export default configureStore({
  reducer: {
    orderBooks: orderBooksReducer,
    userManagement: userReducer,
  },
});
