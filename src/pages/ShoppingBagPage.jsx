import styles from "../pages/ShoppingBagPage.module.css";
import { useEffect, useState, useContext } from "react";
import WineContext from "../context/WineContext";

export default function ShoppingBagPage() {

    const { wines } = useContext(WineContext);

    // console.log('shopping bag', wines);

    // estrapoliamo i dati del local storage
    const [winesId, setwinesId] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    // rendiamo json il nostro array di id
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(winesId));
    }, [winesId]);

    // funzione per aggiungere gli id al array
    const addToCart = (prodotto) => {
        setwinesId([...winesId, prodotto]);
    };


    // funzione per contare gli id e le quantità
    function contaIDArray(array) {
        const mappa = array.reduce((acc, item) => {
            acc[item.id] = (acc[item.id] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(mappa).map(id => ({
            wine_id: Number(id), // Nome personalizzato per l'ID
            quantity: mappa[id] // Nome personalizzato per la quantità
        }));
    }

    const winesSommati = contaIDArray(winesId);
    console.log('questo è il carrello', winesSommati);

    // mi creerei un array chiamato carrello
    // che inglova le informazione dei vini filtrate alle informazione dei wineid con el quantita
    // e mi esce un carrello con chiavi: id , name, image, quantity e prezzo

    const renderCart = wines
        .filter(wine => winesSommati.some(item => item.wine_id === wine.id))
        .map(wine => {
            const item = winesSommati.find(item => item.wine_id === wine.id);
            return {
                ...wine,
                quantity: item.quantity
            };
        });

    console.log('questo è il render cart', renderCart);




    // console.log('crea la quantità', quantitaPerId);

    // console.log('questi sono gli id da filtrare', winesId)

    // const [total, setTotal] = useState(0);


    // useEffect(() => {
    //     const newTotal = culocart.reduce((acc, item) => acc + item.quantity * item.prezzo, 0);
    //     setTotal(newTotal);
    // }, [culocart]);

    return (
        <>

        </>
        // <>
        //     <table className={styles}>
        //         <thead>
        //             <tr>
        //                 <th>Prodotto</th>
        //                 <th>Quantità</th>
        //                 <th>Prezzo Unitario</th>
        //                 <th>Prezzo Totale</th>
        //             </tr>
        //         </thead>

        //         <tbody>
        //             {culocart.map(item => (
        //                 <tr key={item.id}>
        //                     <td>{item.vino}</td>

        //                     <td>{item.quantity}</td>

        //                     <td>{item.price.toFixed(2)}€</td>
        //                     <td>{(item.price * item.quantity).toFixed(2)}€</td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>

        //     <table className={styles}>
        //         <tr><td>Totale Imponibile</td><td>{total.toFixed(2)}€</td></tr>
        //         <tr><td>Tasse</td><td>Incluse</td></tr>
        //         <tr><td>Spedizione</td><td>GRATUITA</td></tr>
        //         <tr><td>Totale</td><td>{total.toFixed(2)}€</td></tr>
        //     </table>
        // </>
    )
}