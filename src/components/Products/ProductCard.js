import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { CartContext } from "../../CartContext";
import { useContext } from "react";

const ProductCard = props => {
  // props.product is  the product we are sellimg
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);
  console.log(cart.items);

  return (
    <Card>
      <Card.Img src={product.image} alt={product.title} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        <Card.Text>{product.category}</Card.Text>
        {productQuantity > 0 ? (
          <>
            <Form as={Row}>
              <Form.Lebal colum="true" sm="6">
                In Cart: {productQuantity}
              </Form.Lebal>
              <Col sm="6">
                <Button sm="6" className="mx-2">
                  +
                </Button>
                <Button sm="6" className="mx-2">
                  -
                </Button>
              </Col>
            </Form>
          </>
        ) : (
          <Button
            variant="primary"
            onClick={() => cart.addOneToCart(product.id)}
          >
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
