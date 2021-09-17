import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import axios from "axios";
import {useHistory} from "react-router-dom";

import { useDispatch } from "react-redux";
import { userSignIn } from "../features/orderBooks/userSlice";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";

import styles from "./SignIn.module.css";

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();

  const toast = useRef(null);

  const [formData, setFormData] = useState({});

  async function postSignIn(userData) {
    try {
      let response = await axios({
        method: "post",
        url: "/user/signin",
        data: {
          email: userData.email,
          password: userData.password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.signInStatus === "success") {
        window.localStorage.setItem("bnToken", response.data.token);
        window.localStorage.setItem("bnUserID", response.data.id);
        dispatch(userSignIn());
        showSuccess();
        history.push("/");
      }
    } catch (err) {
      showFail();
    }
  }

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Welcome!",
      detail: "Signed in successfully",
      life: 2500,
    });
  };

  const showFail = () => {
    toast.current.show({
      severity: "error",
      summary: "Oops!!!",
      detail: "Sign in fails",
      life: 2500,
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      if (!data.password) {
        errors.password = "Password is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      postSignIn(data);
      formik.resetForm();
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div className="form-demo">
      <Toast ref={toast} position="bottom-right" />
      <div className="p-d-flex p-jc-center">
        <div className="card">
          <h1 className={`p-text-center ${styles.titleText}`}>User Sign In</h1>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className={styles.pField}>
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("email"),
                  })}
                />
                <label
                  htmlFor="email"
                  className={classNames({
                    "p-error": isFormFieldValid("email"),
                  })}
                >
                  Email*
                </label>
              </span>
              {getFormErrorMessage("email")}
            </div>
            <div className={styles.pField}>
              <span className="p-float-label">
                <Password
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  toggleMask
                  className={classNames({
                    "p-invalid": isFormFieldValid("password"),
                  })}
                />
                <label
                  htmlFor="password"
                  className={classNames({
                    "p-error": isFormFieldValid("password"),
                  })}
                >
                  Password*
                </label>
              </span>
              {getFormErrorMessage("password")}
            </div>

            <Button type="submit" label="Sign In" className="p-mt-6" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
