import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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
import Favourites from "./pages/Favourites";
import { FavouritesProvider } from "./pages/FavouritesContext";
import RecyclingLocator from "./pages/RecyclingLocator";



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

        {/* Main app pages - WITH navbar & footer */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />

              <Routes>
                {/*Home page*/}
                <Route path="/" element={<Home />} />

                {/*Products page*/}
                <Route path="/products" element={<AllProducts />} />
                
                {/*Recycling Locator*/}
                <Route path="/recycling-locator" element={<RecyclingLocator />} />

                {/*Favourites page*/}
                <Route path="/favourites" element={<Favourites />} />

                {/*Profile page - protected route*/}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>

              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
    </FavouritesProvider>
  );
}
export default App;


