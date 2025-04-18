import styles from "../pages/ShoppingBagPage.module.css";
import { Link } from "react-router-dom";
export default function CartSummary({ renderCart }) {


    // This function calculates the total amount of the cart
    const totalAmount = renderCart
        // sum up the total price considering discounts if available
        .reduce((acc, { discount_price, price, quantity }) => acc + (discount_price || price) * quantity, 0)
        // round the total amount to 2 decimal places
        .toFixed(2);

    // This function calculates the shipping cost
    const shippingAmount = 14.99

    // set the final price equal to the total amount
    let finalPrice = totalAmount
    // If the total amount is less than 99
    if (totalAmount < 99) {
        // add the shipping cost to the final price
        finalPrice = parseFloat(totalAmount) + shippingAmount
        // round the final price to 2 decimal places
        finalPrice = finalPrice.toFixed(2)
    }

    return (
        <>
            {/* riga inferiore */}
            < div className="row mt-3" >
                {/* col for logo */}
                <div className="d-none d-md-block col-md-5"></div>

                {/* col for summary */}
                <div className="col-sm-12 col-md-7">
                    {/* Subtotal */}
                    <div className={`row ${styles.summary_row}`}>
                        <div className="col">Totale Imponibile</div>
                        <div className={`col ${styles.summary_col}`}>{totalAmount}€</div>
                    </div>
                    {/* taxes */}
                    <div className={`row ${styles.summary_row}`}>
                        <div className="col">Tasse</div>
                        <div className={`col ${styles.summary_col}`}>Incluse</div>
                    </div>
                    {/* shipping Cost */}
                    <div className={`row ${styles.summary_row}`}>
                        <div className="col">Spedizione</div>
                        <div className={`col ${styles.summary_col}`}>
                            {totalAmount < 99 ? `${shippingAmount}€` : <b className="text-success">GRATUITA</b>}
                        </div>
                    </div>
                    {/* total */}
                    <div className={`row ${styles.summary_row}`}>
                        <div className="col">Totale</div>
                        <div className={`col ${styles.summary_col}`}>{finalPrice}€</div>
                    </div>
                </div>
            </div >

            {/* proceed to checkout button */}
            < div className={styles.checkout_box} >
                <Link to="/checkoutpage">Procedi al checkout</Link>
            </div >
        </>

    )
}