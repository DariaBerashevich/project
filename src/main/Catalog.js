import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchForm from "./SearchForm";
import "./Catalog.css";
import beersUrl from "../constants";
import { setLoad } from "../redux/actions.js";

function Catalog(props) {
  const [beerList, setBeerList] = useState([]);
  const {
    searchText,
    alcoholVol,
    bitterness,
    colorEBC,
    beerAmount,
    onSetLoadResult,
  } = props;

  useEffect(() => {
    fetch(
      `${beersUrl}?per_page=${beerAmount}&abv_gt=${alcoholVol}&ibu_gt=${bitterness}&ebc_gt=${colorEBC}${
        searchText === "" ? `` : `&beer_name=${searchText}`
      }`
    )
      .then((response) => response.json())
      .then((products) => setBeerList(products));
  }, [beerAmount, searchText, alcoholVol, bitterness, colorEBC]);

  return (
    <div className="catalog-page">
      <SearchForm setBeerList={setBeerList} />
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={beerList.length}
        next={() => setTimeout(() => onSetLoadResult(), 2000)}
        hasMore={beerAmount >= 72 ? false : true}
        loader={<h4>Loading...</h4>}
        endMessage={<p>That's all</p>}
        className="catalog-page__catalog catalog"
      >
        {beerList.map(({ id, image_url, tagline, name }) => {
          return (
            <div className="catalog__card card" key={id}>
              <img className="card__image" src={image_url} alt="Beer logo" />
              <div className="card__description">
                <h2 className="card__beer-name">{name}</h2>
                <h4 className="card__beer-description">{tagline}</h4>
                <div>
                  <button>Open</button>
                  <button>Favorite</button>
                </div>
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
export default connect(
  (state) => state,
  (dispatch) => ({
    onSetLoadResult: () => {
      dispatch(setLoad());
    },
  })
)(Catalog);
