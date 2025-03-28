import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./WineDetailsPage.module.css";
import { useParams } from "react-router-dom";


export default function WinesDetailPage() {

    // recuperiamo l'id
    const { id } = useParams();

    const [wineDetails, setWineDetails,] = useState({});

    // Function call axios

    function fetchWine() {

        axios.get(`http://localhost:3000/api/wines/${id}`)

            .then(res => {
                setWineDetails(res.data)

            })

            .catch(err => {
                console.log(err);
                // if (err.status === 404) redirect ("/PageNotFound")

            })


    }

    useEffect(fetchWine, [id]);

    function renderWineDetails() {
        return (
            <>

                <h1 className={styles.background_text} >{wineDetails.name}</h1>
                <img src={wineDetails.image} alt={wineDetails.name} className={styles.bottle} />
            </>
        );
    }
    return (

        <>
            <div className={`${styles.hero_section} ${styles[wineDetails.type]}`}>
                {renderWineDetails()}
            </div>

        </>
    )


}
