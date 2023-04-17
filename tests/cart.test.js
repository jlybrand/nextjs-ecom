import {
  addToCart,
  cartSlice,
  removeFromCart,
  selectTotalItemsInCart,
  selectTotal,
} from "../src/slices/cartSlice.js";

describe("cartSlice", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      items: [],
    };
  });

  it("should add a new item to the cart when calling addToCart with a new item", () => {
    const item = { id: 1, name: "Product 1", price: 10 };
    const nextState = cartSlice.reducer(initialState, addToCart(item));
    expect(nextState.items).toEqual([{ ...item, quantity: 1 }]);
  });

  it("should increment the quantity of an existing item when calling addToCart with an existing item", () => {
    const existingItem = { id: 1, name: "Product 1", price: 10, quantity: 1 };
    const initialState = { items: [existingItem] };
    const nextState = cartSlice.reducer(initialState, addToCart(existingItem));
    expect(nextState.items).toEqual([{ ...existingItem, quantity: 2 }]);
  });

  it("should remove an item from the cart when calling removeFromCart with an existing item with a quantity greater than 1", () => {
    const item = { id: 1, name: "Product 1", price: 10, quantity: 2 };
    const initialState = { items: [item] };
    const nextState = cartSlice.reducer(initialState, removeFromCart(item));
    expect(nextState.items).toEqual([{ ...item, quantity: 1 }]);
  });

  it("should remove an item from the cart when calling removeFromCart with an existing item with a quantity of 1", () => {
    const item = { id: 1, name: "Product 1", price: 10, quantity: 1 };
    const initialState = { items: [item] };
    const nextState = cartSlice.reducer(initialState, removeFromCart(item));
    expect(nextState.items).toEqual([]);
  });

  it("should not remove anything from the cart when calling removeFromCart with a non-existing item", () => {
    const item = { id: 1, name: "Product 1", price: 10 };
    const nextState = cartSlice.reducer(initialState, removeFromCart(item));
    expect(nextState.items).toEqual([]);
  });

  it("should calculate the correct total number of items in the cart", () => {
    const item1 = { id: 1, name: "Product 1", price: 10, quantity: 2 };
    const item2 = { id: 2, name: "Product 2", price: 20, quantity: 1 };
    const initialState = { cart: { items: [item1, item2] } };
    const totalItemsInCart = selectTotalItemsInCart(initialState);
    expect(totalItemsInCart).toEqual(3);
  });

  it("should calculate the correct total price of the items in the cart", () => {
    const item1 = { id: 1, name: "Product 1", price: 10, quantity: 2 };
    const item2 = { id: 2, name: "Product 2", price: 20, quantity: 1 };
    const initialState = { cart: { items: [item1, item2] } };
    const totalPrice = selectTotal(initialState);
    expect(totalPrice).toEqual(40);
  });
});
