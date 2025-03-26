import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import videoBg from '../assets/vinogiusto.mp4';
import greenImage from '../assets/vigneto.jpeg'

export default function HomePage() {
    // State variable 'wines' to store fetched wine data
    const [wines, setWines] = useState([]);

    // useEffect hook to fetch wine data once when the component mounts
    useEffect(() => {
        fetchWines();
    }, []);

    // Function to fetch wines from the API using axios
    function fetchWines() {
        axios.get('http://localhost:3000/api/wines')
            .then(res => setWines(res.data))
            .catch(err => console.log(err));
    }

    // Helper function to retrieve a wine object by its id
    function getWineById(id) {
        return wines.find(wine => wine.id === id);
    }

    // Retrieving specific wines by their IDs (7, 9, and 25)
    const redWine = getWineById(7);
    const whiteWine = getWineById(21);
    const roseWine = getWineById(35);

    // Wait until the wines data is fully loaded; otherwise, display a loading message
    if (!redWine || !whiteWine || !roseWine) {
        return <div>Caricamento vini...</div>;
    }

    // JSX rendering
    return (
        <>
            {/* Hero section video background */}
            <div className={styles.homepage_video}>
                <video autoPlay loop muted playsInline>
                    <source src={videoBg} type="video/mp4" />
                </video>
                <div className={styles.overlay_content}>
                    <h1>Siamo troppo forti</h1>
                </div>
            </div>

            {/* Section title for best-selling wines */}
            <div className={styles.best_seller_title}>
                <h1>I NOSTRI TOP 2025</h1>
            </div>

            {/* Container holding the details for each best-selling wine */}
            <div className={styles.best_seller_container}>

                {/* Red Wine Container */}
                <div className={styles.best_red_wine_container}>
                    <div className={styles.wine_image_container}>
                        <img src={redWine.image} alt={redWine.name} />
                    </div>
                    <div className={styles.wine_container_traits}>
                        {/* Splitting the traits string and displaying each trait in a separate paragraph */}
                        {redWine.traits.split(',').map((trait, index) => (
                            <p key={index}>{trait.trim().toUpperCase()}</p>
                        ))}
                    </div>
                </div>

                {/* White Wine Container */}
                <div className={styles.best_white_wine_container}>
                    <div className={styles.wine_image_container}>
                        <img src={whiteWine.image} alt={whiteWine.name} />
                    </div>
                    <div className={styles.wine_container_traits}>
                        {/* Splitting the traits string and displaying each trait in a separate paragraph */}
                        {whiteWine.traits.split(',').map((trait, index) => (
                            <p key={index}>{trait.trim().toUpperCase()}</p>
                        ))}
                    </div>
                </div>

                {/* Rosé Wine Container */}
                <div className={styles.best_rose_wine_container}>
                    <div className={styles.wine_image_container}>
                        <img src={roseWine.image} alt={roseWine.name} />
                    </div>
                    <div className={styles.wine_container_traits}>
                        {/* Splitting the traits string and displaying each trait in a separate paragraph */}
                        {roseWine.traits.split(',').map((trait, index) => (
                            <p key={index}>{trait.trim().toUpperCase()}</p>
                        ))}
                    </div>
                </div>

            </div>

            <div className={styles.green_image_container} >
                <img src={greenImage} alt="vigneto" />
            </div>

        </>
    );
}
