import React from "react";

import styles from "./InvoiceCard.module.css";

function InvoiceCard(props) {
  return (
    <div className={styles.invoiceContainer}>
      <h1>Invoice ID: {props.invoice._id}</h1>
      <h4>Issue on: {props.invoice.createdAt}</h4>
      <h2>Customer: {props.invoice.userID.name}</h2>
      <h3>Email: {props.invoice.userID.email}</h3>
      <h3>Orders:</h3>
      {props.invoice.orderBooks.map(book => (
        <p key={book._id}>&#8226; 	&#160; {book.title}, Quantity: <b>{book.orderQuantity}</b>, Unit Price: <b>${book.price}</b>/copy</p>
      ))}
      <h2>Total: ${props.invoice.totalMoney.toFixed(2)}</h2>
    </div>
  );
}

export default InvoiceCard;
