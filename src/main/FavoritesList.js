import React from "react";
import { connect } from "react-redux";
import "./FavoritesList.css";

function FavoritesList(props) {
  const { favoriteList } = props;
  return (
    <div className="favorites">
      <h1 className="favorites__title">Your favorite beers</h1>
      <div className="favorites__container">
        {favoriteList.map(({ id, image_url, tagline, name, description }) => {
          return (
            <div className="favorites__card card" key={id}>
              <img className="card__img" src={image_url} alt="Beer logo" />
              <div className="card__info">
                <h2 className="card__favorite-name">{name}</h2>
                <h4 className="card__favorite-flavour">{tagline}</h4>
                <h3 className="card__favorite-description">{description}</h3>
                <div></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default connect((state) => ({
  favoriteList: state.favoriteList,
}))(FavoritesList);
