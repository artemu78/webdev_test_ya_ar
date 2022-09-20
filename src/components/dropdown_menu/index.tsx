import { useRef, useLayoutEffect } from "react";
import styles from './styles.module.css'

type Props = {
  open: boolean;
  setMenuOpen: (T: boolean) => void;
  menuItems: DropdownItem[];
};

const Dropdownmenu = ({ open, setMenuOpen, menuItems }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  console.log(open, "open");
  useLayoutEffect(() => {
    function handleClickOutside(event: any): void {
      event.stopPropagation();
      event.preventDefault();
      console.log(event.target, 'event.target handleClickOutside');
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setMenuOpen(false);
        // debugger;
      }
    }

    // Bind the event listener
    document.body.addEventListener("mousedown", handleClickOutside);
    

    return () => {
      // Unbind the event listener on clean up
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  if (!open) return null;
  
  return (
    <div ref={wrapperRef} className={styles.menu}>
      {menuItems.map((item: DropdownItem, index) => {return (<div className={styles.menuItem} key={index+item.label}>{item.label}</div>)})}
    </div>
  );
};

export default Dropdownmenu;
export type DropdownItem = {
  label: string;
  icon?: string;
  value?: string;
}
