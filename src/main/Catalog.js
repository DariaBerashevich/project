import React, { useState } from "react";

function Catalog() {
  let data;
  const [state, setstate] = useState([]);
  let xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      data = JSON.parse(xhttp.responseText);
    }
    setstate(data);
  };
  xhttp.open("GET", "https://api.punkapi.com/v2/beers", true);
  xhttp.send(null);

  return (
    <div className="catalog">
      {state.map((obj) => {
        return (
          <div className="catalog__card card" key={obj.id}>
            <img className="card__image" src={obj.image_url} alt="Beer logo" />
            <div className="card__description">
              <h2 className="card__beer-name">{obj.name}</h2>
              <h4 className="card__beer-description">{obj.tagline}</h4>
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
