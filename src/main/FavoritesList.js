import React from "react";
import { connect } from "react-redux";

function FavoritesList(props) {
  const { favoriteList } = props;
  return (
    <div>
      {favoriteList.map(({ id, image_url, tagline, name }) => {
        return (
          <div className="catalog__card card" key={id}>
            <img className="card__image" src={image_url} alt="Beer logo" />
            <div className="card__description">
              <h2 className="card__beer-name">{name}</h2>
              <h4 className="card__beer-description">{tagline}</h4>
              <div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default connect(
  (state) => state,
  (dispatch) => ({})
)(FavoritesList);
