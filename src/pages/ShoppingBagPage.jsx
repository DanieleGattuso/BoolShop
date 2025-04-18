import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import WineContext from "../context/WineContext";
import ShoppingList from "../components/ShoppingList";
import CartSummary from "../components/CartSummary";
import styles from "../pages/ShoppingBagPage.module.css";

export default function ShoppingBagPage() {


    // CONTEXT
    const { wines, cart, setCart, cartPair, setCartPair, setUserLocation } = useContext(WineContext);

    // save user position
    const location = useLocation()
    // action to do when page is active
    useEffect(() => {
        // change user location state
        setUserLocation(location)

        // transform the cart data from localStorage into an array or an empty array
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        // set the cart state to the stored cart data
        setCart(storedCart);
        // set the cartPair state to the countWinesById function
        setCartPair(countWinesById(storedCart));
    }, []);

    // save cart data back to localStorage whenever winesId changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    // function to count the quantity of each item in the array
    function countWinesById(array) {

        // create an object to store the quantity of each item
        // iterate over the array and count the quantity of each item
        const groupItems = array.reduce((acc, item) => {
            // if the item already exists in the object, increment its quantity
            // if the item doesn't exist, set its quantity to 1
            acc[item.id] = (acc[item.id] || 0) + 1;
            // return the object with the quantity of each item
            return acc;
        }, {});
        // console.log('questo è groupItems', groupItems)

        // convert the object into an array of objects with wine_id and quantity properties
        return Object.keys(groupItems).map(id => ({
            // convert the id to a number
            wine_id: Number(id),
            // set the quantity of the item
            quantity: groupItems[id]
        }));
    };

    // create an array with all info about the wines in the cart & their quantity
    const renderCart = wines
        // filter wines that are in the cart
        .filter(wine => cartPair.some(item => item.wine_id === wine.id))

        // map the filtered wines to create an array with all info about the wines in the cart
        .map(wine => {
            // find the quantity of each wine in the cart
            const item = cartPair.find(item => item.wine_id === wine.id);
            return {
                // spread the wine object to get all its properties
                ...wine,
                // add the quantity property to the wine object
                quantity: item.quantity
            };
        });

    // console.log('queste sono le render cart', renderCart)


    // RENDER
    return (
        <>
            {/* external container */}
            <div className={`container ${styles.box}`}>

                <ShoppingList renderCart={renderCart} countWinesById={countWinesById} />
                <CartSummary renderCart={renderCart} />
            </div>
        </>
    );
}