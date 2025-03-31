import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function CheckoutResponse() {

    const { orderId } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {

        axios
            .get(`http://localhost:3000/api/orders/${orderId}`)
            .then((res) => setOrder(res.data[0]))
            .catch((err) => console.error(err));
    }, [orderId]);

    if (!order) {
        return <p>Caricamento...</p>;
    }

    return (
        <section>
            <h2>Il tuo ordine è stato aggiornato!</h2>
            {order.is_complete === 1 ? (
                <>
                    <p>Pagamento completato</p>
                    <p>L'ordine verrà spedito a:</p>
                    <p>{order.full_name}</p>
                    <p>{order.address}</p>
                    <p>{order.zip_code}</p>
                    <p>{order.country}</p>
                    <h2>Il totale pagato:</h2>
                    <p>{order.total_price}€</p>
                </>
            ) : (
                <p>
                    Pagamento rifiutato, <Link to="/">torna allo shop.</Link>
                </p>
            )}
        </section>
    );
}