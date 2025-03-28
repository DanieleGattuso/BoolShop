// Import manage route from module react-router
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

// Import context
import WineContext from "./context/WineContext";

// Import default layout
import DefaultLayout from './layout/DefaultLayout'

// Import pages
import HomePage from "./pages/HomePage"
import ShoppingBagPage from "./pages/ShoppingBagPage"

// Import wine page
import Winespage from "./pages/WinePage"
import CheckoutPage from "./pages/CheckOutPage"
import WineDetailsPage from "./pages/WineDetailsPage"



export default function App() {

  // State per tutti i vini e per i bestseller
  const [wines, setWines] = useState([]);

  // useEffect per effettuare le chiamate API una sola volta al mount del componente
  useEffect(() => {
    fetchWines();
  }, []);

  useEffect(() => {
    console.log(wines);
  }, [wines]);

  // Funzione per recuperare tutti i vini
  function fetchWines() {
    axios.get('http://localhost:3000/api/wines')
      .then(res => setWines(res.data))
      .catch(err => console.log(err));
  }


  // ---------------------- carrello -------------------------
  // da modificare il nome della variabile
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  // ------------------------------------------------------


  return (
    <>
      <WineContext.Provider value={{ wines, setWines, cart, setCart }}>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/winespage" element={<Winespage />} />
              <Route path="/winedetails" element={<WineDetailsPage />} />
              {/* provvisoria */}
              <Route path="/checkoutpage" element={<CheckoutPage />} />
              <Route path="/shopping-bag" element={< ShoppingBagPage />} />

            </Route>
          </Routes>
        </BrowserRouter >
      </WineContext.Provider>
    </>
  )
}


