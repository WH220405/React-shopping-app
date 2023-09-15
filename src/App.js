import { Route, Routes } from "react-router-dom";
// Example of a correct import
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import "./App.css";
import MainNavbar from "./components/MainNavbar";
import Products from "./components/Products/Products";
import ProductDetails from "./components/Products/SingleProduct";
import CartProduct from "./components/Cart/CartProduct";
import Login from "./auth/Login";
import Register from "./auth/Register";
//import History from "./components/Cart/History";
import AddProduct from "./components/Products/AddProduct";
import UpdateProduct from "./components/Products/UpdateProduct";
import SingleProduct from "./components/Products/SingleProduct";
import GetInCategory from "./components/Products/GetInCategory";
import Cancel from "./components/Cart/Cancel";
import Success from "./components/Cart/Success";
import CartProvider from "./CartContext";

function App() {
  return (
    <CartProvider>
      <Container>
        <MainNavbar />
        <Routes>
          <Route path="/" element={<Products />}></Route>
          <Route path="/products/:category" element={<GetInCategory />}></Route>
          <Route path="/products/:id" element={<SingleProduct />}></Route>
          <Route path="/cartproduct" element={<CartProduct />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/cancel" element={<Cancel />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route path="/addproduct" element={<AddProduct />}></Route>
          <Route path="/update/:id" element={<UpdateProduct />}></Route>
          <Route
            path="/productdetail"
            element={<ProductDetails></ProductDetails>}
          ></Route>
        </Routes>
      </Container>
    </CartProvider>
  );
}

export default App;
