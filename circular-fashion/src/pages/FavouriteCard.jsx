import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ExternalLink } from "lucide-react";
import { useFavourites } from "./FavouritesContext";

const sustainabilityLabel = s =>
    s >=5 ? "Excellent" : s >=4 ? "Great" : s >= 3 ? "Good" : "Fair";

function SustainabilityRating({ score }) {
    if (!score) return null;
    return (
       <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
           {[1, 2, 3, 4, 5].map(i => (
               <span key={i} style={{
                   width: 8, height: 8, borderRadius: "50%",
                   border: "1.5px solid #111",
                   background: i <= score ? "#111" : "transparent",
                   display: "inline-block"
               }} />
           ))}
           <span style={{ fontSize: "0.65rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginLeft: 3 }}>
               {sustainabilityLabel(score)}
            </span>
       </div>
    );
}

export default function FavouriteCard({ product }) {
    const { removeFavourite, isFavourite, addFavourite } = useFavourites();
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();
    const favourited = isFavourite(product.id);

    return (
        <div
           onMouseEnter={() => setHovered(true)}
           onMouseLeave={() => setHovered(false)}
           onClick={() => navigate(`/products/${product.id}`)}
           style={{
               border: "1.5px solid #e5e5e5",
               background: "#fff",
               display: "flex",
               flexDirection: "column",
               transition: "box-shadow 0.2s, transform 0.2s",
               boxShadow: hovered ? "4px 4px 0 #111" : "none",
               transform: hovered ? "translate(-2px, -2px)" : "none",
               cursor: "pointer",
               minHeight: "140px"
           }}
        >
            {/* Image area */}
            <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                 <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                {/*Heart button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        favourited ? removeFavourite(product.id) : addFavourite(product);
                    }}
                    title={favourited ? "Remove from Favourites" : "Add to Favourites"}
                    style={{
                        position:"absolute", top: "0.6rem", right: "0.6rem",
                        background: "rgba(255,255,255,0.8)", border: "none",
                        cursor: "pointer", padding: "0.3rem", display: "flex", alignItems: "center"
                    }}
                >
                    <Heart size={20} fill={favourited ? "#111" : "none"} stroke="#111" />
                </button>
                     {product.badge && (
                        <span style={{
                            position: "absolute", top: "0.6rem", left: "0.6rem",
                            background: "#111",
                            color: "#fff",
                            fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
                            textTransform: "uppercase", padding: "0.25rem 0.55rem"
                        }}>{product.badge}</span>
                     )}
                </div>

                {/* Info */}
                <div
                  style={{
                    padding: "0.9rem 1rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    gap: "0.25rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#999",
                    }}
                >
                    {product.brand}
                </span>

                <h3
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    margin: 0,
                    color: "#111",
                    lineHeight: 1.3,
                    minHeight: "2.4em",
                    maxHeight: "2.6em",
                    overflow: "hidden"
                  }}
                >
                  {product.name}
                </h3>

                <SustainabilityRating score={product.sustainability} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "auto",
                    paddingTop: "0.7rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                    }}
                >
                    £{product.price}
                </span>
                {product.url && (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      padding: "0.4rem 0.75rem",
                      background: "#111",
                      color: "#fff",
                      border: "none",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      cursor: "pointer",
                      transition: "background 0.15s",

                    }}
                >
                    <ExternalLink size={12} />
                    Visit
                  </a>
                  )}
                </div>
             </div>
         </div>
    );

} 

export const BADGE_COLORS = {
    Organic: "#4a7c59",
    Upcycled: "#7c6a4a",
    Natural: "#6a7c4a",
    Recycled: "#4a6a7c",
    Ethical: "#7c4a6a",
};