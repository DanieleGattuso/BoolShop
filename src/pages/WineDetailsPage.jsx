import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./WineDetailsPage.module.css";

export default function WineDetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // da modificare il nome della variabile
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

    // Recupera il vino passato tramite lo state del navigate
    const wineDetails = location.state?.wine;

    // Se non ci sono dati (es. l’utente ha ricaricato la pagina), torna alla lista
    useEffect(() => {
        if (!wineDetails) {
            navigate("/wines");
        }
    }, []);

    // Se i dati non ci sono ancora, non mostrare nulla
    if (!wineDetails) return null;

    return (
        <>

            <button onClick={() => addToCart({ id: wineDetails.id })}>AGGIUNGI</button>
            <div className={`${styles.hero_section} ${styles[wineDetails.type]}`}>

                <h1 className={styles.background_text}>{wineDetails.name}</h1>
                <img
                    src={wineDetails.image}
                    alt={wineDetails.name}
                    className={styles.bottle}
                />
                <p className={styles.description}>{wineDetails.description}</p>
            </div>
        </>
    );
}
