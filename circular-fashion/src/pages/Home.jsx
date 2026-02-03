import './Home.css';
import { useRef } from 'react';

function Home() {
  const featuredRef = useRef(null);
  const moreRef = useRef(null);

  //Scroll one product at a time
  const scroll = (ref, direction) => {
    if(!ref.current) return;

    const card = ref.current.querySelector('.product-card');
    if (!card) return;

    const productWidth = card.offsetWidth + 16;
    const scrollAmount = direction ==='left' ? -productWidth : productWidth;

    ref.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
  });
};

//Product data
const featuredProducts = [
  {
    brand: "Topicals",
    name: "Slick Salve Lip Balm - Mint",
    price: "14",
    image: "/images/product1.png",

  },
  {
    brand: "Alysium Beauty",
    name: "Soothing Natural Glow Facial Cream",
    price: "6.99",
    image: "/images/product2.png",

  },
  {
    brand: "Lush",
    name: "Watermelon Slice Soap",
    price: "6",
    image: "/images/product3.png", 
  },
  {
    brand: "Breromi",
    name: "Heart Clique Medium",
    price: "30",
    image: "/images/product4.png", 
},
{
    brand: "Ethereal Treasures",
    name: "Dainty Gold Watch",
    price: "45",
    image: "/images/product5.png", 
},
{
    brand: "Reverie Vintage",
    name: "Midnight Spell Dress",
    price: "79",
    image: "/images/product6.png", 
},

{
    brand: "97heaven",
    name: "kitten heels",
    price: "30",
    image: "/images/product7.png",

},
{
    brand: "Aromatica",
    name: "Rosemary Root Enhancer",
    price: "12.60",
    image: "/images/product8.png",
},

];

const moreProducts = [
  {
    brand: "Topicals",
    name:"Faded Brightening Cleansing Bar",
    price: "25",
    image:"/images/product9.png"
  },
   {
    brand: "Lush",
    name:"Skin Drink",
    price: "28",
    image:"/images/product10.png"
  },
   {
    brand: "Ethereal Treasures",
    name:"Sterling Silver Amethyst Watch",
    price: "65",
    image:"/images/product11.png"
  },
    {
    brand: "97heaven",
    name:"office core trousers",
    price: "10",
    image:"/images/product12.png"
  },
    {
    brand: "Maison Awra",
    name:"Sakura Set",
    price: "65",
    image:"/images/product13.png"
  },
    {
    brand: "Lush",
    name:"Sticky Dates Solid Perfume",
    price: "12",
    image:"/images/product14.png"
  },
    {
    brand: "Yes Friends",
    name:"Wide Jeans",
    price: "25",
    image:"/images/product15.png"
  },
    {
    brand: "Yes Friends",
    name:"Beanie",
    price: "7",
    image:"/images/product16.png"
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
      <button className="hero-button">Shop Now</button>
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
          {featuredProducts.map((product, index) => (
            <div key={index} className="product-card">
              <img src={product.image} alt={product.name}/>
              <h3>{product.name}</h3>
              <p>£{product.price}</p>
  
         </div>
          ))}
          </div>

          <button
          className="scroll-btn right"
          onClick={() => scroll(featuredRef, 'right')}
          >
          ›

          </button>
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
        {moreProducts.map((product, index) =>(
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>£{product.price}</p>
            </div>
        ))}
      </div>

      <button
        className="scroll-btn right"
        onClick={() => scroll(moreRef, 'right')}
        >
         › 
        </button>
    </section>

  
    </main>
  );
}

export default Home;