import { createContext, useState } from "react";
import { SingleProduct } from "./components/Products/SingleProduct";

//Created 'CartProvider' component in react using a contecxt API to manage
// the state of a shopping cart
export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalPrice: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]); // defind item

  //in cart will defind id, quantity [{id: 1, quantity: 1}]
  function getProductQuantity(id) {
    const quantity = cartProducts.find(product => product.id === id)?.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  //----------------------------------------------------------------//

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);
    if (quantity === 0) {
      // product is not in cart
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      // product is in cart
      // [{ id: 1, quantity: 3}, {id: 2, quantity: 1 + 1}] add to product id of 2
      setCartProducts(
        cartProducts.map(
          product =>
            product.id === id //if condition
              ? { ...product, quantity: quantity + 1 } // if statement is true
              : product // if statement is false
        )
      );
    }
  }
  //----------------------------------------------------------------//

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map(
          product =>
            product.id === id //if condition
              ? { ...product, quantity: quantity - 1 } // if statement is true
              : product // if statement is false
        )
      );
    }
  }

  //----------------------------------------------------------------//

  function deleteFromCart(id) {
    // [] if an object meets a condition, add the object to array.
    // [product1, product2, product3]
    // [product1, product2, product3]
    setCartProducts(
      cartProducts.filter(currentProduct => {
        return currentProduct.id !== id;
      })
    );
  }

  //----------------------------------------------------------------//

  function getTotalPrice() {
    let totalCost = 0;
    cartProducts.forEach(cartItem => {
      const productData = SingleProduct(cartItem.id);
      totalCost += productData.price * cartItem.quantity;
    });
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalPrice,
  };

  //----------------------------------------------------------------//

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;

// Context (cart, addToCart, removeFromCart,)
//Provider => provide react app access to all the things in the context
