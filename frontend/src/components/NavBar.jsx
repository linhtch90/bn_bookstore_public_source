import React from "react";
import logoPicture from "../assets/bn_bookstore_logo.png";
import styles from "./NavBar.module.css";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userSignOut } from "../features/orderBooks/userSlice";
import { cleanCart } from "../features/orderBooks/orderBooksSlice";

import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { SplitButton } from "primereact/splitbutton";

function NavBar() {
  const dispatch = useDispatch();
  let cartCount = useSelector((state) => state.orderBooks.orderBooks.length);
  let isSignIn = useSelector((state) => state.userManagement.isSignIn);

  let history = useHistory();

  const userAccountItems = [
    {
      label: "Sign Out",
      icon: "pi pi-sign-out",
      command: () => {
        window.localStorage.removeItem("bnToken");
        window.localStorage.removeItem("bnUserID");
        dispatch(cleanCart());
        dispatch(userSignOut());
        history.push("/");
      },
    },
  ];

  function navigateCart() {
    if (cartCount > 0) {
      history.push("/cart");
    }
  }

  const userSplitButton = (
    <div>
      <SplitButton
        icon="pi pi-user"
        className="p-button-success"
        model={userAccountItems}
      ></SplitButton>
    </div>
  );

  const userAccountButtons = (
    <div>
      <Link to="/user/signin" className={styles.menuText}>
        <Button
          label="Sign In"
          icon="pi pi-sign-in"
          className={`p-my-1 ${styles.navButton}`}
        />
      </Link>
      <Link to="/user/signup" className={styles.menuText}>
        <Button
          label="Sign Up"
          icon="pi pi-user-plus"
          className={`p-my-1 ${styles.navButton}`}
        />
      </Link>
    </div>
  );

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.navbarContainer}>
          <div className={styles.logoContainer}>
            <img src={logoPicture} alt="BN Bookstore Logo" />
          </div>
          <div className={styles.menuContainer}>
            <div className={styles.menu}>
              <Link to="/" className={`${styles.menuText} ${styles.menuItem}`}>
                <div className={styles.menuItem}>Home</div>
              </Link>

              <Link
                to="/bookstore/page"
                className={`${styles.menuText} ${styles.menuItem}`}
              >
                <div className={styles.menuItem}>Bookstore</div>
              </Link>

              <Link
                to="/contact"
                className={`${styles.menuText} ${styles.menuItem}`}
              >
                <div className={styles.menuItem}>Contact</div>
              </Link>
            </div>
            <div className={styles.navUser}>
              {isSignIn ? userSplitButton : userAccountButtons}
            </div>
          </div>
          <div className={styles.navCartContainer} onClick={navigateCart}>
            <i
              className={`pi pi-shopping-cart p-overlay-badge ${styles.cartIcon}`}
              style={{ fontSize: "2rem" }}
            >
              {cartCount > 0 ? (
                <Badge
                  value={cartCount}
                  className={styles.badgeContent}
                ></Badge>
              ) : (
                ""
              )}
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
