import { createSlice } from "@reduxjs/toolkit";

// Load initial state from local storage if exists
const loadCartFromStorage = () => {
  try {
    const serializedState = localStorage.getItem("cartItems");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const saveCartToStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartItems", serializedState);
  } catch (err) {
    console.error("Could not save cart state", err);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.product._id === product._id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product._id !== productId);
      saveCartToStorage(state.items);
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.product._id === productId);
      if (item) {
        item.quantity += 1;
      }
      saveCartToStorage(state.items);
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.product._id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
