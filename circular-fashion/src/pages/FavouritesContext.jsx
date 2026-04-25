import { createContext, useContext, useState, useEffect } from "react";
import productsData from "../data/products.json";
import api from "../api";

// Create the context
const FavouritesContext = createContext();


//Provider wraps the app and shares favourites state
export function FavouritesProvider({ children }) {

    // if logged in, start empty and wait for backend
    const [favourites, setFavourites] = useState(() => {
        try {
            const token = localStorage.getItem("accessToken");
            if (token) return [];
            const stored = localStorage.getItem("favourites");
            return stored ? JSON.parse(stored) : [];

        } catch {
            return [];
        }
   });

   //track loading state
   const [loadingFavourites, setLoadingFavourites] = useState(!!localStorage.getItem("accessToken"));
   useEffect(() => {
        const handleFetch = () => {
            const token = localStorage.getItem("accessToken");
            if(!token) return;
       
        api.get("/favourites/")
          .then(res => res.ok ? res.json() : Promise.reject())
          .then(savedIds => {
            const backendFavourites = savedIds
              .map(id => productsData.find(p => p.id === id))
              .filter(Boolean);
            
            setFavourites(prev => {
              const merged = [...backendFavourites];
              prev.forEach(p => {
                if(!merged.find(m => m.id === p.id)) {
                    merged.push(p);
                    api.post("/favourites/", {product_id: p.id});
                }
              });
              return merged;
            })
            setLoadingFavourites(false);
          })
          .catch(() => setLoadingFavourites(false));
        }; 
    //handles case where user is already logged in
    handleFetch();
    
    window.addEventListener("userLoggedIn", handleFetch);
    return () => window.removeEventListener("userLoggedIn", handleFetch);
  }, []);
  
  //keep localStorage in sync
  useEffect(() => {
      localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);
  
  const addFavourite = (product) => {
      setFavourites((prev) => 
        prev.find((p) => p.id === product.id) ? prev : [...prev, product]
  );

  const token = localStorage.getItem("accessToken");
  
  if (token) {
      api.post("/favourites/", { product_id: product.id });
  }

};

const removeFavourite = (productId) => {
    setFavourites((prev) => prev.filter((p) => p.id !== productId));

    const token = localStorage.getItem("accessToken");

    // Only call backend if logged in
    if (token) {
        api.delete("/favourites/", {product_id: productId });
    }
};

  
   const isFavourite = (productId) => favourites.some(p => p.id === productId);

   return (
       <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourite, loadingFavourites }}>
           {children}
       </FavouritesContext.Provider>
    );
}

export const useFavourites= () => useContext(FavouritesContext);

