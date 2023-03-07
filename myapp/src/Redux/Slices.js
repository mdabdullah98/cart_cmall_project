import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartOpenClose: false,
    cartItem: [],
    totalQuantity: 0,
  },
  reducers: {
    cartOpenClose(state) {
      state.cartOpenClose = !state.cartOpenClose;
    },
    addCartItem(state, action) {
      const actionItem = action.payload;
      const existingItem = state.cartItem.find(
        (item) => item.id === actionItem.id
      );
      state.totalQuantity = state.totalQuantity++;

      if (existingItem) {
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
        existingItem.quantity = existingItem.quantity + 1;
      } else {
        state.cartItem.push({
          id: actionItem.id,
          itemName: actionItem.itemName,
          price: actionItem.price,
          totalPrice: actionItem.price,
          quantity: 1,
        });
      }
    },
    removeCartItem(state, action) {
      let actionItem = action.payload;
      const existingItem = state.cartItem.find(
        (item) => item.id === actionItem.id
      );
      //------ update total quanity
      if (existingItem.quantity > 1) {
        existingItem.quantity = existingItem.quantity - 1;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      } else {
        state.cartItem = state.cartItem.filter(
          (item) => item.id !== actionItem.id
        );
      }
      // // updaating totalprice
      // const totalPrice_array = state.cartItem.map((item) => {
      //   return item.totalPrice;
      // });

      // for (let ele of totalPrice_array) {
      //   state.totalPrice = state.totalPrice - ele;
      // }
    },
  },
});
export const { cartOpenClose, addCartItem, removeCartItem } = CartSlice.actions;
export default CartSlice;
