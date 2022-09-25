import { MouseEvent } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dropdownmenu from "./components/dropdown_menu";
import { menuItems, menuItems2 } from "const";

function App() {
  return (
    <div className="App">
      <main className="App-header">
        <div className="Top-line">
          <Dropdownmenu menuItems={menuItems}>
            <button className="btn">
              Click <code>ME</code> to see dropdown
            </button>
          </Dropdownmenu>
          <Dropdownmenu menuItems={menuItems2}>
            <button className="btn">
              Or click <code>ME</code>
            </button>
          </Dropdownmenu>
        </div>
        <div className="Centered-line">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="Top-line">
          <Dropdownmenu menuItems={menuItems}>
            <button className="btn">
              Or may be even <code>ME</code>
            </button>
          </Dropdownmenu>
          <Dropdownmenu menuItems={menuItems2}>
            <button className="btn">
              Or <code>ME</code>
            </button>
          </Dropdownmenu>
        </div>
      </main>
    </div>
  );
}

export default App;
