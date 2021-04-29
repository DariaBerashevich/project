import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import beersUrl from "../constants";
import { connect } from "react-redux";
import { setFavorite, deleteFavorite } from "../redux/actions.js";
import "./AboutBeerPage.css";

function AboutBeerPage(props) {
  const { beerId } = useParams();
  const [beer, setBeer] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const { favoriteList, onDeleteFavorite, onSetFavorite } = props;
  useEffect(() => {
    fetch(`${beersUrl}/${beerId}`)
      .then((response) => response.json())
      .then((product) => {
        setBeer(product);
      });
  }, [beerId]);

  return (
    <div>
      {beer.map((item) => {
        const {
          id,
          name,
          tagline,
          description,
          image_url,
          abv,
          ibu,
          ebc,
          boil_volume,
          method,
          ingredients,
          food_pairing,
          brewers_tips,
        } = item;
        const { malt, hops, yeast } = ingredients;
        const { value, unit } = boil_volume;
        const { mash_temp, fermentation, twist } = method;
        const isFav = favoriteList.find((item) => item.id === id);
        return (
          <div className="beer-page">
            <div className="beer-page__basic-info basic-info">
              <div className="basic-info__container">
                <div className="basic-info__beer-title beer-title">
                  <h1 className="beer-title__name">{name}</h1>
                  <h5 className="beer-title__key-words">{tagline}</h5>
                </div>
                <button
                  className="beer-page__btn btn"
                  onClick={() => {
                    isFav ? onDeleteFavorite(id) : onSetFavorite(item);
                    setIsFav(!isFav);
                  }}
                >
                  {isFav ? "Delete" : "Add to favorites"}
                </button>
                <h4 className="beer-page__description">{description}</h4>
              </div>
              <img className="beer-page__image" src={image_url} alt="Beer" />
            </div>
            <div className="beer-page__info info">
              <div className="info__properties properties">
                <h2 classNam="properties__title title">Properties</h2>
                <table className="properties__table table">
                  <tbody>
                    <tr className="table__row">
                      <td className="property__name">ABV</td>
                      <td className="property__info property__info--abv">
                        &#x1F6C8;
                        <span class="prompt prompt--abv">
                          ABV, or alcohol by volume, is the standard
                          measurement, used worldwide, to assess the strength of
                          a particular beer.
                        </span>
                      </td>
                      <td className="property__value">
                        <span>{abv}</span>
                      </td>
                    </tr>
                    <tr className="table__row">
                      <td className="property__name">IBU</td>
                      <td className="property__info property__info--ibu">
                        &#x1F6C8;
                        <span class="prompt prompt--ibu">
                          {" "}
                          The IBU scale measures the bitterness levels in beer
                          (based on the amount of hops added) and helps beer
                          drinkers determine which styles of brews are ideal for
                          their taste buds.{" "}
                        </span>
                      </td>
                      <td className="property__value">
                        <span>{ibu}</span>
                      </td>
                    </tr>
                    <tr className="table__row">
                      <td className="property__name">EBC</td>
                      <td className="property__info property__info--ebc">
                        &#x1F6C8;
                        <span class="prompt prompt--ebc">
                          EBC stands for European Brewery Convention and it's
                          used as a measure of colour intensity.{" "}
                        </span>
                      </td>
                      <td className="property__value">
                        <span>{ebc}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="info__food-pairing food-pairing">
                <h2 className="food-pairing__title title">Food pairing</h2>
                <ul className="food-pairing__block block">
                  {food_pairing.map((food) => {
                    return <li className="block__elem">{food}</li>;
                  })}
                </ul>
              </div>
            </div>
            <div className="beer-page__brewing brewing">
              <h2 className="brewing__title">Brewing</h2>
              <p className="brewing__info">{brewers_tips}</p>
            </div>
            <div className="beer-page__process-info process-info">
              <div className="process-info__ingredients ingredients">
                <h2 className="ingredients__title">Ingredients</h2>
                <ul className="ingredients__list list">
                  <li className="list__elem elem">
                    <h3 className="elem__title">Water</h3>
                    <p>
                      {value} {unit}
                    </p>
                  </li>
                  <li className="list__elem elem">
                    <h3 className="elem__title">Malt</h3>
                    {malt.map((item) => {
                      return (
                        <p>
                          {item.name} - {item.amount.value}
                          {item.amount.unit}
                        </p>
                      );
                    })}
                  </li>
                  <li className="list__elem elem">
                    <h3 className="elem__title">Hops</h3>
                    {hops.map((item) => {
                      return (
                        <p>
                          {item.name} {item.amount.value}
                          {item.amount.unit}, add when {item.add}
                        </p>
                      );
                    })}
                  </li>
                  <li className="list__elem elem">
                    <h3 className="elem__title">Yeast</h3>
                    <p>{yeast}</p>
                  </li>
                </ul>
              </div>
              <div className="process-info__method method">
                <h2 className="method__title">Method</h2>
                <ul className="method__list list">
                  <li className="list__elem elem">
                    <h3 className="elem__title">Mash</h3>
                    {mash_temp.map((item) => {
                      return (
                        <p>
                          {item.duration} minutes at {item.temp.value}
                          {item.temp.unit === "celsius" ? "°C" : "°F"}
                        </p>
                      );
                    })}
                  </li>
                  <li className="list__elem elem">
                    <h3 className="elem__title">Fermentation</h3>
                    {Object.values(fermentation).map((item) => {
                      return (
                        <p>
                          Perform at {item.value}
                          {item.unit === "celsius" ? "°C" : "°F"}
                        </p>
                      );
                    })}
                  </li>
                  <li className="list__elem elem">
                    <h3 className="elem__title">Twist</h3>
                    <p>{twist === null ? "Empty" : twist}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default connect(
  (state) => ({ favoriteList: state.favoriteList }),
  (dispatch) => ({
    onSetFavorite: (beer) => {
      dispatch(setFavorite(beer));
    },
    onDeleteFavorite: (id) => {
      dispatch(deleteFavorite(id));
    },
  })
)(AboutBeerPage);
