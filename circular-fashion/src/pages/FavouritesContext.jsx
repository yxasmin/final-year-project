import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const FavouritesContext = createContext();

//Provider wraps the app and shares favourites state
export function FavouritesProvider({ children }) {

    //Load from localStorage on first render
    const [favourites, setFavourites] = useState(() => {
        try {
            const stored = localStorage.getItem("favourites");
            return stored ? JSON.parse(stored) : [];

        } catch {
            return [];
        }
});

    //Save to localStorage whenever favourites changes
    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);

        const addFavourite = (product) => {
            setFavourites(prev => {
                if (prev.find(p => p.id === product.id))
                    return prev;
                  return [...prev, product];
                  
                });
        };
        const removeFavourite = (productId) => {
            setFavourites(prev => prev.filter(p => p.id !== productId));
        };
        
        const isFavourite = (productId) => {
            return favourites.some(p => p.id === productId);
        };

        return (
            <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourite}}>
                {children}
            </FavouritesContext.Provider>
        );
    }

    // Custom hook for easy access
export function useFavourites() {
    return useContext(FavouritesContext);
    
        }