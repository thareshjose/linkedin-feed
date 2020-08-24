import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Search.css";

function Search() {
  return (
    <div className="headerSearch">
      <input type="text" placeholder="Search" className="headerSearch__input" />
      <SearchIcon className="headerSearch__icon" />
    </div>
  );
}

export default Search;
