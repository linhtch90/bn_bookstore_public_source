import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import axios from "axios";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";

import styles from "./SignUp.module.css";

function SignUp() {
  const toast = useRef(null);

  const [formData, setFormData] = useState({});
  const [successConfirm, setSuccessConfirm] = useState(false);

  async function postNewUser(userData) {
    let response = await axios({
      method: "post",
      url: "/user/signup",
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.createUser === "success") {
      setSuccessConfirm(true);
    }
  }

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Successful!",
      detail: "You can sign in now.",
      life: 2500,
    });
  };

  const showFail = () => {
    toast.current.show({
      severity: "error",
      summary: "Oops!!!",
      detail: "User registration fails",
      life: 2500,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accept: false,
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Name is required.";
      }

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

      if (!data.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
      }

      if (!data.accept) {
        errors.accept = "You need to agree to the terms and conditions.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      postNewUser(data);
      formik.resetForm();
      if (successConfirm === true) {
        showSuccess();
      } else {
        showFail();
      }
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

  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="p-mt-2">Suggestions</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} position="bottom-right" />
      <div className="form-demo">
        <div className="p-d-flex p-jc-center">
          <div className="card">
            <h1 className={`p-text-center ${styles.titleText}`}>
              User Sign Up
            </h1>
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className={styles.pField}>
                <span className="p-float-label">
                  <InputText
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("name"),
                    })}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({
                      "p-error": isFormFieldValid("name"),
                    })}
                  >
                    Name*
                  </label>
                </span>
                {getFormErrorMessage("name")}
              </div>
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
                    header={passwordHeader}
                    footer={passwordFooter}
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

              <div className={styles.pField}>
                <span className="p-float-label">
                  <Password
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    toggleMask
                    className={classNames({
                      "p-invalid": isFormFieldValid("confirmPassword"),
                    })}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className={classNames({
                      "p-error": isFormFieldValid("confirmPassword"),
                    })}
                  >
                    Confirm Password*
                  </label>
                </span>
                {getFormErrorMessage("confirmPassword")}
              </div>

              <div className={styles.pField}>
                <Checkbox
                  inputId="accept"
                  name="accept"
                  checked={formik.values.accept}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("accept"),
                  })}
                />
                <label
                  htmlFor="accept"
                  className={classNames({
                    "p-error": isFormFieldValid("accept"),
                  })}
                >
                  &nbsp; &nbsp;I agree to the terms and conditions*
                </label>
              </div>

              <Button type="submit" label="Sign Up" className="p-mt-6" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
