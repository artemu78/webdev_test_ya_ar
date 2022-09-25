import { useRef, useEffect, ReactElement, useState } from "react";
import * as CSS from 'csstype';
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
  const listMenuRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (event: React.MouseEvent<HTMLElement>) => {
    const targetCoords = (event.target as HTMLElement).getBoundingClientRect();
    const windowSize = getWindowSize();
    
    const { isRight, isTop } = positionCheck(targetCoords, windowSize);
    console.log({ coords: targetCoords, windowSize, isRight, isTop });

    setPositionIsTop(isTop);
    isRight && setPoitionRight(targetCoords.right);
    
    // do not trigger menu withing menu itself
    if (!listMenuRef.current?.contains((event.target as Element).parentElement)) {
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

  let dropdownMenuStyle: CSS.Properties<string | number>= {};
  if (positionIsTop) dropdownMenuStyle.bottom = "100%";
  if (positionRight) dropdownMenuStyle.right = 0;

  return (
    <div onClick={toggleDropdown} ref={wrapperRef} className={styles.container}>
      {children}
      {isMenuOpen && (
        <div
          ref={listMenuRef}
          className={styles.menu}
          style = {dropdownMenuStyle}
        >
          {menuItems.map((item: DropdownItem, index) => {
            return (
              <div className={styles.menuItem} key={index + item.label} title={item.label}>
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdownmenu;
