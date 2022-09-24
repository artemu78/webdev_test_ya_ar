import { MouseEvent } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dropdownmenu, { DropdownItem } from "./components/dropdown_menu";

function App() {
  const menuItems = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
  ] as DropdownItem[];
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Dropdownmenu menuItems={menuItems}>
          <button>
            Click <code>ME</code> to see dropdown.
          </button>
        </Dropdownmenu>
      </header>
      <footer className="App-footer">
        <span
          onMouseEnter={(event: MouseEvent) => {
            (event.target as HTMLElement).title = event.clientX + '/' + event.clientY;
          }}
        >
          Все права уважены
        </span>
      </footer>
    </div>
  );
}

export default App;
