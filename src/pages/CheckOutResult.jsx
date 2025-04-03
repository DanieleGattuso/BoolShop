import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./CheckOutResult.module.css"
import wineContext from "../context/WineContext";

export default function CheckoutResponse() {

    const { setCart, setCartPair } = useContext(wineContext)

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
                    setCart([])
                    setCartPair([])
                    localStorage.removeItem("cart")
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
        <div className={`container ${styles.checkoutContainer}`}>
            <div className="row">
                <div className="col">
                    <div className={`card ${styles.checkoutCard}`}>
                        <div className={`card-body  ${styles.checkoutCard}`}>
                            <h2 className={styles.title}>Il tuo ordine è stato aggiornato!</h2>
                            {sessionData.status === "complete" ? (
                                <>
                                    <p className={styles.success}>Pagamento completato</p>
                                    <p>L'ordine verrà spedito a:</p>
                                    <p><strong>{sessionData.customer_details.name}</strong></p>
                                    <p>Email: {sessionData.customer_details.email}</p>
                                    <p>Telefono: {sessionData.customer_details.phone || "Telefono non fornito"}</p>
                                    <p>Indirizzo: {sessionData.customer_details.address?.line1 || "Indirizzo non disponibile"}</p>
                                    <p>CAP: {sessionData.customer_details.address?.postal_code || "CAP non disponibile"}</p>
                                    <p>Paese: {sessionData.customer_details.address?.country || "Paese non disponibile"}</p>
                                    <h2 className={styles.totalTitle}>Il totale pagato:</h2>
                                    <p className={styles.totalAmount}>{(sessionData.amount_total / 100).toFixed(2)}€</p>
                                </>
                            ) : (
                                <p className={styles.error}>
                                    Pagamento rifiutato, <Link to="/">torna allo shop.</Link>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}