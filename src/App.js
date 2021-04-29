import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./header/Header";
import Catalog from "./main/Catalog";
import AboutBeerPage from "./main/AboutBeerPage";
import FavoritesList from "./main/FavoritesList";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main">
          <Switch>
            <Route path="/catalog">
              <Catalog />
            </Route>
            <Route path="/favorites">
              <FavoritesList />
            </Route>
            <Route exact path={`/:beerId`}>
              <AboutBeerPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
