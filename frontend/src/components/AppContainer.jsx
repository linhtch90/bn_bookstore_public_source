import React from "react";
import NavBar from "./NavBar";
import styles from "./AppContainer.module.css";
import { BrowserRouter, Switch, Route, HashRouter } from "react-router-dom";

import Home from "./Home";
import Bookstore from "./Bookstore";
import Contact from "./Contact";
import BookDetail from "./BookDetail";
import BookSearchResults from "./BookSearchResults";
import Cart from "./Cart";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AdminSignIn from "./AdminSignIn";
import AdminOrders from "./AdminOrders";

function AppContainer() {
  return (
    <div className={styles.outerContainer}>
      <HashRouter>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/bookstore/books_search/:searchTitle">
            <BookSearchResults />
          </Route>

          <Route path="/bookstore/book/:id">
            <BookDetail />
          </Route>

          <Route path="/bookstore/page">
            <Bookstore />
          </Route>

          <Route path="/contact">
            <Contact />
          </Route>

          <Route path="/cart">
            <Cart />
          </Route>

          <Route path="/user/signin">
            <SignIn />
          </Route>

          <Route path="/user/signup">
            <SignUp />
          </Route>

          <Route path="/admin/signin">
            <AdminSignIn />
          </Route>

          <Route path="/admin/orders">
            <AdminOrders />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default AppContainer;
