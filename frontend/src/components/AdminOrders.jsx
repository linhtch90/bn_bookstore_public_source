import React, { useEffect, useState } from "react";
import axios from "axios";

import InvoiceCard from "./InvoiceCard";

import styles from "./AdminOrders.module.css";

function AdminOrders() {
  const adminToken = window.localStorage.getItem("bnToken");
  const [invoices, setInvoices] = useState([]);

  async function getInvoices() {
    let response = await axios({
      method: "get",
      url: "/admin/orders",
      headers: {
        Authorization: `JWT ${adminToken}`,
        "Content-Type": "application/json",
      },
    });
    setInvoices(response.data);
  }

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <h1>List of Invoices</h1>
        <br />
        {invoices.map((invoice) => (
          <InvoiceCard key={invoice._id} invoice={invoice} />
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
