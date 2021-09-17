import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import { ProgressSpinner } from 'primereact/progressspinner';

import SearchBar from "./SearchBar";
import BookCard from "./BookCard";
import PageSwitch from "./PageSwitch";

import styles from "./BookSearchResults.module.css";

function BookSearchResults() {
  const { searchTitle } = useParams();
  const fetchUrl = `/books/book_search_title/${searchTitle}`;

  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookItem, setBookItem] = useState(0);
  const [loaded, setLoaded] = useState(false);

  function onChangePageNumber(pageNumber) {
    setCurrentPage(pageNumber);
    setBookItem((pageNumber - 1) * 10);
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
  }, [searchTitle]);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <SearchBar />
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
        <PageSwitch
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePageNumber={onChangePageNumber}
        />
      </div>
    </div>
  );
}

export default BookSearchResults;
