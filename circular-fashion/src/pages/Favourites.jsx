import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavourites } from "./FavouritesContext";
import FavouriteCard from "./FavouriteCard";

export default function Favourites() {
    const { favourites } = useFavourites();

    return (
        <div style={{
           maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem 4rem",
           fontFamily: "Georgia, serif", color: "#111"
        }}>
            {/* Header */}
            <div style={{
                textAlign: "center", padding: "2rem 0 1.5rem", borderBottom: "1.5px solid #111",
                marginBottom: "2rem"
            }}>
                <h1 style={{
                    fontSize: "2.6rem", fontWeight: 700, letterSpacing: "-0.02em",
                    margin: "0 0 0.4rem", textTransform: "uppercase"
                }}>
                    Favourites
                </h1>
                <p style={{ fontSize: "0.9rem", color: "#666", margin: 0, letterSpacing: "0.04em" }}>
                    Your saved pieces
                </p>
            </div>

            {/* Grid or empty state */}
            {favourites.length > 0 ? (
                <>
                   <div style={{
                       fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.06em",
                       textTransform: "uppercase", marginBottom: "1.5rem"
                   }}>
                       {favourites.length} {favourites.length === 1 ? "item" : "items"} saved
                   </div>
                   <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
                        {favourites.map(product => (
                            <FavouriteCard key={product.id} product={product} />
                        ))}

                   </div>
                </>
            ) : (
                <div style={{ textAlign: "center", padding: "5rem 1rem", color: "#aaa" }}>
                    <Heart size={48} style={{ marginBottom: "1rem", opacity: 0.2 }} />
                    <p style={{ fontSize: "1rem", marginBottom: "1rem"}}>You haven't saved any favourites yet.</p>
                    <Link to="/products">
                        <button style={{
                            padding: "0.6rem 1.4rem", background:"#111", color: "#fff", border: "none",
                            fontSize: "0.8rem", cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase"

                        }}>
                            Browse Products
                         </button>
                    </Link>
                </div>
            )}
        </div>
    );
}