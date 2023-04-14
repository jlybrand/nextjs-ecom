export default function getCartItemQuantity(items) {
  const cartItemQuantity = items
    .map((item) => item.quantity)
    .reduce((acc, curr) => acc + curr, 0);

  return cartItemQuantity;
}
