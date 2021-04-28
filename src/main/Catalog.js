import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchForm from "./SearchForm";
import "./Catalog.css";
import beersUrl from "../constants";
import { setLoad, setFavorite, deleteFavorite } from "../redux/actions.js";
import BeerCard from "./BeerCard";

function Catalog(props) {
  const [beerList, setBeerList] = useState([]);

  const {
    searchText,
    alcoholVol,
    bitterness,
    colorEBC,
    beerAmount,
    onSetLoadResult,
    onSetFavorite,
    onDeleteFavorite,
    favoriteList,
  } = props;

  useEffect(() => {
    fetch(
      `${beersUrl}?per_page=${beerAmount}&abv_gt=${alcoholVol}&ibu_gt=${bitterness}&ebc_gt=${colorEBC}${
        searchText === "" ? `` : `&beer_name=${searchText}`
      }`
    )
      .then((response) => response.json())
      .then((products) => setBeerList(products))
      .catch((err) => alert("Something went wrong: " + err));
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
        {beerList.map((beer) => {
          return (
            <BeerCard
              key={beer.id}
              beer={beer}
              onSetFavorite={onSetFavorite}
              onDeleteFavorite={onDeleteFavorite}
              favoriteList={favoriteList}
            />
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
    onSetFavorite: (beer) => {
      dispatch(setFavorite(beer));
    },
    onDeleteFavorite: (id) => {
      dispatch(deleteFavorite(id));
    },
  })
)(Catalog);
