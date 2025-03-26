import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import videoBg from '../assets/vinogiusto.mp4';

export default function HomePage() {
    const [wines, setWines] = useState([]);

    useEffect(() => {
        fetchWines();
    }, []);

    function fetchWines() {
        axios.get('http://localhost:3000/api/wines')
            .then(res => setWines(res.data))
            .catch(err => console.log(err));
    }

    function getWineById(id) {
        return wines.find(wine => wine.id === id);
    }

    const redWine = getWineById(7);
    const whiteWine = getWineById(9);
    const roseWine = getWineById(25);

    // Aspetta che i dati siano caricati prima di renderizzare i dettagli
    if (!redWine || !whiteWine || !roseWine) {
        return <div>Caricamento vini...</div>;
    }

    return (
        <>
            <div className={styles.homepage_video}>
                <video autoPlay loop muted playsInline>
                    <source src={videoBg} type="video/mp4" />
                </video>
                <div className={styles.overlay_content}>
                    <h1>Siamo troppo forti</h1>
                </div>
            </div>

            <div className={styles.best_seller_title}>
                <h1>I NOSTRI TOP 2025</h1>
            </div>

            <div className={styles.best_seller_container}>
                <div className={styles.best_red_wine_container}>
                    <div className={styles.wine_image_container}>
                        <img src={redWine.image} alt={redWine.name} />
                    </div>
                    <div className={styles.wine_container_traits}>
                        <p>{redWine.traits}</p>
                    </div>
                </div>

                <div className={styles.best_white_wine_container}>
                    <div className={styles.wine_image_container}>
                        <img src={whiteWine.image} alt={whiteWine.name} />
                    </div>
                    <div className={styles.wine_container_traits}>
                        <p>{whiteWine.traits}</p>
                    </div>
                </div>

                <div className={styles.best_rose_wine_container}>
                    <div className={styles.wine_image_container}>
                        <img src={roseWine.image} alt={roseWine.name} />
                    </div>
                    <div className={styles.wine_container_traits}>
                        <p>{roseWine.traits}</p>
                    </div>
                </div>
            </div>
        </>
    );
}