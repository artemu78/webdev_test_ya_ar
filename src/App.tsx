import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dropdownmenu, { DropdownItem } from "./components/dropdown_menu";

function onclick(event: any) {
  console.log(event.currentTarget.id);
  event.stopPropagation();
}

function App() {
  const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
  const menuItems= [
    {label: "Item 1", value: "1"},
    {label: "Item 2", value: "2"},
    {label: "Item 3", value: "3"}
  ] as DropdownItem[];
  return (
    <div className="App">
      <div id="div1" style={{padding: '10px', border: '3px solid red', width: '200px', height: '100px'}} onClick={onclick}>
        <div id="div2" style={{padding: '10px', border: '3px solid green', width: '50%', height: '50px'}} onClick={onclick}>
          <div id="div3" style={{padding: '10px', border: '3px solid blue', width: '100%', height: '50px'}} onClick={onclick}>

          </div>
        </div>
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          console.log("p onclick");
          setMenuOpen((state) => !state)
        }}>
          Edit <code>src/App.tsx</code> and save to reload.
          <Dropdownmenu open={menuOpen} setMenuOpen={setMenuOpen} menuItems={menuItems} />
        </p>
      </header>
    </div>
  );
}

export default App;
