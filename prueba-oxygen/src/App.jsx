import "./App.css";

import Footer from "./components/Footer";
import MainComponent from "./components/MainComponent";
import NavbarComp from "./components/NavbarComp";

function App() {
  return (
    <div className="main-content">
      <NavbarComp />

      <MainComponent />

      <Footer />
    </div>
  );
}

export default App;
