import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Button } from "primereact/button";

import styles from "./SignUpYup.module.css";

function SignUpYup() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <di className={styles.formContainer}>
        <h1 className={styles.pageTitle}>User Sign Up</h1>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              lastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string()
                .required("Please Enter your password")
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                ),
              confirmPassword: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Passwords must match"
              ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form className={styles.formContainer}>
              <label htmlFor="firstName" className={styles.labelText}>
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                className={styles.inputText}
              />            
              <ErrorMessage name="firstName" className={styles.errorText} component="div" />
              <br />

              <label htmlFor="lastName" className={styles.labelText}>Last Name</label>
              <Field name="lastName" type="text" className={styles.inputText} />          
              <ErrorMessage name="lastName" className={styles.errorText} component="div" />
              <br />

              <label htmlFor="email" className={styles.labelText}>Email Address</label>
              <Field name="email" type="email" className={styles.inputText} />           
              <ErrorMessage name="email" className={styles.errorText} component="div" />
              <br />

              <label htmlFor="password" className={styles.labelText}>Password</label>
              <Field
                name="password"
                type="password"
                className={styles.inputText}
              />         
              <ErrorMessage name="password" className={styles.errorText} component="div" />
              <br />

              <label htmlFor="confirmPassword" className={styles.labelText}>Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                className={styles.inputText}
              />      
              <ErrorMessage name="confirmPassword" className={styles.errorText} component="div" />
              <br />

              <Button label="Sign Up" type="submit"></Button>
            </Form>
          </Formik>
        </di>
      </div>
    </div>
  );
}

export default SignUpYup;
