import './Navbar.css'
import { Search, Heart, User, X } from "lucide-react";
import { Link, useNavigate} from "react-router-dom"
import { useState, useRef, useEffect } from "react"

function Navbar() { 
    const [showUserMenu, setShowUserMenu] = useState(false)
    const[showSearch, setShowSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const searchInputRef = useRef(null)
    const userMenuRef = useRef(null)
    const isLoggedIn = !!localStorage.getItem("accessToken");
    const navigate = useNavigate()

    
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
       
       useEffect(() => {
           if (showSearch && searchInputRef.current) {
               searchInputRef.current.focus()
           }
       }, [showSearch])

       const handleSearchSubmit = (e) => {
              e.preventDefault()
              if (searchQuery.trim()) {
                navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
                setShowSearch(false)
                setSearchQuery("")
       }
}
       const closeSearch = () => {
           setShowSearch(false)
           setSearchQuery("")
       }
       
       const handleLogout = () => {
           localStorage.removeItem("accessToken");
           setShowUserMenu(false);
           navigate("/");
       }

       return (
        <nav className="navbar">
            <Link to="/">
            <img src="/images/logo.png" alt="Rot8te Logo" className="logo" />
            </Link>
            {/* Hide nav links when search is active */}
            

            <ul className="nav-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="shop-item">
                    Shop
                    <ul className="dropdown-menu">
                        <li><Link to="/products">Shop All</Link></li>
                        <li><Link to="/products?category=Tops">Tops</Link></li>
                        <li><Link to="/products?category=Bottoms">Bottoms</Link></li>
                        <li><Link to="/products?category=Dresses">Dresses</Link></li>
                        <li><Link to="/products?category=Skirts">Skirts</Link></li>
                        <li><Link to="/products?category=Beauty">Beauty</Link></li>
                        <li><Link to="/products?category=Accessories">Accessories</Link></li>
                    </ul>
                </li>
                <li><Link to="/recycling-locator">Recycling Locator</Link></li>
                <li><Link to="/about">About Us</Link></li>
            </ul>
 
            <div className="nav-icons">
               {showSearch ? (
                <form onSubmit={handleSearchSubmit} className="navbar-search-form">
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products or brands..."
                        className="navbar-search-input"
                    />
                    <button type="submit" className="navbar-search-submit">
                        <Search size={16} />
                        </button>
                        <button type="button" className="navbar-search-close" onClick={closeSearch}>
                        <X size={16} />
                    </button>
                    </form>
                ) : (
                        <Search className="nav-icon" onClick={() => 
                    setShowSearch(true)} style={{cursor: "pointer"}}/>
                )}
                    
                 <Link to="/favourites" title="Favourites">
                
                <Heart className="nav-icon"/>
                </Link>

                <div className="user-menu" ref={userMenuRef}>
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
                                <>
                                <li>
                                  <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                                  View Profile
                                  </Link>
                                </li>
                              <li>
                            <button
                              className="logout-btn"
                              onClick={handleLogout}>
                              Logout
                              </button>
                            </li>
                          </>
                         )}
                    </ul>
                    
                )}
                     
             </div>
            </div>
        </nav>
        )
    }
               

    export default Navbar