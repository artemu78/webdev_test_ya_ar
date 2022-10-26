import "./App.css";
import Dropdownmenu, { DropdownItem } from "./components/dropdown_menu";
import Logo from "./components/logo";
import { menuItems, menuItems2 } from "const";

function App() {
  const menu1 = menuItems.map((item) => {
    return {
      ...item,
      callback: (item: DropdownItem) => {
        alert(item.label);
      },
    };
  });

  return (
    <div className="App">
      <main className="App-header">
        <div className="Top-line">
          <Dropdownmenu menuItems={menu1}>
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
          <Logo />
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
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
    </div>
  );
}

export default App;
