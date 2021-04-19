import "./App.css";
import Header from "./header/Header";
import Catalog from "./main/Catalog";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Catalog />
      </main>
    </div>
  );
}

export default App;
