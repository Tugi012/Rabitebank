import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../redux/productSlice';
import cartReducer from '../redux/cartSlice';
import authReducer from '../redux/authSlice';

export default configureStore({
    reducer:{  
        products: productReducer,
        cart: cartReducer,
        auth:authReducer,
    },
});
