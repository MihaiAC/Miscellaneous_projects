/* eslint-disable react/prop-types */
import { createContext, useReducer, useCallback } from "react";

function cartReducer(state, action) {
  const updatedProducts = new Map(state.products);

  if (action.name === "add_product") {
    if (state.products.has(action.payload.id)) {
      action.name = "increment";
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
    } else {
      product.quantity -= 1;
    }
    return {
      products: updatedProducts,
      totalPrice: state.totalPrice - product.price,
    };
  }

  if (action.name === "clear_cart") {
    return {
      products: new Map(),
      totalPrice: 0,
    };
  }

  // Failsafe.
  return state;
}

const initialContext = {
  products: new Map(),
  totalPrice: 0,
  addProduct: () => {},
  increment: () => {},
  decrement: () => {},
  clearCart: () => {},
};

export const CartContext = createContext(initialContext);

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    products: new Map(),
    totalPrice: 0,
  });

  const addProduct = useCallback(function addProduct({ id, name, price }) {
    const newAction = {
      name: "add_product",
      payload: { name: name, id: id, price: Number(price), quantity: 1 },
    };
    console.log(newAction.payload);
    dispatch(newAction);
  }, []);

  const incrementQuantity = useCallback(function incrementQuantity(id) {
    dispatch({ name: "increment", payload: { id: id } });
  }, []);

  // If quantity reaches 0, remove the item.
  const decrementQuantity = useCallback(function decrementQuantity(id) {
    dispatch({ name: "decrement", payload: { id: id } });
  }, []);

  const clearCart = useCallback(() => dispatch({ name: "clear_cart" }), []);

  return (
    <CartContext.Provider
      value={{
        products: state.products,
        totalPrice: state.totalPrice,
        addProduct: addProduct,
        increment: incrementQuantity,
        decrement: decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
