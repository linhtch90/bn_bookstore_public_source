import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import {
  addBookToCart,
  calcTotalMoney,
} from "../features/orderBooks/orderBooksSlice";

import { Button } from "primereact/button";

import styles from "./BookDetail.module.css";

function BookDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetchUrl = `/books/book_details/${id}`;

  const [bookData, setBookData] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      const result = await axios.get(fetchUrl);
      const book = {
        id: result.data._id,
        imgSrc: result.data.image_src,
        title: result.data.title,
        author: result.data.author,
        price: parseFloat(result.data.price),
        orderQuantity: 1,
        isbn_13: result.data.isbn_13,
        publisher: result.data.publisher,
        publish_date: result.data.publish_date,
        pages: result.data.pages,
      };
      setBookData(book);
    };
    fetchBook();
  }, []);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className="p-d-flex p-jc-center">
          <div className={styles.imageContainer}>
            <img alt={bookData.title} src={bookData.imgSrc} />
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.cardTitle}>{bookData.title}</div>
            <div className={styles.cardAuthor}>Author: {bookData.author}</div>
            <div className={styles.cardPrice}>Price: ${bookData.price}</div>
            <div className={styles.additionalInfo}>Additional Information</div>
            <div>
              ISBN 13: <b>{bookData.isbn_13}</b>
            </div>
            <div>
              Publisher: <b>{bookData.publisher}</b>
            </div>
            <div>
              Publish Date: <b>{bookData.publish_date}</b>
            </div>
            <div>
              Pages: <b>{bookData.pages}</b>
            </div>
            <div className={styles.cardButtonContainer}>
              <Button
                label="Add to Cart"
                icon="pi pi-check-circle"
                className={styles.addCartButton}
                onClick={() => {
                  dispatch(addBookToCart(bookData));
                  dispatch(calcTotalMoney());
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
