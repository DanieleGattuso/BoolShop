import styles from "../pages/ShoppingBagPage.module.css";
import { useEffect, useState, useContext } from "react";
import WineContext from "../context/WineContext";

export default function ShoppingBagPage() {

    const { wines } = useContext(WineContext);

    // get cart data from localStorage
    const [winesId, setwinesId] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // save cart data back to localStorage whenever winesId changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(winesId));
    }, [winesId]);

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

    const cart = countWinesById(winesId);

    // function to update the quantity in the cart (increment or decrement)
    const quantityButton = (id, qtyChange) => {
        setwinesId(prevCart => {
            let newCart = [...prevCart];

            if (qtyChange === 1) {
                // add one more product with the same ID
                newCart.push({ id });
            } else {
                // remove one product with the given ID
                const index = newCart.findIndex(item => item.id === id);
                if (index !== -1) {
                    newCart.splice(index, 1);
                }
            }

            return newCart;
        });
    };

    // render card only for FE
    const renderCart = wines
        .filter(wine => cart.some(item => item.wine_id === wine.id)) // filter wines that are in the cart
        .map(wine => {
            const item = cart.find(item => item.wine_id === wine.id);
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
                                    <button onClick={() => quantityButton(item.id, -1)}>-</button>
                                    {item.quantity}
                                    <button onClick={() => quantityButton(item.id, 1)}>+</button>
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
            </table>

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
        </>
    );
}