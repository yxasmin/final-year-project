import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, User, Leaf, LogOut, KeyRound, Trash2 } from 'lucide-react';
import { useFavourites } from './FavouritesContext';
import "./Profile.css";

//Badge colours
const BADGE_COLORS = {
    Organic:"#4a7c59",
    Upcycled: "#7c6a4a",
    Natural: "#6a7c4a",
    Recycled:"#4a6a7c",
    Ethical:"#7c4a6a",
};

const sustainabilityLabel = s =>
  s >= 5 ? "Excellent" : s >= 4 ? "Great" : s >= 3 ? "Good" : "Fair";

export default function Profile(){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState("overview");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const {favourites} = useFavourites();

    //Fetch logged-in user data from Django backend
    useEffect (() => {
      const token = localStorage.getItem("accessToken");
      if(!token) {
        setError("Not logged in");
        setLoading(false);
        return;
      }
    fetch("http://localhost:8000/api/profile/", {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(res => {
      if(!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    })
    .then(data => {
      setUser(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
  },
  []);

  //sustainability stats from favourited products
  const totalFavourites = favourites.length;
const avgSustainability = totalFavourites > 0 ? (favourites.reduce((sum, p) => sum + (p.sustainability || 0), 0) / totalFavourites).toFixed(1) : 0;
const badgeCounts = favourites.reduce((acc, p) => {
  if (p.badge) acc[p.badge] = (acc[p.badge] || 0) + 1;
  return acc;
}, {});
const topBadge = Object.entries(badgeCounts).sort((a, b) => b[1] - a[1])[0];


const handleLogout = () => {
  localStorage.removeItem("accessToken");
  window.location.href = "/";
};
// sends delete request to backend and redirects home
const handleDeleteAccount = async () => {
  const token =
  localStorage.getItem("accessToken");
  try{
    const res = await
    fetch("http://localhost:8000/api/delete-account/", {
      method:"DELETE",
      headers: { Authorization: `Bearer ${token}`
    }
  });
  if (res.ok) {

localStorage.removeItem("accessToken");
window.location.href= "/";
  } else {
    setDeleteError("Failed to delete account. Please try again");

}
  } catch {
    setDeleteError("Network error. Please try again.");
  }
};
const navItems = [
    {id: "overview", label: "Overview", icon: User},
    {id: "favourites", label: "Saved Items", icon: Heart },
    {id: "sustainability", label: "Eco Stats", icon: Leaf},
];

if (loading) return (
  <div className="profile-loading">
    <div className="profile-loading__spinner" />
    <p>Loading your profile...</p>
  </div>
);

if (error) return (
  <div className="profile-error">
      <p>Could not load profile: {error}</p>
      <Link to="/login"><button className="profile-btn">Go to Login</button></Link>
  </div>
);

return (
  <div className="profile-page">
    {showDeleteConfirm && (
      <div className="profile-delete-overlay">
        <div className="profile-delete-modal">
          <h2>Delete Account</h2>
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          {deleteError && <p className="proifle-delete-modal__error">{deleteError}</p>}
          <div className="profile-delete-modal__buttons">
            <button className="profile-btn" onClick={handleDeleteAccount}>
              Yes, Delete My Account
            </button>
            <button className="profile-btn profile-btn--outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}

    {/*Sidebar*/}
    <aside className="profile-sidebar">
    {/*Avatar*/}
    <div className="profile-sidebar__avatar">
      <span>{user?.username?.[0]?.toUpperCase() || "U"}</span>
    </div>
    <p className="profile-sidebar__name">{user?.username || "User"}</p>
    <p className="profile-sidebar__email">{user?.email || ""}</p>
    {/* Nav*/}
    <nav className="profile-sidebar__nav">
      {navItems.map(({ id, label, icon: Icon}) => (
        <button key={id} className={`profile-sidebar__nav-item ${activeSection === id ? "active" : ""}`}
            onClick={() => setActiveSection(id)}
            >
             <Icon size={16} />
             {label}
             </button>
          ))}
    </nav>

    {/* Logout */}
    <div className="profile-sidebar__actions">
    <button className="profile-sidebar__logout" onClick={handleLogout}>
      <LogOut size={15} />
       Logout
    </button>
    <Link to="/reset-password" className="profile-sidebar__action-link">
    <KeyRound size={15} />
    Reset Password
    </Link>
    <button className="profile-sidebar__delete"
    onClick={() => setShowDeleteConfirm(true)}
    >
      <Trash2 size={15} />
      Delete Account
        </button>
      </div>
    </aside>

   {/* Main content */}
   <main className="profile-main">
      {/* OVERVIEW SECTION */}
      {activeSection === "overview" && (
          <div className="profile-section">
            <h1 className="profile-section__title">Overview</h1>
            <p className="profile-section__subtitle">Welcome back, {user?.username}.</p>

            {/*Stats row */}
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="profile-stat__value"> {totalFavourites}</span>
                <span className="profile-stat__label">Saved Items</span>
                </div>
                <div className="profile-stat">
                  <span className="profile-stat__value">{avgSustainability}</span>
                  <span className="profile-stat__label">Avg. Eco Score</span>
                  </div>
                  <div className="profile-stat">
                    <span className="profile-stat__value">{topBadge ? topBadge[0] : "-"}</span>
                    <span className="profile-stat__label">Top Badge</span>
                    </div>
                  </div>

                  {/*Account details */}
                  <div className="profile-details">
                    <h2 className="profile-details__heading">Account Details</h2>
                    <div className="profile-details__row">
                      <span className="profile-details__label">Username</span>
                      <span className="profile-details__value">{user?.username}</span>
                      </div>
                      <div className="profile-details__row">
                        <span className="profile-details__label">Email</span>
                        <span className="profile-details__value">{user?.email}</span>
                        </div>
                        <div className="profile-details__row">
                          <span className="profile-details__label">Member Since</span>
                          <span className="profile-details__value">
                            {user?.date_joined
                               ?new Date(user.date_joined).toLocaleDateString("en-GB", { year: "numeric", month: "long"})
                           : "-"}
                          </span>
                        </div>
                     </div>
                  </div>
               )}
               
               {/* Favourites section*/}
               {activeSection === "favourites" && (
                   <div className="profile-section">
                    <h1 className="profile-section__title">Saved Items</h1>
                    <p className="profile-section__subtitle">{totalFavourites} {totalFavourites === 1 ? "item" : "items"} saved</p>
                    
                    {totalFavourites === 0 ? (
                        <div className="profile-empty">
                         <Heart size={40} strokeWidth= {1.5} />
                        <p>You haven't saved any items yet. </p>
                       <Link to="/products">
                       <button className="profile-btn">Browse Products</button>
                       </Link>
                    </div>
                    ):(
              <div className="profile-favourites-grid">
                {favourites.map(product => (
                    <div key={product.id} className="profile-fav-card">
                      <div className="profile-fav-card__image-wrapper">
                        <img src={product.image} alt={product.name} className="profile-fav-card__image"/>
                        {product.badge && (
                          <span className="profile-fav-card__badge" style={{ background: BADGE_COLORS[product.badge] || "#111" }}>
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div className="profile-fav-card__info">
                        <span className="profile-fav-card__brand">{product.brand}</span>
                        <p className="profile-fav-card__name">{product.name}</p>
                        <span className="profile-fav-card__price">£{product.price}</span>
                          </div>
                        </div>
                      ))}
                      </div>
                    )}
                    </div>
               )}
                
               {/* Sustainability section */}
               {activeSection === "sustainability" && (
                  <div className="profile-section">
                     <h1 className="profile-section__title">Eco Stats</h1>
                     <p className="profile-section__subtitle">Your sustainability footprint based on saved items</p>

                     {totalFavourites === 0 ? (
                         <div className="profile-empty">
                          <Leaf size={40} strokeWidth= {1.5} />
                         <p>Save some products to see your eco stats.</p> 
                         <Link to="/products">
                             <button className="profile-btn">Browse Products</button>
                         </Link>
                     
                  </div>
               ) : (
                <>

                {/* Overall score */}
                <div className="profile-eco-score">
                  <div className="profile-eco-score__circle">
                    <span className="profile-eco-score__number">{avgSustainability}</span>
                    <span className="profile-eco-score__max">/5</span>
                    </div>
                    <div>
                      <p className="profile-eco-score__label">Average Eco Score</p>
                      <p className="profile-eco-score__rating">
                        {sustainabilityLabel(parseFloat(avgSustainability))}

                      </p>
                  </div>
                </div>
                {/* Badge breakdown */}
                <div className="profile-details" style={{ marginTop: "2rem" }}>
                  <h2 className="profile-details__heading">Badge Breakdown</h2>

                  {Object.entries(badgeCounts).sort((a, b) => b[1] - a[1]).map(([badge, count]) => (
                    <div key={badge} className="profile-badge-row">
                      <span className="profile-badge-pill"
                      style={{ background: BADGE_COLORS[badge] || "#111"}}>
                        {badge}
                      </span>
                      {/*Progress bar showing proportion */}
                      <div className="profile-badge-bar">
                        <div className="profile-badge-bar__fill"
                        style={{
                        width: `${(count / totalFavourites) * 100}%`,
                        background: BADGE_COLORS[badge] || "#111" }} />

                      </div>
                      <span className="profile-badge-count">{count}</span>
                      </div>
                ))}
                </div>
                {/* Per-product scores */}
               
                <div className="profile-details" style={{ marginTop: "2rem"}}>
                <h2 className="profile-details__heading">Item Scores</h2>
                {favourites.map(p => (
                  <div key= {p.id} className="profile-details__row">
                    <span className="profile-details__label">{p.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem"}}>
                      {/*Dot rating */}

                      {[1,2,3,4,5].map(i => (
                       <span key={i} style={{
                        width: 8, height: 8, borderRadius: "50%",
                        border: "1.5px solid #111",
                        background: i <= (p.sustainability || 0) ? "#111" : "transparent",
                        display: "inline-block"
                       }} />

                      ))}
                      <span style={{ fontSize: "0.7rem", color: "#888", marginLeft: 4}} >
                       {sustainabilityLabel(p.sustainability)}
                      </span>
                      </div>
                    </div>
                    ))}
               </div>
                </>
               )}
              </div>
               )}
               </main>
            </div>
         );
        }


