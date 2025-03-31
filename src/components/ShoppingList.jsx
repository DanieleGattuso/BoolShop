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

    // Calcola il totale
    const totalAmount = renderCart
        .reduce((acc, { discount_price, price, quantity }) => acc + (discount_price || price) * quantity, 0)
        .toFixed(2);

    console.log('queste sono le render cart', renderCart)

    return (
        <>
            <div className={`container ${styles.box}`}>
                {/* shopping bag list*/}
                <div className={`row ${styles.table_header}`}>
                    <div className="col-6"><h6 className={styles.header_product}>PRODOTTO</h6></div>
                    <div className="col-3"><h6>QUANTITÀ</h6></div>
                    <div className="col-3"><h6>PREZZO</h6></div>
                </div>

                {/* box card */}
                <div className={styles.cards_box}>
                    <ShoppingCard renderCart={renderCart} quantityButton={quantityButton} />
                </div>



                {/* riga inferiore */}
                <div className="row mt-3">
                    <div className="col-5">da inserire il logo</div>
                    <div className="col-7">
                        <div className={`row ${styles.summary_row}`}>
                            <div className="col">Totale Imponibile</div>
                            <div className={`col ${styles.summary_col}`}>{totalAmount}€</div>
                        </div>
                        <div className={`row ${styles.summary_row}`}>
                            <div className="col">Tasse</div>
                            <div className={`col ${styles.summary_col}`}>Incluse</div>
                        </div>
                        <div className={`row ${styles.summary_row}`}>
                            <div className="col">Spedizione</div>
                            <div className={`col ${styles.summary_col}`}>GRATUITA</div>
                        </div>
                        <div className={`row ${styles.summary_row}`}>
                            <div className="col">Totale</div>
                            <div className={`col ${styles.summary_col}`}>{totalAmount}€</div>
                        </div>
                    </div>
                </div>

                {/* procedi al checkout */}

                <div className={styles.checkout_box} >
                    <Link to="/checkoutpage">Procedi al checkout</Link>
                </div >
            </div >
        </>
    )
}
