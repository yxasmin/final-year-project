import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useFavourites } from "./FavouritesContext";
import './AllProducts.css';

const CATEGORIES = ["All", "Tops", "Bottoms", "Dresses", "Skirts", "Shoes", "Accessories", "Beauty"];
const BADGES = ["All", "Organic", "Recycled", "Upcycled", "Natural", "Ethical"];
const PRODUCTS_PER_PAGE = 16;

const sustainabilityLabel = s =>
    s >= 5 ? "Excellent" : s >= 4 ? "Great" : s >= 3 ? "Good" : "Fair";

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
    const navigate = useNavigate();

    const toggleFavourite = (e) => {
        e.stopPropagation();
        favourited ? removeFavourite(product.id) : addFavourite(product);

    };

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => navigate(`/products/${product.id}`)}
            style={{
                border: "1.5px solid #e5e5e5", background: "#fff",
                display: "flex", flexDirection: "column",
                transition: "box-shadow 0.2s, transform 0.2s",
                boxShadow: hovered ? "4px 4px 0 #111" : "none",
                transform: hovered ? "translate(-2px, -2px)" : "none",
                cursor: "pointer"

            }}
        >
            <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

                {product.badge && (
                    <span style={{
                        position: "absolute", top: "0.6rem", left: "0.6rem",
                        background: "#111", color: "#fff",
                        fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", padding: "0.25rem 0.55rem"
                    }}>{product.badge}</span>
                )}
                <button onClick={toggleFavourite}
                    title={favourited ? "Remove from Favourites" : "Add to Favourites"}
                    style={{
                        position: "absolute", top: "0.6rem", right: "0.6rem",
                        background: "rgba(255,255,255,0.8)", border: "none",
                        cursor: "pointer", padding: "0.3rem", display: "flex", alignItems: "center"
                    }}>
                    <Heart size={16} fill={favourited ? "#111" : "none"} stroke="#111" />
                </button>
            </div>

            <div style={{
                padding: "0.9rem 1rem 1rem", display: "flex", flexDirection: "column",
                flex: 1, gap: "0.25rem",
                minHeight: "140px"
            }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999" }}>
                    {product.brand}
                </span>
                <h3 style={{
                    fontSize: "0.88rem", fontWeight: 500, margin: 0, color: "#111", lineHeight: 1.3, minHeight: "2.4em", maxHeight: "2.6em",
                    overflow: "hidden"
                }}>
                    {product.name}
                </h3>
                <SustainabilityRating score={product.sustainability} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "0.7rem" }}>
                    <span style={{ fontSize: "1rem", fontWeight: 700 }}>
                        {String(product.price).startsWith("£") || String(product.price).startsWith("$") || String(product.price).includes("€")
                            ? product.price
                            : `£${product.price}`}
                    </span>
                    {product.url && (
                        <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                display: "flex", alignItems: "center", gap: "0.3rem",
                                padding: "0.4rem 0.75rem",
                                background: "#111", color: "#fff",
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


            export default function AllProduct({products = []}) {
                const [search, setSearch] = useState("");
                const [category, setCategory] = useState("All");
                const [brand, setBrand] = useState("All");
                const [badge, setBadge] = useState("All");
                const [sort, setSort] = useState("default");
                const [page, setPage] = useState(1);

    const BRANDS = useMemo(() =>
        ["All", ...Array.from(new Set(products.map(p => p.brand))).sort()],
                );

                const [searchParams] = useSearchParams();
    useEffect(() => {
        const urlCategory = searchParams.get("category");
                const urlSearch = searchParams.get("search");
                if (urlCategory) setCategory(urlCategory);
                if (urlSearch) setSearch(urlSearch);
    }, [searchParams]);

    useEffect(() => {setPage(1); }, [search, category, brand, badge, sort]);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
                const badgeValue = badge?.toLowerCase().trim();

        let r = products.filter(p => {
            return (
                (p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) &&
                (category === "All" || p.category === category) &&
                (brand === "All" || p.brand === brand) &&
                (badgeValue === "all" || p.badge.toLowerCase() === badgeValue)
                );
        });
        if (sort === "price-asc") r = [...r].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        if (sort === "price-desc") r = [...r].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        if (sort === "eco") r = [...r].sort((a, b) => b.sustainability - a.sustainability);

                return r;
    }, [products, search, category, brand, badge, sort]);

                const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
                const paginated = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);
                const hasFilters = search || category !== "All" || brand !== "All" || badge !== "All" || sort !== "default";

    const clear = () => {setSearch(""); setCategory("All"); setBrand("All"); setBadge("All"); setSort("default"); };

    const pill = (active) => ({
                    padding: "0.35rem 0.85rem",
                border: `1.5px solid ${active ? "#111" : "#ccc"}`,
                background: active ? "#111" : "#fff",
                color: active ? "#fff" : "#555",
                fontSize: "0.8rem", cursor: "pointer",
                letterSpacing: "0.02em", transition: "all 0.15s"
    });

                const selectStyle = {
                    padding: "0.5rem 2rem 0.5rem 0.7rem",
                border: "1.5px solid #ccc", background: "#fff",
                fontSize: "0.82rem", color: "#111", cursor: "pointer",
                outline: "none", appearance: "none", minWidth: 140
    };

                return (
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem 4rem", fontFamily: "Georgia, serif", color: "#111" }}>

                    {/* Header */}
                    <div style={{ textAlign: "center", padding: "2 rem 0 1.5rem", borderBottom: "1.5px solid #111", marginBottom: "2rem" }}>
                        <h1 style={{ fontSize: "2.6rem", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 0.4rem", textTransform: "uppercase" }}>Shop</h1>
                        <p style={{ fontSize: "0.9rem", color: "#666", margin: 0, letterSpacing: "0.04em" }}>

                            Discover ethically produced, sustainably sourced pieces.
                        </p>

                    </div>

                    {/* Search */}
                    <div className="shop-search-bar">
                        <div className="search-wrapper">
                            <span className="search-icon">🔍</span>

                            <input
                                type="text"
                                placeholder="Search products or brands..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="search-input"
                            />
                            {search && (
                                <button onClick={() => setSearch("")} className="search-clear">
                                    ✕
                                </button>
                            )}
                        </div>


                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <div style={{
                            fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em",
                            textTransform: "uppercase", color: "#888", marginBottom: "0.5rem"
                        }}>Category</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                            {CATEGORIES.map(c => <button key={c} style={pill(category === c)} onClick={() => setCategory(c)}>{c}</button>)}

                        </div>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "flex-end", paddingBottom: "1.5rem", borderBottom: "1px solid #ddd", marginBottom: "1rem" }}>
                        {[["Brand", BRANDS, brand, setBrand], ["Eco Badge", BADGES, badge, setBadge]].map(([label, opts, val, setter]) => (
                            <div key={label} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                <label style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>{label}</label>
                                <select value={val} onChange={e => setter(e.target.value)} style={selectStyle}>
                                    {opts.map(o => <option key={o}>{o}</option>)}
                                </select>
                            </div>
                        ))}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                            <label style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>Sort by</label>
                            <select value={sort} onChange={e => setSort(e.target.value)} style={selectStyle}>

                                <option value="default">Default</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="eco">Most Sustainable</option>

                            </select>
                        </div>
                        {hasFilters && (
                            <button onClick={clear} style={{
                                padding: "0.5rem  1rem", background: "none", border: "1.5px solid #111", fontSize: "0.78rem", cursor: "pointer", color: "#111",
                                letterSpacing: "0.04em", alignSelf: "flex-end"
                            }}>

                                Clear filters
                            </button>
                        )}
                    </div>

                    {/*Count */}
                    <div style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1.5rem" }}
                    >
                        {filtered.length} {filtered.length === 1 ? "product" : "products"} found

                    </div>

                    {/* Grid */}
                    {paginated.length > 0 ? (
                        <div className="shop-grid">
                            {paginated.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    ) : (
                        <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#aaa" }}>
                            <p style={{ marginBottom: "1rem" }}>No products match your search. </p>
                            <button onClick={clear} style={{
                                padding: "0.5rem 1.2rem", background: "#111", color: "#fff", border: "none",
                                fontSize: "0.8rem", cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase"
                            }}>
                                Clear filters
                            </button>
                        </div>

                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "3rem" }}>
                            <button onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo(0, 0); }}
                                disabled={page === 1}
                                style={{ padding: "0.5rem 0.75rem", border: "1.5px solid #ccc", background: "#fff", cursor: page === 1 ? "not-allowed" : "pointer", color: page === 1 ? "#ccc" : "#111", display: "flex", alignItems: "center" }}>
                                <ChevronLeft size={16} />

                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                                <button key={n} onClick={() => { setPage(n); window.scrollTo(0, 0); }}
                                    style={{
                                        padding: "0.5rem 0.85rem", border: `1.5px solid ${page === n ? "#111" : "#ccc"}`, background: page === n ?
                                            "#111" : "#fff", color: page === n ? "#fff" : "#111", fontSize: "0.85rem", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: page === n ? 700 : 400
                                    }}>
                                    {n}
                                </button>

                            ))}
                            <button onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo(0, 0); }}
                                disabled={page === totalPages}
                                style={{
                                    padding: "0.5rem 0.75rem", border: "1.5px solid #ccc", background: "#fff", cursor: page === totalPages ? "not-allowed" : "pointer", color: page === totalPages ? "#ccc" : "#111", display: "flex",
                                    alignItems: "center"
                                }}>
                                <ChevronRight size={16} />

                            </button>
                        </div>
                    )}
                </div>
                );
}

