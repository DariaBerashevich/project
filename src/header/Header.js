import React from "react";
import menu from "../../src/assets/menu.png";

function Header() {
  let menuHandler = () => {
    let burgerMenu = document.getElementsByClassName("list")[0];
    if (burgerMenu.classList.contains("hide")) {
      burgerMenu.classList.remove("hide");
      burgerMenu.classList.add("show");
    }
  };

  document.onclick = function (e) {
    let burgerMenu = document.getElementsByClassName("list")[0];
    if (
      e.target.className !== "burger-menu__icon" &&
      e.target.classList.contains("burger-menu__list") === false &&
      e.target.classList.contains("list__title") === false
    ) {
      console.log(e.target.className);
      if (burgerMenu.classList.contains("show")) {
        burgerMenu.classList.remove("show");
        burgerMenu.classList.add("hide");
      }
    }
  };

  return (
    <header className="header">
      <div className="header__burger-menu burger-menu">
        <img
          className="burger-menu__icon"
          src={menu}
          alt="Burger menu icon"
          onClick={menuHandler}
        />

        <ul className="burger-menu__list list hide">
          <h2 className="list__title">Beer catalog</h2>
          <li id="list" className="list__item list__item-home">
            Home
          </li>
          <li className="list__item list__item-favorites">Favorites</li>
        </ul>
      </div>
      <h1 className="header__title">Beer catalog</h1>
    </header>
  );
}

export default Header;
