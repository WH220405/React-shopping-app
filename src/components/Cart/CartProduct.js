import { useContext } from "react";
import { CartContext } from "../../CartContext";
import { getSingleProduct } from "../../api/api";
import { Button } from "react-bootstrap";

const CartProduct = props => {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const productData = getSingleProduct(id);

  if (!productData) {
    // Handle the case where productData is undefined (e.g., product not found)
    return <p>Product not found or an error occurred.</p>;
  }

  const handleRemoveClick = () => {
    // Pass the id of the product to remove
    cart.deleteFromCart(id);
  };

  return (
    <div className="cart-product">
      <img src={productData.image} alt={productData.title} />
      <div className="cart-product-info">
        <h3>{productData.title}</h3>
        <p>{quantity} Total</p>
        <p>${(quantity * productData.price).toFixed(2)}</p>
        <Button size="sm" onClick={handleRemoveClick}>
          Remove
        </Button>
        <hr />
      </div>
    </div>
  );
};

export default CartProduct;
