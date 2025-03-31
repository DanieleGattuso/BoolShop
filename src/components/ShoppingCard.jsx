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
                    <div className={`row ${styles.card}`} key={item.id}>
                        {/* colonna di sinistra*/}
                        <div className={`col-2 ${styles.col_image}`}>
                            {/* immagine prodotto */}
                            <div className={styles.table_image}>
                                <img src={item.image} alt="" />
                            </div>
                        </div>
                        {/* colonna di destra */}
                        <div className={`col-10`}>
                            {/* riga*/}
                            <div className={`row`}>
                                {/* colonna nome */}
                                <div className={`col-sm-12 col-md-4 col-lg-4 ${styles.name_product}`} >
                                    {/* nome prodotto */}
                                    {item.name}
                                </div>
                                {/* colonna quantità */}
                                <div className={`col-sm-12 col-md-4 col-lg-4 ${styles.box_quantity}`}>
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
                                <div className={`col-sm-12 col-md-4 col-lg-4 ${styles.price}`}>
                                    {hasDiscount ? (
                                        <>
                                            <div className="d-block">

                                                <span className={styles.discount_price}>
                                                    {(finalPrice * item.quantity).toFixed(2)}€
                                                </span>
                                                <span className={styles.discount}> In Sconto</span>
                                                <div className={styles.single_price}>
                                                    ({finalPrice.toFixed(2)}€/bottiglia)
                                                </div>
                                            </div>



                                        </>
                                    ) : (
                                        <>
                                            <div className="d-block">
                                                <div>
                                                    {(finalPrice * item.quantity).toFixed(2)}€
                                                </div>
                                                <div className={styles.single_price}>
                                                    ({finalPrice.toFixed(2)}€/bottiglia)
                                                </div>
                                            </div>
                                        </>

                                    )}
                                </div>



                            </div>
                        </div>


                    </div >
                )
            })}

        </>
    )
}

