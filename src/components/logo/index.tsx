import { useLayoutEffect, useState, useEffect, useRef } from "react";
import logo, { ReactComponent as LogoSvg } from "../../logo.svg";

const Logo = () => {
    const [color, setColor] = useState<string>("red");
    const logoRef = useRef<HTMLDivElement>(null);
    
    const sleep = (duration: number) => {
      let start = new Date().getTime();
      let end = start;
      while (end < start + duration) {
        end = new Date().getTime();
      }
    };
  
    useLayoutEffect(() => {
      console.log(`useLayoutEffect BEFORE sleep(3sec) getElementById color=${document?.getElementById("logowrapper")?.style.fill}`);
      console.log(`useLayoutEffect BEFORE sleep(3sec) logoRef color=${logoRef.current?.style.fill}`);
      sleep(3000);
      console.log(`useLayoutEffect AFTER sleep(3sec) getElementById color=${document?.getElementById("logowrapper")?.style.fill}`);
      console.log(`useLayoutEffect AFTER sleep(3sec) logoRef color=${logoRef.current?.style.fill}`);
    }, [color]);
  
    useEffect(() => {
      console.log(`useEffect color=${document?.getElementById("logowrapper")?.style.fill}`);
    }, [color]);
  
    const changeColor = () => {
      setColor((color): string => (color === "red" ? "green" : "red"));
    };
  
    return (
      <div
        onClick={() => changeColor()}
        className="App-logo"
        style={{ fill: color }}
        id="logowrapper"
        ref={logoRef}
      >
        <LogoSvg />
      </div>
    );
    // return <img src={logo} className="App-logo" alt="logo" onClick={changeColor} style={{fill: 'red'}}/>
  };

  export default Logo;