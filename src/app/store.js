import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../features/product/productSlice";
import authReducer from "../features/auth/authSlice";  // Adjusted the import
import counterReducer from "../features/counter/counterSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,  // Adjusted the reducer name to 'auth'
    cart: cartReducer, // reducer for cart
    counter: counterReducer, // new
  },
});

// New one

// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from "../features/auth/authSlice";  // Adjusted the import

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,  // Adjusted the reducer name to 'auth'
//   },
// });
