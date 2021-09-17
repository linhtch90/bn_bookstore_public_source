import React, { useState, useRef } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import styles from "./Order.module.css";

function Order(props) {
  const toast = useRef(null);

  let totalMoney = useSelector((state) => state.orderBooks.totalMoney);
  const [isOrderSubmit, setIsOrderSubmit] = useState(false);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Successful!",
      detail: "Your order is submitted",
      life: 2500,
    });
  };

  const showFail = () => {
    toast.current.show({
      severity: "error",
      summary: "Oops!!!",
      detail: "Submission fails",
      life: 2500,
    });
  };

  const showSignInRequire = () => {
    toast.current.show({
      severity: "warn",
      summary: "Oops!!!",
      detail: "You have not signed in yet",
      life: 2500,
    });
  };

  async function sendOrder() {
    const userID = window.localStorage.getItem("bnUserID");
    const token = window.localStorage.getItem("bnToken");
    const orderBooks = props.books;
    let response = await axios({
      method: "post",
      url: "/order",
      data: {
        id: userID,
        orderBooks: orderBooks,
        totalMoney: totalMoney,
      },
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.data.orderStatus === "success") {
      setIsOrderSubmit(true);
      showSuccess();
    } else {
      showFail();
    }
  }

  function handleOrderClick() {
    const userID = window.localStorage.getItem("bnUserID");
    const token = window.localStorage.getItem("bnToken");
    
    if (userID && token) {
        sendOrder();
    } else {
        showSignInRequire();
    }
  }

  return (
    <div className={styles.orderContainer}>
      <Toast ref={toast} position="bottom-right" />
      <div className={styles.orderTotal}>
        Total:{" "}
        <span className={styles.orderPrice}>${totalMoney.toFixed(2)}</span>
      </div>
      <Button label="Send Order" icon="pi pi-send" onClick={handleOrderClick} />
    </div>
  );
}

export default Order;
