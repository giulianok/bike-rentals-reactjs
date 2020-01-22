import db from 'utils/db';

const canCheckout = products => {
  for (let productId of Object.keys(products)) {
    if (db.products.find(p => p.id == productId).product_type === 'bike') {
      return true;
    }
  }

  return false;
};

export default canCheckout;
