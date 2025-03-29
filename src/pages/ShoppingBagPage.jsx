import styles from "../pages/ShoppingBagPage.module.css";
import { useEffect, useState, useContext, } from "react";
import { Link } from "react-router-dom";
import WineContext from "../context/WineContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ShoppingBagPage() {

    const { wines, cart, setCart, cartPair, setCartPair } = useContext(WineContext);

    // get cart data from localStorage
    useEffect(() => { setCart(JSON.parse(localStorage.getItem("cart")) || []); }, []);
    //     const savedCart = localStorage.getItem("cart");
    //     return savedCart ? JSON.parse(savedCart) : [];
    // });


    // save cart data back to localStorage whenever winesId changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        setCartPair(countWinesById(cart));
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

    // const cartPair = countWinesById(cart);

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
    console.log('queste sono le render cart', renderCart)
    // RENDER
    return (
        <>
            <table className="table text-center ">
                <thead className="">
                    <tr>
                        <th scope="col">PRODOTTO</th>
                        <th scope="col">QUANTITA</th>
                        <th scope="col">PREZZO ARTICOLO</th>
                        <th scope="col">TOTALE</th>
                    </tr>
                </thead >
                <tbody>
                    {renderCart.map(item => {
                        const hasDiscount = item.discount_price !== null; // check if discount exists
                        const originalPrice = Number(item.price); // convert price to number
                        const finalPrice = hasDiscount ? Number(item.discount_price) : originalPrice;
                        // use discount price if available

                        return (
                            <tr key={item.id}>
                                <td>

                                    <div className={styles.table_product}>
                                        <div className={styles.table_image}>
                                            <img src={item.image} alt="" />
                                        </div>
                                        <div>
                                            {item.name}
                                        </div>
                                    </div>
                                </td>
                                <td >
                                    <div className={styles.box_quantity}>
                                        <div className={styles.quantity}>
                                            {/* pulsante per rimuovere una quantità */}

                                            <button
                                                className={styles.quantitybtn}
                                                disabled={item.quantity === 1}
                                                onClick={() => quantityButton(item.id, -1)}
                                            >
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                            {/* numero quantita */}
                                            <span className="fw-bold px-2">{item.quantity}</span>

                                            {/* pulsante per aggiungere una quantità */}
                                            <button
                                                className={styles.quantitybtn}
                                                disabled={item.quantity >= item.quantity_in_stock}
                                                onClick={() => quantityButton(item.id, 1)}
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>

                                        <button className={styles.trash}
                                            onClick={() => quantityButton(item.id, 0)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>

                                </td>
                                <td>
                                    {hasDiscount ? (
                                        <>
                                            <s>{originalPrice.toFixed(2)}€</s>
                                            <span>
                                                {finalPrice.toFixed(2)}€
                                            </span>
                                        </>
                                    ) : (
                                        `${finalPrice.toFixed(2)}€`
                                    )}
                                </td>
                                <td>{(finalPrice * item.quantity).toFixed(2)}€</td> {/* calculate total price */}
                            </tr>
                        )
                    })}
                </tbody>
            </table >

            {/* riga inferiore */}
            <div className="row">
                {/* colonna di sinistra */}
                <div className="col-5">
                    da inserire il logo
                </div>
                {/* colonna di destra */}
                <div className="col-7">
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
                </div>

            </div >

            {/* procedi al checkout */}

            < div className={styles.checkout_box} >
                <Link to="/checkoutpage">Procedi al checkout</Link>
            </div >


        </>
    );
}