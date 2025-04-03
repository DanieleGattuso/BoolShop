import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import videoBg from '../assets/vinogiusto.mp4';
import greenImage from '../assets/sunnywineyard.jpg';
import { Link } from "react-router-dom";
import Popup from "../components/PopUp"

export default function HomePage() {
    // State per tutti i vini e per i bestseller
    const [bestSeller, setBestSeller] = useState([]);

    // State per tutti i vini e per i Best wines
    const [bestWine, setBestWines] = useState([]);


    // useEffect per effettuare le chiamate API una sola volta al mount del componente
    useEffect(() => {
        fetchBestSeller();
    }, []);

    useEffect(() => {
        fetchBestWines();
    }, []);

    // Funzione per recuperare i vini bestseller
    function fetchBestSeller() {
        axios.get('http://localhost:3000/api/wines/limited_stock')
            .then(res => setBestSeller(res.data))
            .catch(err => console.log(err));
    }

    function fetchBestWines() {
        axios.get('http://localhost:3000/api/wines/wines_selection')
            .then(res => setBestWines(res.data))
            .catch(err => console.log(err));
    }

    // Funzione helper per ottenere un vino tramite id


    // Recupero dei vini specifici (per la sezione TOP 2025)
    const redWine = bestWine[0];
    const whiteWine = bestWine[1];
    const roseWine = bestWine[2];



    return (
        <>
            <Popup />
            {/* Sezione Hero con video di sfondo */}
            <div className={styles.homepage_video}>
                <video autoPlay loop muted playsInline>
                    <source src={videoBg} type="video/mp4" />
                </video>
                <div className={styles.overlay_content}>
                    <div className={styles.video_abstract_container}>
                        <h1>Boolwine è una cantina innovativa che combina tradizione e modernità per creare vini di eccellenza. Grazie a una crescita dinamica e sostenibile, si distingue per la qualità delle sue produzioni e il forte legame con il territorio, offrendo esperienze enologiche uniche.</h1>

                    </div>

                </div>
            </div>

            {/* Sezione TOP 2025 */}
            {!redWine || !whiteWine || !roseWine ? <div>Caricamento vini...</div> : <>
                <div className={styles.best_seller_title}>
                    <h1>I NOSTRI TOP 2025</h1>
                </div>
                <div className={styles.best_seller_container}>
                    {/* Contenitore per il vino rosso */}

                    <Link to="/winedetails" state={{ wine: redWine }}>
                        <div className={styles.best_red_wine_container}>
                            <div className={styles.wine_image_container}>
                                <img src={redWine.image} alt={redWine.name} />
                            </div>
                            <div className={`${styles.wine_container_traits} ${styles[redWine.type]}`} >
                                {redWine.traits.split(',').map((trait, index) => (
                                    <p key={index}>{trait.trim().toUpperCase()}</p>
                                ))}
                            </div>
                        </div>
                    </Link>

                    {/* Contenitore per il vino bianco */}
                    <Link to="/winedetails" state={{ wine: whiteWine }}>
                        <div className={styles.best_white_wine_container}>
                            <div className={styles.wine_image_container}>
                                <img src={whiteWine.image} alt={whiteWine.name} />
                            </div>
                            <div className={`${styles.wine_container_traits} ${styles[whiteWine.type]}`}>
                                {whiteWine.traits.split(',').map((trait, index) => (
                                    <p key={index}>{trait.trim().toUpperCase()}</p>
                                ))}
                            </div>
                        </div>

                    </Link>


                    {/* Contenitore per il vino rosato */}

                    <Link to="/winedetails" state={{ wine: roseWine }}>

                        <div className={styles.best_rose_wine_container}>
                            <div className={styles.wine_image_container}>
                                <img src={roseWine.image} alt={roseWine.name} />
                            </div>
                            <div className={`${styles.wine_container_traits} ${styles[roseWine.type]}`}>
                                {roseWine.traits.split(',').map((trait, index) => (
                                    <p key={index}>{trait.trim().toUpperCase()}</p>
                                ))}
                            </div>
                        </div>

                    </Link>

                </div>
            </>}


            {/* Immagine aggiuntiva */}
            <div className={styles.green_image_container}>
                <img src={greenImage} alt="vigneto" />
            </div>

            {/* Sezione Bestseller */}
            <div className={styles.best_seller_title}>
                <h1>BESTSELLER</h1>
            </div>
            <div className={styles.best_seller_container}>
                {bestSeller.length > 0 ? (
                    bestSeller.map(wine => (
                        <Link key={wine.id} to="/winedetails" state={{ wine: wine }}>
                            <div className={`${styles.best_dynamic_wine_container} ${styles[wine.type]}`}>
                                <div className={styles.wine_image_container}>
                                    <img src={wine.image} alt={wine.name} />
                                </div>
                                <div className={styles.wine_container_traits}>
                                    {wine.traits.split(',').map((trait, index) => (
                                        <p key={index}>{trait.trim().toUpperCase()}</p>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div>Caricamento bestseller...</div>
                )}
            </div>


        </>
    );
}
