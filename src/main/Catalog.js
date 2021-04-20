import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchForm from "./SearchForm";
import "./Catalog.css";

const beersUrl = `https://api.punkapi.com/v2/beers`;

function Catalog() {
  const [beerList, setBeerList] = useState([]);
  const [beerNumber, setBeerNumber] = useState(9);

  useEffect(() => {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      if (this.readyState === 4 && this.status === 200) {
        setBeerList(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.open("GET", `${beersUrl}?per_page=${beerNumber}`, true);
    xhttp.send(null);
  }, [beerNumber]);

  return (
    <div className="catalog-page">
      <SearchForm />
      <InfiniteScroll
        dataLength={beerList.length}
        next={setTimeout(() => setBeerNumber(beerNumber + 9), 2500)}
        hasMore={true || false}
        loader={<p>Loading...</p>}
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

export default Catalog;
