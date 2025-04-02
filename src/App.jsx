import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Import context
import WineContext from "./context/WineContext";

// Import default layout
import DefaultLayout from './layout/DefaultLayout';

// Import pages
import HomePage from "./pages/HomePage";
import ShoppingBagPage from "./pages/ShoppingBagPage";
import CheckoutResult from "./pages/CheckOutResult";
import Winespage from "./pages/WinePage";
import CheckoutPage from "./pages/CheckoutPage";
import WineDetailsPage from "./pages/WineDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutUsPage from "./pages/AboutUsPage";

// Import component 
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const [wines, setWines] = useState([]);

  useEffect(() => {
    fetchWines();
  }, []);

  function fetchWines() {
    axios.get('http://localhost:3000/api/wines')
      .then(res => setWines(res.data))
      .catch(err => console.log(err));
  }

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartPair, setCartPair] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <WineContext.Provider value={{ wines, setWines, cart, setCart, cartPair, setCartPair }}>
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/winespage" element={<Winespage />} />
              <Route path="/winedetails/:slug" element={<WineDetailsPage />} />
              <Route path="/shopping-bag" element={<ShoppingBagPage />} />
              <Route path="/checkoutpage" element={<CheckoutPage />} />
              <Route path="/check-out-success" element={<CheckoutResult />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/aboutuspage" element={<AboutUsPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </WineContext.Provider>
    </>
  );
}


