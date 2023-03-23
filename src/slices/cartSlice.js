import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      let newCart = [...state.items];
      console.log("INDEX :", index);

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.log(`Cannot remove product ${action.payload.id}.`);
      }
      state.items = newCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) => {
  return state.cart.items.reduce((acc, curr) => acc + curr.price, 0);
};
export default cartSlice.reducer;
