import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    selectedProduct: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (p) => p._id !== action.payload
      );
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  clearSelectedProduct,
  removeProduct,
} = productSlice.actions;

export default productSlice.reducer;
