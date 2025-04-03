import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import videoBg from '../assets/vinogiusto.mp4';
import greenImage from '../assets/sunnywineyard.jpg';
import { Link } from "react-router-dom";
import Popup from "../components/PopUp";

export default function HomePage() {
    const [bestSeller, setBestSeller] = useState([]);
    const [bestWine, setBestWines] = useState([]);

    useEffect(() => {
        fetchBestSeller();
        fetchBestWines();
    }, []);

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

    const redWine = bestWine[0];
    const whiteWine = bestWine[1];
    const roseWine = bestWine[2];

    const generateSlug = (name) =>
        name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

    return (
        <>
            <Popup />

            <div className={styles.homepage_video}>
                <video autoPlay loop muted playsInline>
                    <source src={videoBg} type="video/mp4" />
                </video>
                <div className={styles.overlay_content}>
                    <div className={styles.video_abstract_container}>
                        <h1>Cantine Booleane unisce tradizione e innovazione per creare vini d’eccellenza, con un approccio sostenibile e radicato nel territorio, offrendo esperienze enologiche uniche.</h1>
                    </div>
                </div>
            </div>

            {!redWine || !whiteWine || !roseWine ? <div>Caricamento vini...</div> : <>
                <div className={styles.best_seller_title}>
                    <h1>I NOSTRI TOP 2025</h1>
                </div>
                <div className={styles.best_seller_container}>
                    <Link to={`/winedetails/${generateSlug(redWine.name)}`}>
                        <div className={styles.best_red_wine_container}>
                            <div className={styles.wine_image_container}>
                                <img src={redWine.image} alt={redWine.name} />
                            </div>
                            <div className={`${styles.wine_container_traits} ${styles[redWine.type]}`}>
                                {redWine.traits.split(',').map((trait, index) => (
                                    <p key={index}>{trait.trim().toUpperCase()}</p>
                                ))}
                            </div>
                        </div>
                    </Link>

                    <Link to={`/winedetails/${generateSlug(whiteWine.name)}`}>
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

                    <Link to={`/winedetails/${generateSlug(roseWine.name)}`}>
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

            <div className={styles.green_image_container}>
                <img src={greenImage} alt="vigneto" />
            </div>

            <div className={styles.best_seller_title}>
                <h1>DISPONIBILITà ESCLUSIVA</h1>
            </div>
            <div className={styles.best_seller_container}>
                {bestSeller.length > 0 ? (
                    bestSeller.map(wine => (
                        <Link key={wine.id} to={`/winedetails/${generateSlug(wine.name)}`}>
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