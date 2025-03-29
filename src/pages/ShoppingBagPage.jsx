import styles from "../pages/ShoppingBagPage.module.css";
import { useEffect, useState, useContext, } from "react";
import { Link } from "react-router-dom";
import WineContext from "../context/WineContext";


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

    // RENDER
    return (
        <>
            <table className={styles}>
                <thead>
                    <tr>
                        <th>Prodotto</th>
                        <th>Quantità</th>
                        <th>Prezzo Unitario</th>
                        <th>Prezzo Totale</th>
                    </tr>
                </thead>

                <tbody>
                    {renderCart.map(item => {
                        const hasDiscount = item.discount_price !== null; // check if discount exists
                        const originalPrice = Number(item.price); // convert price to number
                        const finalPrice = hasDiscount ? Number(item.discount_price) : originalPrice; // use discount price if available

                        return (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    <button disabled={item.quantity === 1} onClick={() => quantityButton(item.id, -1)}>-</button>
                                    {item.quantity}
                                    <button disabled={item.quantity >= item.quantity_in_stock} onClick={() => quantityButton(item.id, 1)}>+</button>
                                    <button onClick={() => { quantityButton(item.id, 0) }}> cestino</button>
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
                        );
                    })}
                </tbody>
            </table >

            <table className={styles}>
                <tr>
                    <td>Totale Imponibile</td>
                    <td>
                        {renderCart
                            .reduce((acc, item) => acc + (item.discount_price !== null ? Number(item.discount_price) : Number(item.price)) * item.quantity, 0)
                            .toFixed(2)}€ {/* total amount excluding tax */}
                    </td>
                </tr>
                <tr>
                    <td>Tasse</td>
                    <td>Incluse</td> {/* taxes included */}
                </tr>
                <tr>
                    <td>Spedizione</td>
                    <td>GRATUITA</td> {/* free shipping */}
                </tr>
                <tr>
                    <td>Totale</td>
                    <td>
                        {renderCart
                            .reduce((acc, item) => acc + (item.discount_price !== null ? Number(item.discount_price) : Number(item.price)) * item.quantity, 0)
                            .toFixed(2)}€ {/* final total price */}
                    </td>
                </tr>
            </table>

            {/* procedi al checkout */}

            <div className={styles.checkoutButton}>
                <Link to="/checkoutpage">Procedi al checkout</Link>
            </div>


        </>
    );
}