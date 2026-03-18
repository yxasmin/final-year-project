import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Heart, ExternalLink } from "lucide-react";
import { useFavourites} from "./FavouritesContext";
import './AllProducts.css';

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

};

const shopProducts = [
    { id: 1, brand: "Reverie Vintage", name: "Midnight Spell Dress", price: "79", category: "Dresses", sustainability: 5, badge: "Upcycled", image:"/images/product6.png" },
    { id: 2, brand: "Yes Friends", name: "Wide Jeans", price: "25", category: "Bottoms", sustainability: 5, badge: "Organic", image:"/images/product15.png" },
    { id: 3, brand: "97heaven", name: "cord midi skirt", price: "5", category: "Skirts", sustainability: 4, badge: "Recycled", image:"/images/product12.png" },
    { id: 4, brand: "97heaven", name: "stripe heeled boots ", price: "10", category: "Shoes", sustainability: 3, badge: "Ethical", image:"/images/product7.png" },
    { id: 5, brand: "Ethereal Treasures", name: "Patterned Gold Watch", price: "45", category: "Accessories", sustainability: 4, badge: "Ethical", image:"/images/product5.png" },
    { id: 6, brand: "Ethereal Treasures", name: "Sterling Silver Amethyst Watch", price: "65", category: "Accessories", sustainability: 4, badge: "Ethical", image:"/images/product11.png" },
    { id: 7, brand: "Breromi", name: "Star Clique™", price: "35", category: "Accessories", sustainability: 3, badge: "Recycled", image:"/images/product4.png" },
    { id: 8, brand: "BobaMate", name: "Reusable Boba Cup", price: "18.44", category: "Accessories", sustainability: 5, badge: "Recycled", image:"/images/product16.png" },
    { id: 9, brand: "Maison Awra", name: "Sakura Set", price: "65", category: "Tops", sustainability: 5, badge: "Upcycled", image:"/images/product13.png" },
    { id: 10, brand: "Topicals", name: "Slick Salve Lip Balm", price: "14", category: "Beauty", sustainability: 4, badge: "Ethical", image:"/images/product1.png" },
    { id: 11, brand: "Topicals", name: "Faded Brightening Cleansing Bar", price: "25", category: "Beauty", sustainability: 4, badge: "Ethical", image:"/images/product9.png" },
    { id: 12, brand: "Lush", name: "Twilight", price: "5.50", category: "Beauty", sustainability: 5, badge: "Organic", image:"/images/product3.png" },
    { id: 13, brand: "Lush", name: "Skin Drink", price: "28", category: "Beauty", sustainability: 5, badge: "Organic", image:"/images/product10.png" },
    { id: 14, brand: "Lush", name: "Sticky Dates Solid Perfume", price: "12", category: "Beauty", sustainability: 5, badge: "Organic", image:"/images/product14.png"},
    { id: 15, brand: "Alysium Beauty", name: "Soothing Natural Glow Facial Cream", price: "6.99", category: "Beauty", sustainability: 4, badge: "Natural", image:"/images/product2.png"},
    { id: 16, brand: "Aromatica", name: "Rosemary Root Enhancer", price: "12.60", category: "Beauty", sustainability: 4, badge: "Natural", image:"/images/product8.png" },
];

const CATEGORIES =
    ["All", "Tops", "Bottoms", "Dresses", "Skirts", "Shoes", "Accessories", "Beauty"];
const BRANDS = ["All", ...Array.from(new Set(shopProducts.map(p => p.brand))).sort()];
const BADGES = ["All", "Organic", "Recycled", "Upcycled", "Natural", "Ethical"];
const sustainabilityLabel = s => s >= 5 ? "Excellent" : s >= 4 ? "Great" : s >= 3 ? "Good" : "Fair";
const PLACEHOLDER_COLORS = {
    Dresses: "#e8e0d8", Bottoms: "#dde4e0", Shoes: "#e4dde4",
    Accessories: "#e0e4dd", Beauty: "#f0e8e8", Tops: "#e8e8e0", Outerwear: "#d8dde4"
};

function SustainabilityRating({ score }) {
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
            <span style={{
                fontSize: "0.65rem", color: "#888", textTransform: "uppercase",
                letterSpacing: "0.05em", marginLeft: 3
            }}>
                {sustainabilityLabel(score)}
            </span>
        </div>
    );
}

function ProductCard({ product }) {
    const [hovered, setHovered] = useState(false);
    const { isFavourite, addFavourite, removeFavourite } = useFavourites();
    const favourited = isFavourite(product.id);
    
    const toggleFavourite =(e) => {
        e.stopPropagation();
        if (favourited){ 
            removeFavourite(product.id);
    } else {
        addFavourite(product);
    }
    };

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                border: "1.5px solid #e5e5e5",
                background: "#ffffff",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.2s, transform 0.2s",
                boxShadow: hovered ? "4px 4px 0 #111" : "none",
                transform: hovered ? "translate(-2px,-2px)" : "none",
                cursor: "default"
            }}
        >
            {/* Image area */}
            <div style={{
                position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                    <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    
                {/* Eco badge pinned over the image */}
                <span style={{
                    position: "absolute", top: "0.6rem", left: "0.6rem",
                    background: "#111", color: "#fff",
                    fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "0.25rem 0.55rem"
                }}>{product.badge}</span>


            <button onClick={toggleFavourite} title={favourited ? "Remove from Favourites" : "Add to Favourites"}
             style={{
                position: "absolute", top: "0.6rem", right: "0.6rem",
                background: "rgba(255,255,255,0.8)", border:"none", cursor: "pointer", padding: "0.3rem", display:"flex", alignItems: "center"
             }}
             >
            <Heart size={16} fill={favourited ? "#111" : "none"} stroke="#111" />
                </button>
               </div>

            {/* Info */}
            <div style={{ padding: "0.9rem 1rem 1rem", display: "flex", flexDirection: "column", flex: 1, gap: "0.25rem" }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999999" }}>
                    {product.brand}
                </span>
                <h3 style={{ fontSize: "0.88rem", fontWeight: 500, margin: 0, color: "#11111", lineHeight: 1.3 }}>
                    {product.name}
                </h3>
                <SustainabilityRating score={product.sustainability} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "0.7rem" }}>
                    <span style={{ fontSize: "1rem", fontWeight: 700 }}>£{product.price}</span>
                    {PRODUCT_URLS[product.id] &&(
                        <a href={PRODUCT_URLS[product.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.4rem 0.75rem",
                            background: "#111", color: "#fff", border: "none",
                            fontSize: "0.7rem", fontWeight: 600,
                            letterSpacing: "0.05em", textTransform: "uppercase",
                            textDecoration: "none", cursor: "pointer",
                            transition: "background 0.15s" 
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

export default function AllProducts() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [brand, setBrand] = useState("All");
    const [badge, setBadge] = useState("All");
    const [sort, setSort] = useState("default");

    const [searchParams] = useSearchParams();
    useEffect(() => {
      const urlCategory = searchParams.get("category");
      const urlSearch = searchParams.get("search");
      if (urlCategory) setCategory(urlCategory);
      if (urlSearch) setSearch(urlSearch);
    }, [searchParams]);

    const filtered = useMemo(() => {
        let r = shopProducts.filter(p => {
            const q = search.toLowerCase();
            return (
                (p.name.toLowerCase().includes(q) ||
                    p.brand.toLowerCase().includes(q)) &&
                (category === "All" || p.category === category) &&
                (brand === "All" || p.brand === brand) &&
                (badge === "All" || p.badge === badge)

            );
        });

        if (sort === "price-asc")
            r = [...r].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        if (sort === "price-desc")
            r = [...r].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        if (sort === "eco")
            r = [...r].sort((a, b) => b.sustainability - a.sustainability);
        return r;
    }, [search, category, brand, badge, sort]);

    const hasFilters =
        search ||
        category !== "All" ||
        brand !== "All" ||
        badge !== "All" ||
        sort !== "default";

    const clear = () => {
        setSearch("");
        setCategory("All");
        setBrand("All");
        setBadge("All");
        setSort("default");
    };

    const pill = (active) => ({
        padding: "0.35rem 0.85rem",
        border: `1.5px solid ${active ? "#111111" : "#cccccc"}`,
        background: active ? "#111111" : "#ffffff",
        color: active ? "#ffffff" : "#555555",
        fontSize: "0.8rem", cursor: "pointer",
        letterSpacing: "0.02em", transition: "all 0.15s"
    });

    const selectStyle = {
        padding: "0.5rem 2rem 0.5rem 0.7rem",
        border: "1.5px solid #ccc", background: "#ffffff",
        fontSize: "0.82rem", color: "#111111", cursor: "pointer",
        outline: "none", appearance: "none", minWidth: 140
    };

    return (
        <div style={{
            maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem 4rem",
            fontFamily: "Georgia, serif", color: "#111111"
        }}>
            {/*Header */}
            <div style={{ textAlign: "center", padding: "2rem 0 1.5rem", borderBottom: "1.5px solid #111111", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2.6rem", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 0.4rem", textTransform: "uppercase" }}>
                    Shop
                </h1>
                <p style={{ fontSize: "0.9rem", color: "#666666", margin: 0, letterSpacing: "0.04rem" }}>
                    Discover ethically produced, sustainably sourced pieces
                </p>
            </div>

            {/* Search */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                <div style={{ position: "relative", width: "100%", maxWidth: 460 }}>
                    <span style={{
                        position: "absolute", left: "0.9rem", top: "50%",
                        transform: "translateY(-50%)", color: "#aaaaaa"
                    }}>
                        🔍
                    </span>
                    <input
                        type="text"
                        placeholder="Search products or brands..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            width: "100%", padding: "0.75rem 2.2rem 0.75rem 2.5rem",
                            border: "1.5px solid #111", fontSize: "0.88rem",
                            background: "#ffffff", color: "#111111", outline: "none", boxSizing: "border-box"
                        }}
                    />
                    {search && (
                        <button onClick={() => setSearch("")} style={{
                            position: "absolute", right: "0.8rem",
                            top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer",
                            color: "#888", fontSize: "0.8rem"
                        }}>✕</button>
                    )}
                </div>
            </div>
          
          <div style={{ marginBottom: "1rem"}}>
               <div style={{ fontSize: "0.68rem",
            fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: "0.5rem" }}>
            Category
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem"}} >
            {CATEGORIES.map(c => (
                <button key ={c} style=
            {pill(category === c)} onClick={() => setCategory(c)}>{c}</button>

            ))}
          </div>
        </div>

    
          
            {/*Selects row */}
            <div style={{
                display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "flex-end",
                paddingBottom: "1.5rem", borderBottom: "1px solid #ddd", marginBottom: "1rem"
            }}>
                {[["Brand", BRANDS, brand, setBrand], ["Eco Badge", BADGES, badge, setBadge]].map(([label, opts, val, setter]) => (
                    <div key={label} style={{
                        display: "flex",
                        flexDirection: "column", gap: "0.3rem"
                    }}>
                        <label style={{
                            fontSize: "0.68rem", fontWeight: 700,
                            letterSpacing: "0.1em", textTransform: "uppercase", color: "#888888"
                        }}>
                            {label}</label>
                        <select value={val} onChange={e =>
                            setter(e.target.value)} style={selectStyle}>
                            {opts.map(o => <option key={o}>{o}</option>)}
                        </select>
                    </div>
                ))}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <label style={{
                        fontSize: "0.68rem", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase", color: "#888888"
                    }}>Sort by</label>
                    <select value={sort} onChange={e =>
                        setSort(e.target.value)} style={selectStyle}>
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="eco">Most Sustainable</option>
                    </select>
                </div>
                {hasFilters && (
                    <button onClick={clear} style={{
                        padding: "0.5rem 1rem",
                        background: "none", border: "1.5px solid #111111", fontSize: "0.78rem",
                        cursor: "pointer", color: "#111111", letterSpacing: "0.04em",
                        alignSelf: "flex-end", transition: "all 0.15s"
                    }}>
                        Clear filters
                    </button>
                )}
            </div>

            {/*Count*/}
            <div style={{
                fontSize: "0.75rem", color: "#aaa",
                letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1.5rem"
            }}>
                {filtered.length} {filtered.length === 1 ? "product" : "products"} found </div>

            {/*Grid*/}
            {filtered.length > 0 ? (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "1.25rem"
                }}>
                    {filtered.map(p => <ProductCard key={p.id} product={p} />)}

                </div>
            ) : (
                <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#aaaaaa" }}>
                    <p style={{ marginBottom: "1rem" }}> No products match your search.</p>
                    <button onClick={clear} style={{
                        padding: "0.5rem 1.2rem", background: "#111111", color: "#ffffff", border: "none",
                        fontSize: "0.8rem", cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase"
                    }}>
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}







