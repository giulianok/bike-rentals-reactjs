import React from 'react';

import { useCartState } from 'utils/cart.store';

import styles from './index.module.scss';

const CartAlert = () => {
  const [state] = useCartState();
  const [show, setShow] = React.useState(false);
  const [firstTime, setFirstTime] = React.useState(true);

  let timer;

  React.useEffect(() => {
    if (firstTime) {
      setFirstTime(false);
      return;
    }

    if (timer) {
      clearTimeout(timer);
    }

    setShow(true);

    timer = setTimeout(() => {
      setShow(false);
    }, 1000);
  }, [state.total]);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.root}>Product added into the Shopping Cart!</div>
  );
};

export default CartAlert;
