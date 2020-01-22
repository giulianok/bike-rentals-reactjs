import React from 'react';

import db from 'utils/db';
import Container from 'components/Container';
import ProductList from 'components/ProductList';

const Home = () => {
  return (
    <div>
      <Container>
        <ProductList products={db.products} />
      </Container>
    </div>
  );
};

export default Home;
