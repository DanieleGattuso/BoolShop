import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import WineContext from "../context/WineContext";

// Import styles and assets
import styles from "./WineDetailsPage.module.css";
import waves from "../assets/path.svg"
import grape from "../assets/grape_icon.png"
import size from "../assets/formato.png"
import ground from "../assets/suolo.png"
import production_year from "../assets/vendemmia.png"
import taste_notes from "../assets/note.png"
import winemaking from "../assets/vinificazione.png"
import food_pairings from "../assets/abbinamenti.png"
import alcohol_volume from "../assets/gradoalcolico.png"

export default function WineDetailsPage() {
    // Hooks for navigation and route state
    const location = useLocation();
    const navigate = useNavigate();

    // Global cart context
    const { cart, setCart } = useContext(WineContext);

    // Local state for the "Added to cart" confirmation message
    const [showAddedMessage, setShowAddedMessage] = useState(false);

    // Add product to cart and show confirmation
    const addToCart = (prodotto) => {
        setCart([...cart, prodotto]); // Add selected wine to the cart

        // Show confirmation message for 2 seconds
        setShowAddedMessage(true);
        setTimeout(() => {
            setShowAddedMessage(false);
        }, 2000);
    };

    // Retrieve wine details passed via navigation
    const wineDetails = location.state?.wine;

    // Redirect if no wine data is found (e.g. user refreshes page)
    useEffect(() => {
        if (!wineDetails) {
            navigate("/wines");
        }
    }, []);

    // If no wine data, render nothing
    if (!wineDetails) return null;

    return (
        <>
            {/* === HERO SECTION: Big title, wine image, purchase button === */}
            <div className={`${styles.hero_section} ${styles[wineDetails.type]}`}>

                {/* Background large wine name */}
                <h1 className={styles.background_text}>{wineDetails.name}</h1>

                {/* Wine bottle image */}
                <img
                    src={wineDetails.image}
                    alt={wineDetails.name}
                    className={styles.bottle}
                />

                {/* Purchase button */}
                <button
                    className={styles.hero_button}
                    onClick={() => addToCart({ id: wineDetails.id })}
                >
                    ACQUISTA
                </button>

                {/* Confirmation message shown on click */}
                {showAddedMessage && (
                    <div className={styles.added_message}>Aggiunto al carrello!</div>
                )}
            </div>

            {/* === TECHNICAL SHEET SECTION === */}
            <div className={styles.wine_properties_big_container}>
                <div className={styles.wine_properties_container}>

                    {/* Decorative wave image */}
                    <div className={styles.wine_properties_image}>
                        <img src={waves} alt="" className={styles.footer_big_wave} />
                    </div>

                    {/* Section title */}
                    <h1>SCHEDA TECNICA</h1>

                    {/* All wine properties in a grid */}
                    <div className={styles.flex_container}>
                        <div className={styles.data_sheet_container}>

                            {/* VARIETÀ */}
                            <div className={styles.single_data_containers}>
                                <div className={styles.single_data_icon}>
                                    <img src={grape} alt="Icona varietà" />
                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>VARIETÀ</h5>
                                    <p>{wineDetails.grape_variety}</p>
                                </div>
                            </div>

                            {/* ANNO DI PRODUZIONE */}
                            <div className={styles.single_data_containers}>
                                <div className={styles.single_data_icon}>
                                    <img src={production_year} alt="Icona anno" />
                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>ANNO DI PRODUZIONE</h5>
                                    <p>{wineDetails.production_year}</p>
                                </div>
                            </div>

                            {/* NOTE DI DEGUSTAZIONE */}
                            <div className={styles.single_data_containers}>
                                <div className={styles.single_data_icon}>
                                    <img src={taste_notes} alt="Icona note" />
                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>NOTE DI DEGUSTAZIONE</h5>
                                    <p>{wineDetails.taste_notes}</p>
                                </div>
                            </div>

                            {/* VINIFICAZIONE */}
                            <div className={styles.single_data_containers}>
                                <div className={styles.single_data_icon}>
                                    <img src={winemaking} alt="Icona vinificazione" />
                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>VINIFICAZIONE</h5>
                                    <p>{wineDetails.winemaking}</p>
                                </div>
                            </div>

                            {/* SUOLO */}
                            <div className={styles.single_data_containers}>
                                <div className={styles.single_data_icon}>
                                    <img src={ground} alt="Icona suolo" />
                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>SUOLO</h5>
                                    <p>{wineDetails.ground}</p>
                                </div>
                            </div>

                            {/* ABBINAMENTI */}
                            <div className={styles.single_data_containers}>
                                <div className={styles.single_data_icon}>
                                    <img src={food_pairings} alt="Icona abbinamenti" />
                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>ABBINAMENTI</h5>
                                    <p>{wineDetails.food_pairing}</p>
                                </div>
                            </div>

                            {/* GRADO ALCOLICO */}
                            <div className={styles.single_data_containers}>
                                <div className={styles.single_data_icon}>
                                    <img src={alcohol_volume} alt="Icona alcol" />
                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>GRADO ALCOLICO</h5>
                                    <p>{wineDetails.alcohol_volume}% vol</p>
                                </div>
                            </div>

                            {/* FORMATO */}
                            <div className={styles.single_data_containers}>
                                <div className={styles.single_data_icon}>
                                    <img src={size} alt="Icona formato" />
                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>FORMATO</h5>
                                    <p>{wineDetails.size} ml</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}