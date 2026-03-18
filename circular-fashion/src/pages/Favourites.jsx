import { useState } from "react";
import { Link} from "react-router-dom";
import { Heart, ExternalLink } from "lucide-react";
import { useFavourites } from "./FavouritesContext";

const PRODUCT_URLS = {
   1:"https://myreverievintage.com/products/midnight-spell-dress",
   2:"https://yesfriends.co/products/w-wide-jeans",
   3:"https://97heaven.co.uk/products/pleat-midi-skirt-size-xsmall-copy",
   4:"https://97heaven.co.uk/products/skinny-sunglasses-one-size-copy",
   5:"https://www.etherealtreasures.shop/products/patterned-gold-watch",
   6:"https://etherealtreasures.shop/products/amethyst-gold-watch",
   7:"https://www.breromi.com/products/magnetic-star-clip",
   8:"https://mybobamate.com/products/honeydew-bottle",
   9:"https://maisonawra.com/products/ensemble-sakura",
   10:"https://www.sephora.co.uk/p/topicals-slick-salve-mint-lip-balm",
   11:"https://www.sephora.co.uk/p/topicals-faded-brightening-cleansing-bar",
   12:"https://www.lush.com/uk/en/p/twilight-bath-bomb",
   13:"https://www.lush.com/uk/en/products/skin-drink-facial-moisturiser",
   14:"https://www.lush.com/uk/en/p/sticky-dates-body-spray-",
   15:"https://alysiumbeauty.com/products/nourishing-facial-moisturiser",
   16:"https://www.justmylook.com/products/aromatica-rosemary-root-enhancer-100ml",
    
   "h1": "https://www.sephora.co.uk/p/topicals-slick-salve-mint-lip-balm",
   "h2": "https://alysiumbeauty.com/products/nourishing-facial-moisturiser",
   "h3": "https://www.lush.com/uk/en/p/twilight-bath-bomb",
   "h4": "https://www.breromi.com/products/magnetic-star-clip",
   "h5": "https://www.etherealtreasures.shop/products/patterned-gold-watch",
   "h6": "https://myreverievintage.com/products/midnight-spell-dress",
   "h7": "https://97heaven.co.uk/products/skinny-sunglasses-one-size-copy",
   "h8": "https://www.justmylook.com/products/aromatica-rosemary-root-enhancer-100ml",
   "h9": "https://www.sephora.co.uk/p/topicals-faded-brightening-cleansing-bar",
   "h10": "https://www.lush.com/uk/en/products/skin-drink-facial-moisturiser",
   "h11": "https://etherealtreasures.shop/products/amethyst-gold-watch",
   "h12": "https://97heaven.co.uk/products/pleat-midi-skirt-size-xsmall-copy",
   "h13": "https://maisonawra.com/products/ensemble-sakura",
   "h14": "https://www.lush.com/uk/en/p/sticky-dates-body-spray-",
   "h15": "https://yesfriends.co/products/w-wide-jeans",
   "h16": "https://mybobamate.com/products/honeydew-bottle",

};

// Sustainability rating
const sustainabilityLabel = s =>
    s >= 5 ? "Excellent" : s >= 4 ? "Great" : s >= 3 ? "Good" : "Fair";

function SustainabilityRating({ score }) {
    if (!score) return null;
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px"}}>
            {[1, 2, 3, 4,5].map(i => (
              <span key={i} style={{
                width: 8, height: 8, borderRadius: "50%",
                border: "1.5px solid #111",
                background: i <= score ? "#111" : "transparent",
                display: "inline-block"
              }} />
    ))}

    <span style={{fontSize:"0.65rem", color:"#888", textTransform:"uppercase", letterSpacing: "0.05em", marginLeft: 3 }}>
        {sustainabilityLabel(score)}
    </span>
    </div>
    );

}

function FavouriteCard({ product}) {
    const { removeFavourite } = useFavourites();
    const [hovered, setHovered] = useState(false);

    return (
        <div
           onMouseEnter={() => setHovered(true)}
           onMouseLeave={() => setHovered(false)}
              style={{
                  border: "1.5px solid #e5e5e5",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.2s, transform 0.2s",
                  boxShadow: hovered ? "4px 4px 0 #111" : "none",
                  transform: hovered ? "translate(-2px, -2px)" : "none",
              }}
        >  
              {/* Image area */}
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
               <img 
               src={product.image}
               alt={product.name}
               style={{ width: "100%", height: "100%", objectFit: "cover" }}
               />
               {/* Heart remove button*/}
               <button onClick={() => removeFavourite(product.id)}
               title="Remove from Favourites"
               style={{
                position: "absolute", top: "0.6rem", right: "0.6rem",
                background: "none", border:"none", cursor: "pointer", padding: 0
               }}
                >
                <Heart size={20} fill="#111" stroke="#111" />
                </button>
                {/* Eco badge */}
                {product.badge && (
                    <span style={{
                        position: "absolute", top: "0.6rem", left: "0.6rem", background: "#111", color: "#fff",
                        fontSize:"0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                        padding: "0.25rem 0.55rem" }}>{product.badge}</span>

                    )}

              </div>
               
              {/* Info */}
              <div style={{ padding: "0.9rem 1rem 1rem", display: "flex", flexDirection: "column", flex: 1, gap: "0.25rem" }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999"}}>
                    {product.brand}
                </span>
                <h3 style={{ fontSize: "0.88rem", fontWeight: 500, margin: 0, color: "#111", lineHeight:1.3}}>
                    {product.name}
                    </h3>
                    <SustainabilityRating score={product.sustainability} />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "0.7rem"}}>
                        <span style={{ fontSize: "1rem", fontWeight: 700 }}>£{product.price}

                        </span>
                        {PRODUCT_URLS[product.id]&& (
                            <a
                                href={PRODUCT_URLS[product.id]} 
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.3rem",
                                    padding: "0.4rem 0.75rem",
                                    background: "#111", color: "#fff", border: "none",
                                    fontSize: "0.7rem", fontWeight: 600,
                                    letterSpacing: "0.05em", textTransform: "uppercase",
                                    textDecoration: "none", cursor: "pointer",
                                    transition: "backgrounds 0.15s"
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

                    
                            
export default function Favourites() {
    const { favourites } = useFavourites();

    return (
       <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem 4rem", 
        fontFamily: "Georgia, serif", color: "#111"}}>

            {/* Header */}
            <div style={{ textAlign: "center", padding: "2rem 0 1.5rem", borderBottom: "1.5px solid #111",
                marginBottom:"2rem" }}>
                    <h1 style={{ fontSize: "2.6rem", fontWeight: 700, letterSpacing: "-0.02em",
                        margin: "0 0 0.4rem", textTransform: "uppercase"}}>
                            Favourites
                        </h1>
                        <p style={{ fontSize: "0.9rem", color: "#666", margin: 0, letterSpacing: "0.04em"}}>

                            Your saved pieces
                        </p>
                    </div>

                    {/* Grid or empty state */}
                    {favourites.length > 0 ? (
                        <>
                        <div style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.06em",
                            textTransform: "uppercase", marginBottom: "1.5rem" }}>
                                {favourites.length} {favourites.length === 1 ? "item" : "items"} saved

                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem"}}>
                                    {favourites.map(product => ( 
                                        <FavouriteCard key={product.id} product={product} />
                                    ))}
                                    </div>
                                    </>
                    ) : (
                        <div style={{ textAlign: "center", padding: "5rem 1rem", color: "#aaa" }}>
                            
                            <Heart size={48} style= {{ marginBottom: "1rem", opacity: 0.2}}/>
                               <p style= {{ fontSize: "1rem", marginBottom: "1rem" }}>You haven't saved any favourites yet.</p>
                            
                            <Link to="/products">
                                <button style={{
                                    padding: "0.6rem 1.4rem", background: "#111", color: "#fff", border: "none",
                                    fontSize: "0.8rem", cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                                        Browse Products
                                    </button>
                            </Link>
                         </div>
                    )}
                </div>
    );
}
