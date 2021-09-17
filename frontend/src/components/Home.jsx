import React from "react";

import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <h1>Welcome to my personal project: BN Bookstore</h1>
        <div>
          <p>
            BN Bookstore is developed using MERN stack (MongoDB, ExpressJS,
            ReactJS and NodeJS) to demonstrate the stack's capabilities for
            educational purpose.
          </p>
          <p>
            The following list are libraries and frameworks which were used in this project:
          </p>
          <ul>
            <li>
              Frontend: <a href={"https://reactjs.org/"}>ReactJS</a>,{" "}
              <a href={"https://redux.js.org/"}>Redux</a>,{" "}
              <a href={"https://reactrouter.com/"}>React Router</a>,{" "}
              <a href={"https://formik.org/"}>Formik</a>,{" "}
              <a href={"https://www.primefaces.org/primereact/"}>PrimeReact</a>
            </li>
            <li>
              Backend: <a href={"https://expressjs.com/"}>ExpressJS</a>,{" "}
              <a href={"https://github.com/dcodeIO/bcrypt.js#readme"}>
                Bcryptjs
              </a>
              ,{" "}
              <a href={"https://github.com/auth0/node-jsonwebtoken#readme"}>
                Jsonwebtoken
              </a>
              , <a href={"http://www.passportjs.org/"}>PassportJS</a>,{" "}
              <a href={"https://github.com/expressjs/cors#readme"}>CORS</a>
            </li>
            <li>
              Database: <a href={"https://www.mongodb.com/"}>MongoDB Atlas</a>
            </li>
          </ul>
          <p>
            BN Bookstore provides different functions for customers and admins,
            including:
          </p>
          <ul>
            <li>
              Customers: Sign In, Sign Up, browse books, search books by title, view detail information
              of a book, add books to cart, cart management, submit books order
            </li>
            <li>Admin:</li>
            <ul>
              <li>
                There is only one Admin account available. Admin sign in page
                can be access via domain.com/admin/signin
              </li>
              <li>
                After logging in, the admin is directed to a specific page to
                view all the available invoices
              </li>
            </ul>
            <li>Authentication: Salt and hash</li>
            <li>Authorization: JWT (JSON Web Token, the token expires in 1 hour)</li>
          </ul>
        </div>
        <p>
          <b>
            Notes: Beautiful and responsive CSS effects is not the purpose of
            this project
          </b>
        </p>
        <br />
        <br />
        <h2>Developer Contact:</h2>
        <p>
          <i className="pi pi-envelope"></i> <b>Email:</b> linhtch90@gmail.com
        </p>
        <p>
          <i className="pi pi-github"></i> <b>Github:</b>{" "}
          https://github.com/linhtch90
        </p>
      </div>
    </div>
  );
}

export default Home;
