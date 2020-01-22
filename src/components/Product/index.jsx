import React from 'react';

import Button from 'components/Button';
import Counter from 'components/Counter';
import { useCartState } from 'utils/cart.store';

import styles from './index.module.scss';

const Product = ({ product, canAdd }) => {
  const { name, image, price } = product;
  const [, dispatch] = useCartState();
  const [counter, setCounter] = React.useState(1);

  const onChange = value => {
    setCounter(value);
  };

  const onAdd = () => {
    setCounter(1);
    dispatch({
      type: 'ADD_PRODUCT',
      product,
      amount: counter
    });
  };

  return (
    <div className={styles.root}>
      <img src={image} width="100%" />
      <div className={styles.content}>
        <strong>{name}</strong>
        <div className={styles.price}>${price}</div>
        {canAdd ? (
          <div className={styles.footer}>
            <Counter onChange={onChange} value={counter} />
            <Button onClick={onAdd} disabled={counter < 1}>
              + Add to cart
            </Button>
          </div>
        ) : (
          <div className={styles.errorRequires}>
            This product requires a Bike in your cart.
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
