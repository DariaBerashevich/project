import React from "react";
import { useState } from "react/cjs/react.development";
import "./SearchForm.css";

const beersUrl = `https://api.punkapi.com/v2/beers`;

function SearchForm(props) {
  const [inputText, setInputText] = useState("");
  const [show, setShow] = useState(false);
  const [alcoholVol, setAlcoholVol] = useState(2);
  const [bitterness, setBitterness] = useState(0);
  const [colorEBC, setColorEBC] = useState(4);
  const searchUrl = `${beersUrl}?beer_name=${inputText}`;
  let searchList;
  let setBeerList = props.setBeerList;
  let xhttp = new XMLHttpRequest();

  let searchHandler = () => {
    xhttp.onload = function () {
      if (this.readyState === 4 && this.status === 200) {
        setBeerList(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.open("GET", searchUrl, true);
    xhttp.send(null);
  };

  let filterHandler = () => {
    xhttp.onload = function () {
      if (this.readyState === 4 && this.status === 200) {
        setBeerList(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.open(
      "GET",
      `${searchUrl}&abv_gt=${alcoholVol}&ibu_gt=${bitterness}&ebc_gt=${colorEBC}`,
      true
    );
    xhttp.send(null);
  };

  return (
    <div>
      <form
        className="catalog-page__form form"
        onSubmit={(e) => {
          e.preventDefault();
          searchHandler();
          inputText === "" ? setShow(false) : setShow(true);
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
            Search
          </button>
        </div>
        <div className={`form__filter filter ${show ? "show" : "hide"}`}>
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
                setAlcoholVol(e.target.value);
              }}
              onMouseUp={filterHandler}
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
              onMouseUp={filterHandler}
              onChange={(e) => {
                setBitterness(e.target.value);
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
              onMouseUp={filterHandler}
              onChange={(e) => {
                setColorEBC(e.target.value);
              }}
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
