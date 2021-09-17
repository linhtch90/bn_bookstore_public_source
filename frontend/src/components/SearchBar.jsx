import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import styles from "./SearchBar.module.css";

function SearchBar() {
  let history = useHistory();

  const [searchTitle, setSearchTitle] = useState("");

  function handleChange(e) {
    setSearchTitle(e.target.value);
  }

  function handleSearchClick(e) {
    if (searchTitle) {
      const searchLocation = `/bookstore/books_search/${searchTitle}`;
      history.push(searchLocation);
    }
  }

  function handleSearchPress(e) {
    if (e.key === "Enter") {
      if (searchTitle) {
        const searchLocation = `/bookstore/books_search/${searchTitle}`;
        history.push(searchLocation);
      }
    }
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className="p-col-12">
          <div className="p-inputgroup p-my-6">
            <InputText
              placeholder="Search by Title"
              value={searchTitle}
              onChange={handleChange}
              onKeyDown={handleSearchPress}
            />
            <Button
              icon="pi pi-search"
              label="Search"
              onClick={handleSearchClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
