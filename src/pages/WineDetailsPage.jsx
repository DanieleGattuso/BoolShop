import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./WineDetailsPage.module.css";

export default function WineDetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();

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
        <div className={`${styles.hero_section} ${styles[wineDetails.type]}`}>
            <h1 className={styles.background_text}>{wineDetails.name}</h1>
            <img
                src={wineDetails.image}
                alt={wineDetails.name}
                className={styles.bottle}
            />
            <p className={styles.description}>{wineDetails.description}</p>
        </div>
    );
}
