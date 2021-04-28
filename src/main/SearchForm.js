import React, { useState } from "react";
import "./SearchForm.css";
import { connect } from "react-redux";
import { setFilters, setSearch } from "../redux/actions.js";

function SearchForm(props) {
  const {
    onSetSearchResult,
    onSetFilterResult,
    alcoholVol,
    bitterness,
    colorEBC,
  } = props;
  const [inputText, setInputText] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      <form
        className="catalog-page__form form"
        onSubmit={(e) => {
          e.preventDefault();
          onSetSearchResult(inputText);
          inputText === "" ? setShowFilters(false) : setShowFilters(true);
        }}
      >
        <div className="searchInput">
          <input
            placeholder="Search..."
            type="text"
            className="form__input"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />

          <button type="submit" className="form__submit-btn">
            &#128269;
          </button>
        </div>
        <div className={`form__filter filter ${showFilters ? "show" : "hide"}`}>
          <label className="filter__item filter__item-alcohol">
            <span className="filter__value"> {alcoholVol} </span>
            Alcohol by volume
            <input
              type="range"
              min="2"
              max="14"
              name="alcohol"
              value={alcoholVol}
              step="0.1"
              onChange={(e) => {
                onSetFilterResult("alcoholVol", e.target.value);
              }}
            />
          </label>
          <label className="filter__item filter__item-bitterness">
            <span className="filter__value"> {bitterness} </span>
            International Bitterness Units
            <input
              type="range"
              min="0"
              max="120"
              name="bitterness"
              value={bitterness}
              step="1"
              onChange={(e) => {
                onSetFilterResult("bitterness", e.target.value);
              }}
            />
          </label>
          <label className="filter__item filter__item-color">
            <span className="filter__value"> {colorEBC} </span>
            Color by EBC
            <input
              type="range"
              min="4"
              max="80"
              name="color"
              value={colorEBC}
              step="1"
              onChange={(e) => {
                onSetFilterResult("colorEBC", e.target.value);
              }}
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default connect(
  (state) => state,
  (dispatch) => ({
    onSetFilterResult: (filterName, filterValue) => {
      dispatch(setFilters(filterName, filterValue));
    },
    onSetSearchResult: (inputText) => {
      dispatch(setSearch(inputText));
    },
  })
)(SearchForm);
