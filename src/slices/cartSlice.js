import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity++;
      } else {
        action.payload.quantity = 1;
        state.items = [...state.items, action.payload];
      }
    },
    removeFromCart: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      let newCart = [...state.items];

      if (existingItemIndex !== -1) {
        if (newCart[existingItemIndex].quantity > 1) {
          newCart[existingItemIndex].quantity--;
        } else if (newCart[existingItemIndex].quantity === 1) {
          newCart.splice(existingItemIndex, 1);
        } else {
          console.log(`Cannot remove product ${action.payload.id}.`);
        }
      }

      state.items = newCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectItems = (state) => state.cart.items;
export const selectTotalItemsInCart = (state) => {
  const cartItemQuantity = state.cart.items
    .map((item) => item.quantity)
    .reduce((acc, curr) => acc + curr, 0);
  return cartItemQuantity;
};
export const selectTotal = (state) => {
  return state.cart.items.reduce((acc, curr) => acc + curr.price, 0);
};

export default cartSlice.reducer;
