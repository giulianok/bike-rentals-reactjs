import React from 'react';
import { Link } from '@reach/router';

import db from 'utils/db';
import Container from 'components/Container';
import Title from 'components/Title';
import Button from 'components/Button';
import Counter from 'components/Counter';
import canCheckout from 'utils/canCheckout';
import { useCartState } from 'utils/cart.store';

import styles from './index.module.scss';

const Summary = () => {
  const [{ products }, dispatch] = useCartState();

  const getTotal = () =>
    Object.keys(products).reduce((total, productId) => {
      const product = db.products.find(p => p.id == productId);

      return total + product.price * products[productId];
    }, 0);

  return (
    <div>
      <Title type="h1">Shopping Summary</Title>
      <table className={styles.list}>
        <tbody>
          {Object.keys(products).map(productId => {
            const amount = products[productId];
            const product = db.products.find(p => p.id == productId);

            return (
              <tr key={productId} className={styles.item}>
                <td className={styles.itemImage}>
                  <img src={product.image} width={200} alt={product.name} />
                </td>
                <td className={styles.itemName}>
                  <strong>{product.name}</strong>
                  <div>
                    <a
                      className={styles.remove}
                      href="#"
                      onClick={event => {
                        event.preventDefault();

                        dispatch({
                          type: 'REMOVE_PRODUCT',
                          product
                        });
                      }}
                    >
                      Remove
                    </a>
                  </div>
                </td>
                <td className={styles.itemCounter}>
                  <Counter
                    value={amount}
                    onChange={value => {
                      dispatch({
                        type: 'SET_PRODUCT',
                        product,
                        amount: value
                      });
                    }}
                    min={1}
                  />
                </td>
                <td className={styles.itemTotal}>${amount * product.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.grandTotal}>
        Total: <strong>${getTotal()}</strong>
      </div>
      <div className={styles.checkout}>
        <Link to="/checkout">
          <Button disabled={!canCheckout(products)}>Checkout</Button>
        </Link>
        {!canCheckout(products) && (
          <div className={styles.error}>
            Can proceed with Checkout because you need to add at least one Bike
          </div>
        )}
      </div>
    </div>
  );
};

const NoItems = () => (
  <div className={styles.noItems}>
    <Title type="h1">There are no items in the Shopping Cart yet!</Title>
    <Link to="/">
      <Button className={styles.addItems}>Let's add some products!</Button>
    </Link>
  </div>
);

const CartSummary = () => {
  const [state] = useCartState();

  return <Container>{state.total > 0 ? <Summary /> : <NoItems />}</Container>;
};

export default CartSummary;
