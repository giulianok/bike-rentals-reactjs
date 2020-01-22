import React from 'react';
import { Router } from '@reach/router';

import { CartStoreProvider } from 'utils/cart.store';
import Header from 'components/Header';
import Home from 'pages/Home';
import CartSummary from 'pages/CartSummary';
import Checkout from 'pages/Checkout';
import CartAlert from 'components/CartAlert';

import styles from './index.module.scss';

const App = () => (
  <>
    <CartStoreProvider>
      <Header />
      <div className={styles.content}>
        <Router>
          <Home path="/" />
          <CartSummary path="/cart" />
          <Checkout path="/checkout" />
        </Router>
      </div>
      <CartAlert />
    </CartStoreProvider>
  </>
);

export default App;
