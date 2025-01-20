import { createSlice } from "@reduxjs/toolkit";


const saveToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};


const loadFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const initialState = {
  cart: loadFromLocalStorage(),  
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      saveToLocalStorage(state.cart);  
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cart.find((item) => item.id === productId);

      if (product) {
        product.quantity += 1;
        saveToLocalStorage(state.cart);  
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cart.find((item) => item.id === productId);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
        saveToLocalStorage(state.cart);  
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== productId);
      saveToLocalStorage(state.cart);  
    },
    clearCart: (state) => {
      state.cart = [];
      saveToLocalStorage(state.cart);  
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;