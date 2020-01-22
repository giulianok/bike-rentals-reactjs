import React from 'react';
import omit from 'lodash/fp/omit';

const Context = React.createContext();

const getDefaultState = () => {
  const state = window.localStorage.getItem('products_state');

  if (!state) {
    return {
      products: {},
      total: 0
    };
  }

  return JSON.parse(state);
};

export const CartStoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT': {
        const { product, amount } = action;
        const { id } = product;

        const newState = {
          products: {
            ...state.products,
            [id]: (state.products[id] || 0) + amount
          },
          total: state.total + amount
        };

        window.localStorage.setItem('products_state', JSON.stringify(newState));

        return newState;
      }
      case 'SET_PRODUCT': {
        const { product, amount } = action;
        const { id } = product;

        const newState = {
          products: {
            ...state.products,
            [id]: amount
          },
          total: state.total - (state.products[id] || 0) + amount
        };

        window.localStorage.setItem('products_state', JSON.stringify(newState));

        return newState;
      }
      case 'REMOVE_PRODUCT': {
        const { product } = action;
        const { id } = product;

        const newState = {
          products: omit(id, {
            ...state.products
          }),
          total: state.total - (state.products[id] || 0)
        };

        window.localStorage.setItem('products_state', JSON.stringify(newState));

        return newState;
      }
      default: {
        return state;
      }
    }
  }, getDefaultState());

  return (
    <Context.Provider
      value={[state, React.useCallback(dispatch, [])]}
      children={children}
    />
  );
};

export function useCartState() {
  return React.useContext(Context);
}
