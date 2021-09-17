import { createSlice } from "@reduxjs/toolkit";

export const orderBooksSlice = createSlice({
  name: "orderBooks",
  initialState: {
    orderBooks: [],
    totalMoney: 0,
  },
  reducers: {
    addBookToCart: (state, action) => {
      let exist = false;
      if (state.orderBooks.length === 0) {
        state.orderBooks.push(action.payload);
      } else {
        for (let orderBook of state.orderBooks) {
          if (orderBook.id === action.payload.id) {
            exist = true;
          }
        }
        if (exist === false) {
          state.orderBooks.push(action.payload);
        }
      }
    },
    removeBookFromCart: (state, action) => {
      state.orderBooks = state.orderBooks.filter(
        (orderBook) => orderBook.id !== action.payload.id
      );
    },
    increaseQuantity: (state, action) => {
      for (let orderBook of state.orderBooks) {
        if (orderBook.id === action.payload.id) {
          orderBook.orderQuantity += 1;
        }
      }
    },
    decreaseQuantity: (state, action) => {
      for (let orderBook of state.orderBooks) {
        if (orderBook.id === action.payload.id) {
          orderBook.orderQuantity -= 1;
        }
      }
    },
    changeQuantity: (state, action) => {
      for (let orderBook of state.orderBooks) {
        if (orderBook.id === action.payload.id) {
          orderBook.orderQuantity = parseInt(action.payload.orderQuantity);
        }
      }
    },
    calcTotalMoney: (state) => {
      let total = 0;
      for (let orderBook of state.orderBooks) {
        total =
          total +
          parseInt(orderBook.orderQuantity) * parseFloat(orderBook.price);
      }
      state.totalMoney = total;
    },
    cleanCart: (state) => {
      state.orderBooks = [];
      state.totalMoney = 0;
    },
  },
});

export const {
  addBookToCart,
  removeBookFromCart,
  increaseQuantity,
  decreaseQuantity,
  changeQuantity,
  calcTotalMoney,
  cleanCart,
} = orderBooksSlice.actions;

export default orderBooksSlice.reducer;
