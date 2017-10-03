import { Action } from '@ngrx/store';
import { ActionTypes } from './cart.actions';
import { Product } from '../models/Product';
import { ActionReducer } from '@ngrx/store';

export const initialState = {
  products: []
};

export interface State {
  products: Array<Product>;
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART: {
      const addProduct = Object.assign({}, action.payload.product);
      addProduct.quantity = action.payload.quantity;
      addProduct.price = (parseInt(addProduct.price) * parseInt(addProduct.quantity)).toFixed(2);
      return {
        ...state,
        products: [
          ...state.products,
          addProduct
        ]
      };
    };
    case ActionTypes.REMOVE_FROM_CART: {
      //  return a new array excluding the product that needs to be removed
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      return {
        ...state,
        products: [
          ...state.products.slice(0, index),
          ...state.products.slice(index + 1)
        ]
      }
    }

    default:
      return state;
  }
}