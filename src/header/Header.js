import React from "react";
import { useState } from "react/cjs/react.development";
import menu from "../../src/assets/menu.png";
import "./Header.css";

document.onclick = function (e) {
  let burgerMenu = document.getElementsByClassName("list")[0];
  if (
    e.target.className !== "burger-menu__icon" &&
    e.target.classList.contains("burger-menu__list") === false &&
    e.target.classList.contains("list__title") === false
  ) {
    if (burgerMenu.classList.contains("open")) {
      burgerMenu.classList.remove("open");
      burgerMenu.classList.add("close");
    }
  }
};

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__burger-menu burger-menu">
        <img
          className="burger-menu__icon"
          src={menu}
          alt="Burger menu icon"
          onClick={() => {
            setOpen(!open);
          }}
        />

        <ul className={`burger-menu__list list ${open ? 'open' : 'close'}`}>
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
