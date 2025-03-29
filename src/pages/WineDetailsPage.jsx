import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

            <div className={styles.wine_properties_big_container}>
                <div className={styles.wine_properties_container}>

                    <div className={styles.wine_properties_image}>
                        <img src={waves} alt="" className={styles.footer_big_wave} />

                    </div>
                    <h1>SCHEDA TECNICA</h1>

                    <div className={styles.flex_container}>
                        <div className={styles.data_sheet_container}>

                            <div className={styles.single_data_containers}>

                                <div className={styles.single_data_icon}>

                                    <img src={grape} alt="" />

                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>VARIETà</h5>
                                    <p>{wineDetails.grape_variety}</p>
                                </div>


                            </div>

                            <div className={styles.single_data_containers}>

                                <div className={styles.single_data_icon}>

                                    <img src={production_year} alt="" />

                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>ANNO DI PRODUZIONE</h5>
                                    <p>{wineDetails.production_year}</p>
                                </div>

                            </div>

                            <div className={styles.single_data_containers}>

                                <div className={styles.single_data_icon}>

                                    <img src={taste_notes} alt="" />

                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>NOTE DI DEGUSTAZIONE</h5>
                                    <p>{wineDetails.taste_notes}</p>
                                </div>

                            </div>

                            <div className={styles.single_data_containers}>

                                <div className={styles.single_data_icon}>

                                    <img src={winemaking} alt="" />

                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>VINIFICAZIONE</h5>
                                    <p>{wineDetails.winemaking}</p>
                                </div>
                            </div>

                            <div className={styles.single_data_containers}>

                                <div className={styles.single_data_icon}>

                                    <img src={ground} alt="" />

                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>SUOLO</h5>
                                    <p>{wineDetails.ground}</p>
                                </div>

                            </div>

                            <div className={styles.single_data_containers}>

                                <div className={styles.single_data_icon}>

                                    <img src={food_pairings} alt="" />

                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>ABBINAMENTI</h5>
                                    <p>{wineDetails.food_pairing}</p>
                                </div>

                            </div>

                            <div className={styles.single_data_containers}>

                                <div className={styles.single_data_icon}>

                                    <img src={alcohol_volume} alt="" />

                                </div>
                                <div className={styles.single_data_script}>
                                    <h5>GRADO ALCOLICO</h5>
                                    <p>{wineDetails.alcohol_volume}% vol</p>
                                </div>

                            </div>

                            <div className={styles.single_data_containers}>

                                <div className={styles.single_data_icon}>

                                    <img src={size} alt="" />

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
