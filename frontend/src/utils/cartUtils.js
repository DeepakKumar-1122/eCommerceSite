export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  state.taxPrice = addDecimals(state.itemsPrice * 0.15);

  state.totalPrice = addDecimals(
    Number(state.itemsPrice)
    + Number(state.shippingPrice) 
    + Number(state.taxPrice)
  );

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
}