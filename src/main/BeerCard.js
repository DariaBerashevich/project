import React from "react";

function BeerCard(props) {
  const { beer, onDeleteFavorite, onSetFavorite, favoriteList } = props;
  const { id, name, image_url, tagline } = beer;
  const isFav = favoriteList.find((item) => item.id === id);
  return (
    <div className="catalog__card card" key={id}>
      <img className="card__image" src={image_url} alt="Beer logo" />
      <div className="card__description">
        <h2 className="card__beer-name">{name}</h2>
        <h4 className="card__beer-description">{tagline}</h4>
        <div>
          <button>Open</button>
          <button
            onClick={() => {
              isFav ? onDeleteFavorite(id) : onSetFavorite(beer);
            }}
          >
            {isFav ? "Delete" : "Add to favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BeerCard;
