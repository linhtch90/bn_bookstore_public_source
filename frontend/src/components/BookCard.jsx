import React from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addBookToCart, calcTotalMoney } from "../features/orderBooks/orderBooksSlice";

import { Button } from "primereact/button";

import styles from "./BookCard.module.css";

function BookCard(props) {
  let history = useHistory();

  const dispatch = useDispatch();

  const book = {
    id: props.id,
    imgSrc: props.imgSrc,
    title: props.title,
    author: props.author,
    price: parseFloat(props.price),
    orderQuantity: 1,
  };

  function navigateBookDetail() {
    history.push(`/bookstore/book/${props.id}`);
  }

  return (
    <div className="p-d-flex p-jc-center p-my-4 p-px-4 p-py-4 p-shadow-3">
      <div className={styles.imageContainer}>
        <img alt={props.title} src={props.imgSrc} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.cardTitle}>{props.title}</div>
        <div className={styles.cardAuthor}>Author: {props.author}</div>
        <div className={styles.cardPrice}>Price: ${props.price}</div>
        <div className={styles.cardButtonContainer}>
          <Button
            label="Add to Cart"
            icon="pi pi-check-circle"
            className={styles.addCartButton}
            onClick={() => {
              dispatch(addBookToCart(book));
              dispatch(calcTotalMoney())
            }}
          />
          <Button
            label="Details"
            icon="pi pi-info-circle"
            className={`p-button-info ${styles.addCartButton}`}
            onClick={navigateBookDetail}
          />
        </div>
      </div>
    </div>
  );
}

export default BookCard;
