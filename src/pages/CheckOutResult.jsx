import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CheckoutResponse() {

    const [sessionId, setSessionId] = useState(localStorage.getItem("sessionId"));
    const [sessionData, setSessionData] = useState([]);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/stripes/v1/checkout/sessions/${sessionId}`);
                setSessionData(res.data);

                console.log(res.data);
                if (res.data?.status === "complete") {
                    await axios.patch(`http://localhost:3000/api/orders/order-success/${res.data.metadata.orderId}`);
                    console.log("Ordine confermato");
                } else if (res.data?.status === "open") {
                    await axios.patch(`http://localhost:3000/api/orders/order-cancelled/${res.data.metadata.orderId}`);
                    console.log("Ordine cancellato");
                }
            } catch (err) {
                console.error("Errore:", err);
            }
        };

        if (sessionId) {
            fetchSession();
        }
    }, [sessionId]);

    return (
        <section>
            <h2>Il tuo ordine è stato aggiornato!</h2>
            {sessionData.status === "complete" ? (
                <>
                    <p>Pagamento completato</p>
                    <p>L'ordine verrà spedito a:</p>
                    <p>{sessionData.customer_details.name}</p>
                    <p>{sessionData.customer_details.email}</p>
                    <p>{sessionData.customer_details.phone || "Telefono non fornito"}</p>
                    <p>{sessionData.customer_details.address?.line1 || "Indirizzo non disponibile"}</p>
                    <p>{sessionData.customer_details.address?.postal_code || "CAP non disponibile"}</p>
                    <p>{sessionData.customer_details.address?.country || "Paese non disponibile"}</p>
                    <h2>Il totale pagato:</h2>
                    <p>{(sessionData.amount_total / 100).toFixed(2)}€</p>
                </>
            ) : (
                <p>
                    Pagamento rifiutato, <Link to="/">torna allo shop.</Link>
                </p>
            )}
        </section>
    );
}