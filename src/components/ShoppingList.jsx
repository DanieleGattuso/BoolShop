import styles from "../pages/ShoppingBagPage.module.css";
import ShoppingCard from "../components/ShoppingCard";
import { useEffect, useContext, } from "react";
import { Link } from "react-router-dom";

import WineContext from "../context/WineContext";

export default function ShoppingList() {
    const { wines, cart, setCart, cartPair, setCartPair } = useContext(WineContext);

    // get cart data from localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
        setCartPair(countWinesById(storedCart));
    }, []);

    // save cart data back to localStorage whenever winesId changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    // function to count the quantity of each item in the array
    function countWinesById(array) {
        const groupItems = array.reduce((acc, item) => {
            acc[item.id] = (acc[item.id] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(groupItems).map(id => ({
            wine_id: Number(id),
            quantity: groupItems[id]
        }));
    }

    // function to update the quantity in the cart (increment or decrement)
    const quantityButton = (id, qtyChange) => {
        setCart(prevCart => {
            let newCart = [...prevCart];

            if (qtyChange === 1) {
                // add one more product with the same ID
                newCart.push({ id });
            }

            else if (qtyChange === -1) {
                // remove one product with the given ID
                const index = newCart.findIndex(item => item.id === id);
                if (index !== -1) {
                    newCart.splice(index, 1);
                }
            }
            else if (qtyChange === 0) {
                // remove all products with the given ID
                newCart = newCart.filter(item => item.id !== id);
            }

            // Aggiorna sia `cart` che `cartPair`
            setCartPair(countWinesById(newCart));
            return newCart;
        });
    };

    // const cartPair = countWinesById(cart);

    // render card only for FE
    const renderCart = wines
        .filter(wine => cartPair.some(item => item.wine_id === wine.id)) // filter wines that are in the cart
        .map(wine => {
            const item = cartPair.find(item => item.wine_id === wine.id);
            return {
                ...wine,
                quantity: item.quantity
            };
        });

    console.log('queste sono le render cart', renderCart)

    return (
        <>
            <div className="container">
                {/* shopping bag list*/}
                <div className={`row ${styles.table_header}`}>
                    {/* Prodotto */}
                    <div className="col-4">
                        <h6>PRODOTTO</h6>
                    </div>
                    {/* Quantità */}
                    <div className="col-4">
                        <h6>QUANTITA</h6>
                    </div>
                    {/* Prezzo articolo */}
                    <div className="col-2">
                        <h6>PREZZO ARTICOLO</h6>
                    </div>
                    {/* Totale */}
                    <div className="col-2">
                        <h6>TOTALE</h6>
                    </div>
                </div>
                {/* inizio LISTA ARTICOLI */}
                <div className="row">
                    {/* shopping bag card */}
                    <div className="col">
                        <ShoppingCard
                            renderCart={renderCart}
                            quantityButton={quantityButton}
                        />
                    </div>
                </div>
            </div >


            {/* riga inferiore */}
            < div className="row" >
                {/* colonna di sinistra */}
                < div className="col-5" >
                    da inserire il logo
                </div >
                {/* colonna di destra */}
                < div className="col-7" >
                    <div className={`${"row"} ${styles.summary_row}`}>
                        <div className="col">Totale Imponibile</div>
                        <div className={`${"col"} ${styles.summary_col}`}>
                            {renderCart
                                .reduce((acc, item) => acc + (item.discount_price !== null ? Number(item.discount_price) : Number(item.price)) * item.quantity, 0)
                                .toFixed(2)}€ {/* total amount excluding tax */}</div>
                    </div>
                    <div className={`${"row"} ${styles.summary_row}`}>
                        <div className="col">Tasse</div>
                        <div className={`${"col"} ${styles.summary_col}`}>Incluse</div>
                    </div>
                    <div className={`${"row"} ${styles.summary_row}`}>
                        <div className="col">Spedizione</div>
                        <div className={`${"col"} ${styles.summary_col}`}>GRATUITA</div>
                    </div>
                    <div className={`${"row"} ${styles.summary_row}`}>
                        <div className="col">Totale</div>
                        <div className={`${"col"} ${styles.summary_col}`}>
                            {renderCart
                                .reduce((acc, item) => acc + (item.discount_price !== null ? Number(item.discount_price) : Number(item.price)) * item.quantity, 0)
                                .toFixed(2)}€ {/* final total price */}
                        </div>
                    </div>
                </div >

            </div >

            {/* procedi al checkout */}

            < div className={styles.checkout_box} >
                <Link to="/checkoutpage">Procedi al checkout</Link>
            </div >
        </>
    )
}