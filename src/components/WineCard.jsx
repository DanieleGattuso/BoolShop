import styles from "./WineCard.module.css";
import { useNavigate } from "react-router-dom";

const WineCard = ({ wineProps, cart, setCart }) => {


    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/winedetails", { state: { wine: wineProps } });
    };


    // ---------------------- aggiungi prodotti al carrello -------------------------
    const addToCart = (prodotto) => {
        setCart([...cart, prodotto]);
    };

    return (

        <div className={styles.wine_card}>
            {/* upper section card */}
            <div onClick={handleClick} className={styles.container_pointer}>
                <img src={wineProps.image} alt={wineProps.name} />
                <h3>{wineProps.name}</h3>

                {wineProps.type === "rosso" && (
                    <h4 className={styles.rosso}>Rosso</h4>
                )}
                {wineProps.type === "bianco" && (
                    <h4 className={styles.bianco}>Bianco</h4>
                )}
                {wineProps.type === "rosato" && (
                    <h4 className={styles.rosato}>Rosato</h4>
                )}
            </div>

            <div className={styles.abstract_container}>
                <p>{wineProps.abstract}</p>
            </div>

            <div className={styles.price_container}>
                {wineProps.discount_price ? (
                    <p>
                        <span className={styles.old_price}>€{wineProps.price}</span>
                        <span className={styles.discounted_price}>€{wineProps.discount_price}</span>
                    </p>
                ) : (
                    <p className={styles.normal_price}>€{wineProps.price}</p>
                )}
            </div>

            <div className={styles.size_container}>

                <p>{wineProps.size} ml</p>

            </div>



            {/* down section with button */}
            <div>
                <button disabled={wineProps.quantity_in_stock === 0} onClick={() => addToCart({ id: wineProps.id })}>AGGIUNGI</button>
            </div>
        </div>
    );
};

export default WineCard;