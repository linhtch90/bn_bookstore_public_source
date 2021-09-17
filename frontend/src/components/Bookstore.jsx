import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import axios from "axios";

import { ProgressSpinner } from 'primereact/progressspinner';

import SearchBar from "./SearchBar";
import BookCard from "./BookCard";
import PageSwitch from "./PageSwitch";

import styles from "./Bookstore.module.css";

function Bookstore() {
  let {path} = useRouteMatch();
  let history = useHistory();
  
  const fetchUrl = "/books";

  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookItem, setBookItem] = useState(0);
  const [loaded, setLoaded] = useState(false);


  function onChangePageNumber(pageNumber) {
    setCurrentPage(pageNumber);
    setBookItem((pageNumber - 1) * 10);
    history.push(`/bookstore/page/${pageNumber}`);
  }

  useEffect(() => {
    const fetchBooks = async () => {
      const results = await axios.get(fetchUrl);
      setBooks(results.data);
      setTotalPages(
        results.data.length % 10 === 0
          ? results.data.length / 10
          : parseInt(results.data.length / 10) + 1
      );
      setLoaded(true);
    };
    fetchBooks();
  }, []);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <SearchBar />
        <Switch>
        <Route exact path={path}>
            <div className="p-d-flex p-flex-column p-jc-center p-grid">
              {!loaded ? <ProgressSpinner /> : books.slice(bookItem, currentPage * 10).map((book) => (
                <BookCard
                  title={book.title}
                  author={book.author}
                  imgSrc={book.image_src}
                  price={book.price}
                  id={book._id}
                  key={book._id}
                />
              ))}
            </div>
          </Route>
          <Route path={`${path}/:${currentPage}`}>
            <div className="p-d-flex p-flex-column p-jc-center p-grid">
              {!loaded ? <ProgressSpinner /> : books.slice(bookItem, currentPage * 10).map((book) => (
                <BookCard
                  title={book.title}
                  author={book.author}
                  imgSrc={book.image_src}
                  price={book.price}
                  id={book._id}
                  key={book._id}
                />
              ))}
            </div>
          </Route>
        </Switch>
        <PageSwitch
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePageNumber={onChangePageNumber}
        />
      </div>
    </div>
  );
}

export default Bookstore;
