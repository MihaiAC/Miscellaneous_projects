/* eslint-disable react/prop-types */
import { createContext, useReducer, useCallback } from "react";

function cartReducer(state, action) {
  const updatedProducts = new Map(state.products);

  if (action.name === "add_item") {
    if (state.products.has(action.payload.id)) {
      action.name === "increment";
    } else {
      const newProduct = action.payload;
      updatedProducts.set(newProduct.id, {
        name: newProduct.name,
        price: newProduct.price,
        quantity: 1,
      });
      const newTotalPrice = state.totalPrice + newProduct.price;
      return { products: updatedProducts, totalPrice: newTotalPrice };
    }
  }

  if (action.name === "increment") {
    const product = updatedProducts.get(action.payload.id);
    product.quantity += 1;
    return {
      products: updatedProducts,
      totalPrice: state.totalPrice + product.price,
    };
  }

  if (action.name === "decrement") {
    const productId = action.payload.id;
    const product = updatedProducts.get(productId);
    if (product.quantity === 1) {
      updatedProducts.delete(productId);
    }
    return {
      products: updatedProducts,
      totalPrice: state.totalPrice - product.price,
    };
  }

  // Failsafe.
  return state;
}

const initialState = {
  products: new Map(),
  totalPrice: 0,
};

export const CartContext = createContext(initialState);

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback(function addItem({ id, name, price }) {
    const newAction = {
      name: "add_item",
      payload: { name: name, id: id, price: price, quantity: 1 },
    };
    dispatch(newAction);
  }, []);

  const incrementQuantity = useCallback(function incrementQuantity(id) {
    dispatch({ name: "increment", payload: { id: id } });
  }, []);

  // If quantity reaches 0, remove the item.
  const decrementQuantity = useCallback(function decrementQuantity(id) {
    dispatch({ name: "decrement", payload: { id: id } });
  }, []);

  return (
    <CartContext.Provider
      value={(state, addItem, incrementQuantity, decrementQuantity)}
    >
      {children}
    </CartContext.Provider>
  );
}
