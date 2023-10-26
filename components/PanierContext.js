import { createContext, useState, useEffect } from "react"

export const PanierContext = createContext({});

export function PanierContextFournisseur({ children }) {
  //garder la quantité dans le panier même après reload la page
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [oeuvresPanier, setOeuvresPanier] = useState([]);
  useEffect(() => {
    if (oeuvresPanier?.length > 0) {
      ls?.setItem("panier", JSON.stringify(oeuvresPanier));
    }
  }, [oeuvresPanier]);
  useEffect(() => {
    if (ls && ls.getItem('panier')) {
      setOeuvresPanier(JSON.parse(ls.getItem('panier')))
    }
  }, []);
  function ajouterOeuvre(idOeuvre) {
    setOeuvresPanier(prev => [...prev, idOeuvre]);
  }

  function enleverOeuvre(idOeuvre) {
    setOeuvresPanier(prev => {
      const pos = prev.indexOf(idOeuvre);
      if (pos !== -1) {
        // Vérifiez si la quantité est supérieure à 1 avant de la diminuer
        if (prev.filter(oeuvreId => oeuvreId === idOeuvre).length >= 1) {
          const updatedPanier = prev.slice();  // Fait une copie du panier
          updatedPanier.splice(pos, 1);  // Supprime l'élément à la position pos
          ls?.setItem("panier", JSON.stringify(updatedPanier));  // Met à jour le localStorage
          return updatedPanier;
        }
      }
      return prev;
    });
  }
  
  function viderPanier() {
    ls?.removeItem("panier");
    setOeuvresPanier([]);
  }
  return (
    <PanierContext.Provider
      value={{ oeuvresPanier, setOeuvresPanier, ajouterOeuvre, enleverOeuvre, viderPanier }}
    >
      {children}
    </PanierContext.Provider>
  );
}
