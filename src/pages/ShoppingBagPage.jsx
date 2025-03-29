import styles from "../pages/ShoppingBagPage.module.css";
import { useEffect, useState, useContext } from "react";

export default function ShoppingBagPage() {



    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (prodotto) => {
        setCart([...cart, prodotto]);
    };

    const [total, setTotal] = useState(0);

    const cart = [
        { id: wineDetails.id, quantity: 1, price: wineDetails.price, image: wineDetails.image, name: wineDetails.name },
        { id: 4, quantity: 3, price: 19.99, image: "culo", name: "giovanni" },
        { id: 7, quantity: 3, price: 19.99, image: "culo", name: "andrea" },
        { id: 9, quantity: 3, price: 19.99, image: "culo", name: "giulio" },
        { id: 10, quantity: 3, price: 19.99, image: "culo", name: "pino" },
        { id: 13, quantity: 3, price: 19.99, image: "culo", name: "dino" },
    ]

    useEffect(() => {
        const newTotal = cart.reduce((acc, item) => acc + item.quantity * item.prezzo, 0);
        setTotal(newTotal);
    }, [cart]);

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
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>{item.vino}</td>

                            <td>{item.quantity}</td>

                            <td>{item.prezzo.toFixed(2)}€</td>
                            <td>{(item.prezzo * item.quantity).toFixed(2)}€</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <tr><td>Totale Imponibile</td><td>{total.toFixed(2)}€</td></tr>
                <tr><td>Tasse</td><td>Incluse</td></tr>
                <tr><td>Spedizione</td><td>GRATUITA</td></tr>
                <tr><td>Totale</td><td>{total.toFixed(2)}€</td></tr>
            </div>
        </>
    )
}