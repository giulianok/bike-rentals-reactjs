import React from 'react';
import { Link } from '@reach/router';

import shoppingCart from 'assets/shoppingCart.svg';
import { useCartState } from 'utils/cart.store';

import styles from './index.module.scss';

const Cart = () => {
  const [state] = useCartState();

  return (
    <Link className={styles.icon} to="/cart">
      <img src={shoppingCart} width={40} />
      {state.total > 0 && <div className={styles.counter}>{state.total}</div>}
    </Link>
  );
};

export default Cart;
