import { Button, Container, Navbar, Modal } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { CartContext } from "../CartContext";
import CartProduct from "./Cart/CartProduct";

import "./mainNavbar.css";

const MainNavbar = () => {
  const { cart } = useContext(CartContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // I have to created server for checkout
  const checkout = async () => {
    await fetch("https://localhost:5000/checkout", {
      //fake url
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response.url) {
          window.location.assign(response.url);
        }
      })
      .catch(err => console.log(err));
  };

  const productsCount = cart?.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Let's Shopping</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart({productsCount} Items)</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* // two conditions in modal body, first is check productsCount > 0
          // second is check !cart.items.length */}
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart?.items.map((currentProduct, idx) => (
                <CartProduct
                  key={idx}
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                />
              ))}
              <h1> Total: {cart.getTotalPrice().toFixed(2)}</h1>
              <Button variant="success" onClick={checkout}>
                Purchase items!
              </Button>
            </>
          ) : (
            !cart?.items.length && <p>Your cart is empty!</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MainNavbar;
