import { useRef, useEffect, ReactElement, useState } from "react";
import styles from "./styles.module.css";
import { getWindowSize, WindowSize } from "utils/windowclient";
import cn from "classnames";

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
    isRight: coords.left < windowSize.width - coords.right,
    isTop: coords.top > windowSize.height - coords.bottom,
  };
};

const Dropdownmenu = ({ menuItems, children }: Props) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [positionIsTop, setPositionIsTop] = useState<boolean>(false);
  const [positionIsRight, setPoitionIsRight] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const listMenuRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (event: React.MouseEvent<HTMLElement>) => {
    const coords = (event.target as HTMLElement).getBoundingClientRect();
    const windowSize = getWindowSize();
    const { isRight, isTop } = positionCheck(coords, windowSize);
    console.log({ coords, windowSize });

    setPositionIsTop(isTop);
    setPoitionIsRight(isRight);
    if (!listMenuRef.current?.contains((event.target as Element).parentElement))
      setMenuOpen((state) => !state);
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

  return (
    <div onClick={toggleDropdown} ref={wrapperRef} className={styles.container}>
      {children}
      {isMenuOpen && (
        <div
          ref={listMenuRef}
          className={cn(styles.menu, {
            [styles.positionRight]: positionIsRight,
            [styles.positionTop]: positionIsTop,
          })}
        >
          {menuItems.map((item: DropdownItem, index) => {
            return (
              <div className={styles.menuItem} key={index + item.label}>
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
