import { useRef, useEffect, ReactElement, useState } from "react";
import styles from "./styles.module.css";

type Props = {
  menuItems: DropdownItem[];
  children: ReactElement;
};

const Dropdownmenu = ({ menuItems, children }: Props) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): any {
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
    <div
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        if (!listContainerRef.current?.contains((event.target as Element).parentElement)) {
          setMenuOpen((state) => !state);
        }
      }}
      ref={wrapperRef}
    >
      {children}
      {isMenuOpen && (
        <div ref={listContainerRef} className={styles.menu}>
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
export type DropdownItem = {
  label: string;
  icon?: string;
  value?: string;
};
