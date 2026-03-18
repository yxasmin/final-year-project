import './Home.css';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ExternalLink} from 'lucide-react';
import { useFavourites} from './FavouritesContext';

const PRODUCT_URLS = {
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
            position:"absolute", top:"0.6rem", left: "0.6rem",
            background: "#111", color: "#fff",
            fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.25rem 0.55rem" }}>{product.badge}</span>
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

          {PRODUCT_URLS[product.id] && (
              <a
                href={PRODUCT_URLS[product.id]}
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
    if(!card) return;
    const productWidth = card.offsetWidth + 16;
    const scrollAmount = direction === 'left' ? -productWidth : productWidth;
    ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth'});
  };

//Product data
const featuredProducts = [
  {
    id: "h1",
    brand: "Topicals",
    name: "Slick Salve Lip Balm - Mint",
    price: "14",
    image: "/images/product1.png",
    badge: "Ethical",
    sustainability: 4
  },
  {
    id: "h2",
    brand: "Alysium Beauty",
    name: "Soothing Natural Glow Facial Cream",
    price: "6.99",
    image: "/images/product2.png",
    badge: "Natural",
    sustainability: 4

  },
  { 
    id: "h3",
    brand: "Lush",
    name: "Twilight",
    price: "5.50",
    image: "/images/product3.png", 
    badge: "Organic",
    sustainability: 5
  },
  {
    id: "h4",
    brand: "Breromi",
    name: "Star Clique™",
    price: "35",
    image: "/images/product4.png", 
    badge: "Recycled",
    sustainability: 3
},
{   
    id: "h5",
    brand: "Ethereal Treasures",
    name: "Patterned Gold Watch",
    price: "45",
    image: "/images/product5.png",
    badge: "Ethical",
    sustainability: 4
},
{   
    id: "h6",
    brand: "Reverie Vintage",
    name: "Midnight Spell Dress",
    price: "79",
    image: "/images/product6.png", 
    badge: "Upcycled",
    sustainability: 5
},

{
    id: "h7",
    brand: "97heaven",
    name: "stripe heeled boots",
    price: "10",
    image: "/images/product7.png",
    badge: "Ethical",
    sustainability: 3

},
{
    id: "h8",
    brand: "Aromatica",
    name: "Rosemary Root Enhancer",
    price: "12.60",
    image: "/images/product8.png",
    badge: "Natural", 
    sustainability: 4
},

];

const moreProducts = [
  {
    id: "h9",
    brand: "Topicals",
    name:"Faded Brightening Cleansing Bar",
    price: "25",
    image:"/images/product9.png",
    badge: "Natural",
    sustainability: 4
  },
   {
    id: "h10",
    brand: "Lush",
    name:"Skin Drink",
    price: "28",
    image:"/images/product10.png",
    badge: "Organic",
    sustainability: 5
  },
   {
    id:"h11",
    brand: "Ethereal Treasures",
    name:"Sterling Silver Amethyst Watch",
    price: "65",
    image:"/images/product11.png",
    badge:"Ethical",
    sustainability: 4
  },
    {
    id:"h12",
    brand: "97heaven",
    name:"cord midi skirt",
    price: "5",
    image:"/images/product12.png",
    badge:"Recycled",
    sustainability: 4
  },
    {
    id:"h13",
    brand: "Maison Awra",
    name:"Sakura Set",
    price: "65",
    image:"/images/product13.png",
    badge: "Upcycled",
    sustainability: 5
  },
    {
    id:"h14",
    brand: "Lush",
    name:"Sticky Dates Solid Perfume",
    price: "12",
    image:"/images/product14.png",
    badge: "Organic",
    sustainability: 5
  },
    {
    id:"h15",
    brand: "Yes Friends",
    name:"Wide Jeans",
    price: "25",
    image:"/images/product15.png",
    badge:"Organic",
    sustainability: 5
  },
    {
    id:"h16",
    brand: "BobaMate",
    name:"Reusable Boba Cup",
    price: "18.44",
    image:"/images/product16.png",
    badge:"Recycled",
    sustainability: 5
    },
  ];

  return (
    <main className="home-container">
    {/* Hero Section */}
    <section className="hero">
      <img
      className="hero-image"
      src="/images/hero.jpg"
      alt="Hero Banner"
      />
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
           <ProductCard key = {product.id} product = {product} />
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
        {moreProducts.map((product) =>(
          
           <ProductCard key ={product.id} product={product} />
        ))}
      </div>
      <button className="scroll-btn right" onClick={() => scroll(moreRef, 'right')}>›</button>
      </section>
      </main>
  );
}

export default Home;
