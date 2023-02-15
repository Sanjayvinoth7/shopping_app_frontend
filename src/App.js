import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import CheckoutSuccess from "./Components/CheckoutSuccess";
import Dashboard from "./Components/Admin/Dashboard";
import Products from "./Components/Admin/Products";
import CreateProduct from "./Components/Admin/CreateProduct";
import ProductsList from "./Components/Admin/List/ProductsList";
import User from "./Components/Admin/User";
import Orders from "./Components/Admin/Orders";
import Product from "./Components/Details/Product";
import Order from "./Components/Details/Order";
import UserProfile from "./Components/Details/UserProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/admin" element={<Dashboard />}>
              <Route path="products" element={<Products />}>
                <Route index element={<ProductsList />} />
                <Route path="create-product" element={<CreateProduct />} />
              </Route>
              <Route path="users" element={<User />} />
              <Route path="orders" element={<Orders />} />
            </Route>

            <Route path="/notfound" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/notfound" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
