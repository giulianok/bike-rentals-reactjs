import React from 'react';

import db from 'utils/db';
import Container from 'components/Container';
import ProductList from 'components/ProductList';
import CartAlert from 'components/CartAlert';

const Home = () => {
  return (
    <div>
      <Container>
        <ProductList products={db.products} />
      </Container>
      <CartAlert />
    </div>
  );
};

export default Home;
