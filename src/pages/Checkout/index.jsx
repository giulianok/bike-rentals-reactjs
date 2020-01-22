import React from 'react';
import classnames from 'classnames';
import { Redirect } from '@reach/router';

import db from 'utils/db';
import Container from 'components/Container';
import Title from 'components/Title';
import Button from 'components/Button';
import canCheckout from 'utils/canCheckout';
import { useCartState } from 'utils/cart.store';

import styles from './index.module.scss';

const Form = () => (
  <form>
    <input className={styles.inputField} type="email" placeholder="Email" />
    <input
      className={styles.inputField}
      type="text"
      placeholder="Phone Number"
    />
    <div className={styles.fieldGroup}>
      <input
        className={styles.inputField}
        type="text"
        placeholder="Cardholder First Name"
      />
      <input
        className={styles.inputField}
        type="text"
        placeholder="Cardholder Last Name"
      />
    </div>
    <input
      className={styles.inputField}
      type="text"
      placeholder="Card Number"
    />
    <div className={styles.fieldGroup}>
      <input className={styles.inputField} type="text" placeholder="MM/YY" />
      <input className={styles.inputField} type="text" placeholder="CCV" />
    </div>

    <Button className={styles.placeOrder}>Place order</Button>
  </form>
);

const Summary = () => {
  const [{ products }] = useCartState();

  const getTotal = () =>
    Object.keys(products).reduce((total, productId) => {
      const product = db.products.find(p => p.id == productId);

      return total + product.price * products[productId];
    }, 0);

  return (
    <div>
      <Title type="h2">Order Summary</Title>

      <ul className={styles.list}>
        {Object.keys(products).map(productId => {
          const amount = products[productId];
          const product = db.products.find(p => p.id == productId);

          return (
            <li key={productId} className={styles.item}>
              <span>{product.name}</span>
              <span>
                {amount} x ${product.price}
              </span>
            </li>
          );
        })}
      </ul>

      <hr />

      <ul className={styles.list}>
        <li className={styles.item}>
          <span>Tax</span>
          <span>$0</span>
        </li>
      </ul>

      <hr />

      <ul className={styles.list}>
        <li className={classnames(styles.item, styles.itemTotal)}>
          <span>Total</span>
          <span>${getTotal()}</span>
        </li>
      </ul>
    </div>
  );
};

const Checkout = () => {
  const [state] = useCartState();

  if (state.total < 1 || !canCheckout(state.products)) {
    return <Redirect from="/checkout" to="/" />;
  }

  return (
    <Container>
      <div className={styles.content}>
        <div className={styles.contentSummary}>
          <Summary />
        </div>
        <div className={styles.contentCheckout}>
          <Form />
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
