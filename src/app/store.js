import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../features/product/productSlice";
import authReducer from "../features/auth/authSlice";  // Adjusted the import
import counterReducer from "../features/counter/counterSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,  // Adjusted the reducer name to 'auth'
    cart: cartReducer, // reducer for cart
    order: orderReducer,
    user: userReducer,
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
