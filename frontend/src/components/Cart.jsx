import React from "react";

import { useSelector } from "react-redux";

import CartItem from "./CartItem";
import Order from "./Order";

import styles from "./Cart.module.css";

function Cart() {
  const books = useSelector((state) => state.orderBooks.orderBooks);
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div>
          <h1>Cart Information</h1>
        </div>
        <div className={styles.cartInformation}>
          <div className={styles.cartBooks}>
            {books.map((book) => (
              <CartItem
                key={book.id}
                id={book.id}
                title={book.title}
                imgSrc={book.imgSrc}
                author={book.author}
                price={book.price}
                orderQuantity={book.orderQuantity}
              />
            ))}
          </div>
          <div className={styles.cartTotal}>
            <Order books={books} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
