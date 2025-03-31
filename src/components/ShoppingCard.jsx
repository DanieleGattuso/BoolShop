import styles from "../pages/ShoppingBagPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ShoppingCard({ renderCart, quantityButton }) {

    return (
        <>
            {renderCart.map(item => {
                const hasDiscount = item.discount_price !== null;
                const originalPrice = Number(item.price);
                const finalPrice = hasDiscount ? Number(item.discount_price) : originalPrice;
                return (
                    // riga intera della card
                    <div className="row" key={item.id}>
                        {/* col prodotto */}
                        <div className={`col-4 ${styles.table_product}`}>
                            {/* immagine prodotto */}
                            <div className={styles.table_image}>
                                <img src={item.image} alt="" />
                            </div>
                            <div>
                                {/* nome prodotto */}
                                {item.name}
                            </div>
                        </div>
                        {/* colonna quantità */}
                        <div className={`col-4 ${styles.box_quantity}`}>
                            <div className={styles.quantity}>
                                <button
                                    className={styles.quantitybtn}
                                    disabled={item.quantity === 1}
                                    onClick={() => quantityButton(item.id, -1)}
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <span className="fw-bold px-2">{item.quantity}</span>
                                <button
                                    className={styles.quantitybtn}
                                    disabled={item.quantity >= item.quantity_in_stock}
                                    onClick={() => quantityButton(item.id, 1)}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <button className={styles.trash}
                                onClick={() => quantityButton(item.id, 0)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                        {/* colonna prezzo articolo */}
                        <div className={`col-2 ${styles.price}`}>
                            {hasDiscount ? (
                                <>
                                    <span>{originalPrice.toFixed(2)}€</span>
                                    <span>
                                        {finalPrice.toFixed(2)}€
                                    </span>
                                </>
                            ) : (
                                `${finalPrice.toFixed(2)}€`
                            )}
                        </div>

                        {/* colonna prezzo totale articolo */}
                        <div className="col-2">
                            <p>
                                {(finalPrice * item.quantity).toFixed(2)}€
                            </p>
                        </div>
                    </div>
                )
            })}

        </>
    )
}

