import styles from "./WineCard.module.css";

const WineCard = ({ wineProps }) => {
    return (
        <div className={styles.wine_card}>

            {/* upper section  card */}
            <div>

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
            <p>{wineProps.abstract}</p>

            {/* down section with button */}
            <div>


                <button>Scopri di più</button>

            </div>


        </div>
    );
};

export default WineCard;