import { useState } from "react";
import styles from "./WineCard.module.css";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

const WineCard = ({ wineProps, cart, setCart }) => {
    const navigate = useNavigate();
    const [isPressed, setIsPressed] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleClick = () => {
        const slug = wineProps.name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "");
        navigate(`/winedetails/${slug}`, { state: { wine: wineProps } });
    };

    const addToCart = (prodotto) => {
        setCart([...cart, prodotto]);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    return (
        <div className={styles.wine_card}>
            {/* upper section card */}
            <div onClick={handleClick} className={styles.container_pointer}>
                <img src={wineProps.image} alt={wineProps.name} />
                <h3>{wineProps.name}</h3>

                {wineProps.type === "rosso" && <h4 className={styles.rosso}>Rosso</h4>}
                {wineProps.type === "bianco" && <h4 className={styles.bianco}>Bianco</h4>}
                {wineProps.type === "rosato" && <h4 className={styles.rosato}>Rosato</h4>}
            </div>

            <div className={styles.abstract_container}>
                <p>{wineProps.abstract}</p>
            </div>

            <div className={styles.price_container}>
                {wineProps.discount_price ? (
                    <span>
                        <span className={styles.old_price}>€{wineProps.price}</span>
                        <span className={styles.discounted_price}>€{wineProps.discount_price}</span>
                    </span>
                ) : (
                    <span className={styles.normal_price}>{wineProps.price} €</span>
                )}
            </div>

            <div className={styles.size_container}>
                <span>{wineProps.size} ml</span>
            </div>

            {/* down section with button */}
            {/* down section with button */}
            <div>
                {wineProps.quantity_in_stock > 0 ? (
                    <button
                        onClick={() => addToCart({ id: wineProps.id })}
                        className={isPressed ? styles.pressed : ""}
                    >
                        AGGIUNGI
                    </button>
                ) : (
                    <div className={styles.not_available}>
                        Vino non disponibile
                    </div>
                )}
            </div>


            {showToast && <Toast message="Aggiunto al carrello!" />}
        </div>
    );
};

export default WineCard;