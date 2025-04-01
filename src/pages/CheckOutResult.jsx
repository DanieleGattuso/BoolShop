import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CheckoutResponse() {

    const [sessionId, setSessionId] = useState(localStorage.getItem("sessionId"));
    const [sessionData, setSessionData] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/stripes/v1/checkout/sessions/${sessionId}`)
            .then((res) => setSessionData(res.data), localStorage.removeItem("sessionId"))
            .catch((err) => console.error(err));
    }, [sessionId]);

    useEffect(() => {
        if (!sessionData) return;

        if (sessionData.status === "complete") {
            axios.post(`http://localhost:3000/api/orders/${sessionData.metadata.orderId}`, {
            })
                .then((res) => console.log("Ordine confermato:", res.data))
                .catch((err) => console.error("Errore nella conferma ordine:", err));
        }

        if (sessionData.status === "failed") {
            axios.post("http://localhost:3000/api/orders/failed", {
            })
                .then((res) => console.log("Pagamento fallito:", res.data))
                .catch((err) => console.error("Errore nella gestione del pagamento fallito:", err));
        }
    }, [sessionData]);

    console.log(sessionData.metadata.orderId);

    if (!sessionData) {
        return <p>Caricamento...</p>;
    }

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