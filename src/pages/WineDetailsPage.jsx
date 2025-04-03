import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useMemo } from "react";
import WineContext from "../context/WineContext";
import WineCard from "../components/WineCard";
import Toast from "../components/Toast";

// Import styles and assets
import styles from "./WineDetailsPage.module.css";
import waves from "../assets/path.svg";
import grape from "../assets/grape_icon.png";
import size from "../assets/formato.png";
import ground from "../assets/suolo.png";
import production_year from "../assets/vendemmia.png";
import taste_notes from "../assets/note.png";
import winemaking from "../assets/vinificazione.png";
import food_pairings from "../assets/abbinamenti.png";
import alcohol_volume from "../assets/gradoalcolico.png";

export default function WineDetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { slug } = useParams();
    const { wines, cart, setCart } = useContext(WineContext);
    const [isPressed, setIsPressed] = useState(false);


    const [toastMessage, setToastMessage] = useState("");

    const wineDetails = useMemo(() => {
        return wines.find(w => {
            const generatedSlug = w.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
            return generatedSlug === slug;
        });
    }, [slug, wines]);

    const relatedWines = useMemo(() => {
        if (!wineDetails) return [];
        return wines
            .filter(w => w.ground === wineDetails.ground && w.id !== wineDetails.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
    }, [wineDetails, wines]);

    if (!wineDetails) return <p style={{ padding: "4rem", textAlign: "center" }}>Vino non trovato.</p>;

    const addToCart = (prodotto) => {
        setCart([...cart, prodotto]);
        setToastMessage("Aggiunto al carrello!");
        setTimeout(() => {
            setToastMessage("");
        }, 2000);
    };

    return (
        <>
            <div className={`${styles.hero_section} ${styles[wineDetails.type]}`}>
                <h1 className={styles.background_text}>{wineDetails.name}</h1>
                <img src={wineDetails.image} alt={wineDetails.name} className={styles.bottle} />
                {/* <button className={styles.hero_button} onClick={() => addToCart({ id: wineDetails.id })}>
                    ACQUISTA
                </button> */}
                <div>
                    {/* {wineDetails.quantity_in_stock > 0 ? ( */}
                    <button
                        onClick={() => addToCart({ id: wineDetails.id })}
                        className={`${isPressed ? styles.pressed : ""}${styles.hero_button}`}
                        disabled={wineDetails.quantity_in_stock === 0}
                    >
                        {wineDetails.quantity_in_stock !== 0 ? "AGGIUNGI" : "ESAURITO"}
                    </button>
                    {/* // ) : (
                    //     <div className={styles.not_available}>
                    //         Vino non disponibile
                    //     </div>
                    // )} */}
                </div>
            </div >

            <div className={styles.wine_properties_big_container}>
                <div className={styles.wine_properties_container}>
                    <div className={styles.wine_properties_image}>
                        <img src={waves} alt="" className={styles.footer_big_wave} />
                    </div>
                    <h1>SCHEDA TECNICA</h1>
                    <div className={styles.flex_container}>
                        <div className={styles.data_sheet_container}>
                            {[{
                                icon: grape, title: "VARIETÀ", value: wineDetails.grape_variety
                            }, {
                                icon: production_year, title: "ANNO DI PRODUZIONE", value: wineDetails.production_year
                            }, {
                                icon: taste_notes, title: "NOTE DI DEGUSTAZIONE", value: wineDetails.taste_notes
                            }, {
                                icon: winemaking, title: "VINIFICAZIONE", value: wineDetails.winemaking
                            }, {
                                icon: ground, title: "SUOLO", value: wineDetails.ground
                            }, {
                                icon: food_pairings, title: "ABBINAMENTI", value: wineDetails.food_pairing
                            }, {
                                icon: alcohol_volume, title: "GRADO ALCOLICO", value: `${wineDetails.alcohol_volume}% vol`
                            }, {
                                icon: size, title: "FORMATO", value: `${wineDetails.size} ml`
                            }].map((item, index) => (
                                <div key={index} className={styles.single_data_containers}>
                                    <div className={styles.single_data_icon}>
                                        <img src={item.icon} alt={`Icona ${item.title}`} />
                                    </div>
                                    <div className={styles.single_data_script}>
                                        <h5>{item.title}</h5>
                                        <p>{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.big_correlated_wines_container}>
                <div className={styles.wine_properties_image}>
                    <img src={waves} alt="" className={styles.footer_big_wave} />
                </div>
                <h1 className={styles.correlated_title}>VINI CORRELATI</h1>
                <div className={styles.small_correlated_wines_container}>
                    {relatedWines.length > 0 ? (
                        relatedWines.map(wine => (
                            <WineCard key={wine.id} wineProps={wine} cart={cart} setCart={setCart} />
                        ))
                    ) : (
                        <p style={{ color: "#fff" }}>Nessun vino correlato disponibile.</p>
                    )}
                </div>
            </div>

            {toastMessage && <Toast message={toastMessage} />}
        </>
    );
}