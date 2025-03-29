import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import videoBg from '../assets/vinogiusto.mp4';
import greenImage from '../assets/image.png';

export default function HomePage() {
    // State per tutti i vini e per i bestseller
    const [wines, setWines] = useState([]);
    const [bestWines, setBestWines] = useState([]);

    // useEffect per effettuare le chiamate API una sola volta al mount del componente
    useEffect(() => {
        fetchWines();
        fetchBestWines();
    }, []);

    // Funzione per recuperare tutti i vini
    function fetchWines() {
        axios.get('http://localhost:3000/api/wines')
            .then(res => setWines(res.data))
            .catch(err => console.log(err));
    }

    // Funzione per recuperare i vini bestseller
    function fetchBestWines() {
        axios.get('http://localhost:3000/api/wines/limited_stock')
            .then(res => setBestWines(res.data))
            .catch(err => console.log(err));
    }

    // Funzione helper per ottenere un vino tramite id
    function getWineById(id) {
        return wines.find(wine => wine.id === id);
    }

    // Recupero dei vini specifici (per la sezione TOP 2025)
    const redWine = getWineById(7);
    const whiteWine = getWineById(21);
    const roseWine = getWineById(35);

    // Se i vini non sono ancora stati caricati, mostra un messaggio di caricamento
    if (!redWine || !whiteWine || !roseWine) {
        return <div>Caricamento vini...</div>;
    }

    return (
        <>
            {/* Sezione Hero con video di sfondo */}
            <div className={styles.homepage_video}>
                <video autoPlay loop muted playsInline>
                    <source src={videoBg} type="video/mp4" />
                </video>
                <div className={styles.overlay_content}>
                    <h1>Siamo troppo forti</h1>
                </div>
            </div>

            {/* Sezione TOP 2025 */}
            <div className={styles.best_seller_title}>
                <h1>I NOSTRI TOP 2025</h1>
            </div>
            <div className={styles.best_seller_container}>
                {/* Contenitore per il vino rosso */}
                <div className={styles.best_red_wine_container}>
                    <div className={styles.wine_image_container}>
                        <img src={redWine.image} alt={redWine.name} />
                    </div>
                    <div className={styles.wine_container_traits}>
                        {redWine.traits.split(',').map((trait, index) => (
                            <p key={index}>{trait.trim().toUpperCase()}</p>
                        ))}
                    </div>
                </div>

                {/* Contenitore per il vino bianco */}
                <div className={styles.best_white_wine_container}>
                    <div className={styles.wine_image_container}>
                        <img src={whiteWine.image} alt={whiteWine.name} />
                    </div>
                    <div className={styles.wine_container_traits}>
                        {whiteWine.traits.split(',').map((trait, index) => (
                            <p key={index}>{trait.trim().toUpperCase()}</p>
                        ))}
                    </div>
                </div>

                {/* Contenitore per il vino rosato */}
                <div className={styles.best_rose_wine_container}>
                    <div className={styles.wine_image_container}>
                        <img src={roseWine.image} alt={roseWine.name} />
                    </div>
                    <div className={styles.wine_container_traits}>
                        {roseWine.traits.split(',').map((trait, index) => (
                            <p key={index}>{trait.trim().toUpperCase()}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Immagine aggiuntiva */}
            <div className={styles.green_image_container}>
                <img src={greenImage} alt="vigneto" />
            </div>

            {/* Sezione Bestseller */}
            <div className={styles.best_seller_title}>
                <h1>BESTSELLER</h1>
            </div>
            <div className={styles.best_seller_container}>
                {bestWines.length > 0 ? (
                    bestWines.map(wine => (
                        <div key={wine.id} className={`${styles.best_dynamic_wine_container} ${styles[wine.type]}`}>
                            <div className={styles.wine_image_container}>
                                <img src={wine.image} alt={wine.name} />
                            </div>
                            <div className={styles.wine_container_traits}>
                                {wine.traits.split(',').map((trait, index) => (
                                    <p key={index}>{trait.trim().toUpperCase()}</p>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Caricamento bestseller...</div>
                )}
            </div>


        </>
    );
}
