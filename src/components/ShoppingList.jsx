import styles from "../pages/ShoppingBagPage.module.css";
import ShoppingCard from "../components/ShoppingCard";
import { useContext, } from "react";
import WineContext from "../context/WineContext";

export default function ShoppingList({ renderCart, countWinesById }) {

    // CONTEXT
    const { setCart, setCartPair } = useContext(WineContext);

    // function to update the quantity in the cart (increment or decrement)
    const quantityButton = (id, qtyChange) => {
        // create a new cart array to avoid mutating the previous state
        setCart(prevCart => {
            let newCart = [...prevCart];

            // when clicking the + button, add a product
            if (qtyChange === 1) {
                // add one more product with the same ID
                newCart.push({ id });
            }

            // when clicking the - button, remove a product
            else if (qtyChange === -1) {
                // remove one product with the given ID
                const index = newCart.findIndex(item => item.id === id);
                if (index !== -1) {
                    newCart.splice(index, 1);
                }
            }
            // when clicking the "trash" button, remove all products with the given ID
            else if (qtyChange === 0) {
                // remove all products with the given ID
                newCart = newCart.filter(item => item.id !== id);
            }

            // Aggiorna sia `cart` che `cartPair`
            setCartPair(countWinesById(newCart));
            return newCart;
        });
    };


    return (
        <>
            {/* table header with columns for product, quantity, and price */}
            <div className={`row ${styles.table_header}`}>
                <div className="col-5"><h6>PRODOTTO</h6></div>
                <div className="col-4"><h6>QUANTITÀ</h6></div>
                <div className="col-3"><h6>PREZZO</h6></div>
            </div>

            {/* shopping card */}
            <div className={styles.cards_box}>
                <ShoppingCard renderCart={renderCart} quantityButton={quantityButton} />
            </div>
        </>
    )
}
