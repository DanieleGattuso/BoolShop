import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function CheckoutResponse() {
    const [sessionId, setSessionId] = useState(localStorage.getItem("sessionId"))
    const [sessionData, setSessionData] = useState(null);


    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/stripes/v1/checkout/sessions/${sessionId}`)
            .then((res) => console.log(res.data))
            .catch((err) => console.error(err));
    }, [sessionId]);

    // console.log(sessionData)

    if (!sessionData) {
        return <p>Caricamento...</p>;
    }


    return (
        <section>
            <h2>Il tuo ordine è stato aggiornato!</h2>
            {/* {.is_complete === 1 ? (
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
            )} */}
        </section>
    );
}