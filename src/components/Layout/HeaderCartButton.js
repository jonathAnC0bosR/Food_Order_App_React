import { useContext, useEffect, useState } from "react";

import styles from "./HeaderCartButton.module.css";
import CartContext from "../../context/cartContext";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const [btnIsHighlated, setBtnIsHighlahted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnIsHighlated ? styles.bump : ""}`;

  const { items } = cartCtx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlahted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlahted(false);
    }, 300);

    return () => {
        clearTimeout(timer)
    }

  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
