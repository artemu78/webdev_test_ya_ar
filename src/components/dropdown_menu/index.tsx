import { useRef, useEffect, ReactElement, useState } from "react";
import * as CSS from "csstype";
import styles from "./styles.module.css";
import { getWindowSize, WindowSize } from "utils/windowclient";
// import cn from "classnames";

type BlockPosition = {
  isTop: boolean;
  isRight: boolean;
};

export type DropdownItem = {
  label: string;
  icon?: string;
  value?: string;
  callback?: (item: DropdownItem) => void;
};

type Props = {
  menuItems: DropdownItem[];
  children: ReactElement;
};

const positionCheck = (
  coords: DOMRect,
  windowSize: WindowSize
): BlockPosition => {
  return {
    isRight: coords.left > windowSize.width - coords.right,
    isTop: coords.top > windowSize.height - coords.bottom,
  };
};

const Dropdownmenu = ({ menuItems, children }: Props) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [positionIsTop, setPositionIsTop] = useState<boolean>(false);
  const [positionRight, setPoitionRight] = useState<number>(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const listMenuRef = useRef<HTMLUListElement>(null);


  const scrollListener = (elem: HTMLElement): (event: Event) => any => (event: Event) => {
    const box = elem.getBoundingClientRect();
    const isInViewport = box.top < window.innerHeight && box.bottom >= 0;
    
    //hide menu when button is out of viewport
    setMenuOpen(isInViewport); 
  }

  useEffect(() => {
    if (isMenuOpen)
    wrapperRef.current && window.addEventListener("scroll", scrollListener(wrapperRef.current));
    else
    wrapperRef.current && window.removeEventListener("scroll", scrollListener(wrapperRef.current));
  }, [isMenuOpen]);

  const toggleDropdown = (event: React.MouseEvent<HTMLElement>) => {
    const targetCoords = (event.target as HTMLElement).getBoundingClientRect();
    const windowSize = getWindowSize();

    const { isRight, isTop } = positionCheck(targetCoords, windowSize);

    setPositionIsTop(isTop);
    isRight && setPoitionRight(targetCoords.right);

    // do not trigger menu withing menu itself
    if (
      !listMenuRef.current?.contains((event.target as Element).parentElement)
    ) {
      setMenuOpen((state) => !state);
      if (listMenuRef.current && isTop) setPositionIsTop(true);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains((event.target as Element).parentElement)
      ) {
        setMenuOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  let dropdownMenuStyle: CSS.Properties<string | number> = {};
  if (positionIsTop) dropdownMenuStyle.bottom = "100%";
  if (positionRight) dropdownMenuStyle.right = 0;

  const handleItemClick = (item: DropdownItem) => {
    return (event: React.MouseEvent<HTMLElement>) => {
      if (item.callback) {
        setMenuOpen(false);
        item.callback(item);
      }
    };
  };

  return (
    <div onClick={toggleDropdown} ref={wrapperRef} className={styles.container}>
      {children}
      {isMenuOpen && (
        <ul ref={listMenuRef} className={styles.menu} style={dropdownMenuStyle}>
          {menuItems.map((item: DropdownItem, index) => {
            return (
              <li
                className={styles.menuItem}
                key={index + item.label}
                title={item.label}
                onClick={handleItemClick(item)}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdownmenu;
