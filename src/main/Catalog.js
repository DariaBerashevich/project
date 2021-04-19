import React, { useState } from "react";

const url = "https://api.punkapi.com/v2/beers";

function Catalog() {
  let data;
  const [beerList, setBeerList] = useState([]);
  let xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      data = JSON.parse(xhttp.responseText);
    }
    setBeerList(data);
  };
  xhttp.open("GET", url, true);
  xhttp.send(null);

  return (
    <div className="catalog">
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
    </div>
  );
}

export default Catalog;
