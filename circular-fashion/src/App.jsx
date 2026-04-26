import './App.css'
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import Favourites from "./pages/Favourites";
import { FavouritesProvider } from "./pages/FavouritesContext";
import RecyclingLocator from "./pages/RecyclingLocator";
import Challenges from "./pages/Challenges";
import Achievements from "./pages/Achievements";
import AboutUs from "./pages/AboutUs";
import products from "./data/products.json";
import { useEffect, useState } from "react";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);



function App() {


  return (
    <FavouritesProvider>
      <Router>
        <Routes>

          {/* Auth pages - No Navbar or footer */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Password reset */}
          <Route path="/reset-password" element={<ResetPasswordRequest />} />
          <Route path="/reset-password-confirm" element={<ResetPasswordConfirm />} />

          {/* Routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts products={products} /> } />
            <Route path="/products/:id" element={<ProductDetails products={products} />} />
            <Route path="/recycling-locator" element={<RecyclingLocator />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/about" element={<AboutUs />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/challenges"
              element={
                <ProtectedRoute>
                  <Challenges />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/achievements" 
              element={
                <ProtectedRoute>
                  <Achievements />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </Router>
    </FavouritesProvider>
  );
}

export default App;