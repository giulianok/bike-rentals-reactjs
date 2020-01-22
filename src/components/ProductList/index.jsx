import React from 'react';
import groupBy from 'lodash/fp/groupBy';
import capitalize from 'lodash/fp/capitalize';

import Title from 'components/Title';
import Product from 'components/Product';
import { useCartState } from 'utils/cart.store';

import styles from './index.module.scss';

const ProductList = ({ products }) => {
  const [state] = useCartState();
  const byType = groupBy('product_type', products);

  const canAdd = requires => {
    for (let requiresType of requires) {
      const ids = byType[requiresType].map(p => p.id);

      for (let id of ids) {
        if (state.products[id] > 0) {
          return true;
        }
      }
    }

    return false;
  };

  return (
    <div>
      {Object.keys(byType).map(type => (
        <div key={type} className={styles.product}>
          <Title type="h1" className={styles.title}>
            {capitalize(type)}
          </Title>
          <ul className={styles.list}>
            {byType[type].map(product => (
              <li key={`${type}-${product.id}`} className={styles.item}>
                <Product
                  product={product}
                  canAdd={product.requires ? canAdd(product.requires) : true}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
