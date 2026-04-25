import './Home.css';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ExternalLink } from 'lucide-react';
import { useFavourites } from './FavouritesContext';
import products from '../data/products.json';


function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const favourited = isFavourite(product.id);


  const toggleFavourite = (e) => {
    e.stopPropagation();
    if (favourited) {
      removeFavourite(product.id);
    } else {
      addFavourite(product);
    }

  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered ? "4px 4px 0 #111" : "none",
        transform: hovered ? "translate(-2px, -2px)" : "none",
        transition: "box-shadow 0.2s, transform 0.2s"
      }}
    >
      {/* Image */}
      <div className="product-card__image-wrapper">
        <img src={product.image} alt={product.name} className="product-card__image" />

        {/* Eco badge */}
        {product.badge && (
          <span style={{
            position: "absolute", top: "0.6rem", left: "0.6rem",
            background: "#111", color: "#fff",
            fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.25rem 0.55rem"
          }}>{product.badge}</span>
        )}

        {/* Heart icon */}
        <button onClick={toggleFavourite} className="product-card__heart" title={favourited ? "Remove from Favourites" : "Add to Favourites"}>
          <Heart size={18} fill={favourited ? "#111" : "none"} stroke="#111" />

        </button>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <span className="product-card__brand">{product.brand}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__footer">
          <span className="product-card__price">£{product.price}</span>

          {product.url && (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="product-card__visit"
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

function Home() {
  const featuredRef = useRef(null);
  const moreRef = useRef(null);

  const scroll = (ref, direction) => {
    if (!ref.current) return;
    const card = ref.current.querySelector('.product-card');
    if (!card) return;
    const productWidth = card.offsetWidth + 16;
    const scrollAmount = direction === 'left' ? -productWidth : productWidth;
    ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Products using JSON data
  const featuredProducts = products.slice(0, 8);
  const moreProducts = products.slice(8, 16);

  return (
    <main className="home-container">
      {/* Hero */}
      <section className="hero">
        <img className="hero-image" src="/images/hero.jpg" alt="Hero Banner" />
        <div className="hero-overlay">
          <Link to="/products">
            <button className="hero-button">Shop Now</button>
          </Link>
        </div>
      </section>


      {/* Featured Products*/}
      <section className="horizontal-products">
        <h2>Featured Products</h2>

        <button
          className="scroll-btn left"
          onClick={() => scroll(featuredRef, 'left')}
        >
          ‹
        </button>

        <div className="product-row" ref={featuredRef}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll(featuredRef, 'right')}>›</button>
      </section>

      {/* More Products */}
      <section className="horizontal-products">
        <h2>More Products</h2>

        <button
          className="scroll-btn left"
          onClick={() => scroll(moreRef, 'left')}
        >
          ‹
        </button>
        <div className="product-row" ref={moreRef}>
          {moreProducts.map((product) => (

            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll(moreRef, 'right')}>›</button>
      </section>
    </main>
  );
}

export default Home;
