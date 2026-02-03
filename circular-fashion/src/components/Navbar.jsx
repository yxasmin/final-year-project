import './Navbar.css'
import { Search, Heart, User, BadgeRussianRubleIcon } from "lucide-react";
import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react"

function Navbar() { 
    const [showUserMenu, setShowUserMenu] = useState(false)
    const userMenuRef = useRef(null)
    const isLoggedIn = !!localStorage.getItem("accessToken");

    
       //Close user dropdown if clicked outside
       useEffect(() => {
           const handleClickOutside = (event) => {
              if (
                userMenuRef.current &&
                 !userMenuRef.current.contains(event.target)
              ) {
                 setShowUserMenu(false)
           
              }
            }

            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
       }, [])

       return (
        <nav className="navbar">
            <Link to="/">
            <img src="/images/logo.png" alt="Rot8te Logo" className="logo" />
            </Link>
            <ul className="nav-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="shop-item">
                    Shop
                    <ul className="dropdown-menu">
                        <li>Shop All</li>
                        <li>Tops</li>
                        <li>Bottoms</li>
                        <li>Dresses</li>
                        <li>Skirts</li>
                        <li>Beauty</li>
                        <li>Accessories</li>
                    </ul>
                </li>
                <li>Recycling Locator</li>
                <li>About Us</li>
            </ul>

            <div className="nav-icons">
                <Search className="nav-icon"/>
                <Heart className="nav-icon"/>

                <div className="usermenu" ref={userMenuRef}>
                     <User
                        className="nav-icon"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    />
                     {showUserMenu && (
                        <ul className="user-dropdown">
                            {!isLoggedIn ? (
                                <>
                            <li>
                                <Link to="/login" onClick={() => setShowUserMenu(false)}>
                                    Login
                                </Link>
                            </li>
                            <li>
                               <Link to="/register" onClick={() => setShowUserMenu(false)}>
                               Register
                               </Link>
                            </li>
                    
                            </>
                            ) : (
                              <li>
                            <button
                              className="logout-btn"
                              onClick={() => {
                                localStorage.removeItem("accessToken");
                                setShowUserMenu(false)
                              }}
                            >
                              Logout
                              </button>
                              </li>
                            )}
                        </ul>
                     )}
                     
                     </div>
                    </div>
                    </nav>
        )
    }
               

    export default Navbar