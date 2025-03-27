import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// import css
import styles from "./Winespage.module.css";

// import wine card
import WineCard from "../components/WineCard";


export default function WinesPage() {

    // State to store all wines
    const [wines, setWines] = useState([]);

    // Hook to read and modify the query string
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Read the "type" parameter from the query string (default "tutti")
    const filterType = searchParams.get("type") || "tutti";

    // Function to fetch wines from the backend, modifying the URL based on the filter
    const fetchWines = () => {
        let url = "http://localhost:3000/api/wines";
        if (filterType !== "tutti") {
            url += `?type=${filterType}`;
        }

        axios.get(url)
            .then(res => {
                console.log("Wines received:", res.data);
                setWines(res.data);
            })
            .catch(err => console.error("Error fetching wines:", err));
    };

    // useEffect to call fetchWines when the component mounts or when the filter changes
    useEffect(fetchWines, [filterType]);

    // Function to update the filter and the query string in the URL
    const handleFilter = (type) => {
        // Use the correct route, matching your App.jsx route
        if (type === "tutti") {
            navigate("/winespage");
        } else {
            navigate(`/winespage?type=${type}`);
        }
    };

    // Function to render WineCard components for each wine
    const renderWines = () => wines.map(wine => (
        <WineCard key={wine.id} wineProps={wine} />
    ));

    return (
        <>

            {/* upper section with title, description and buttons */}
            <div className={styles.big_container}>
                <div className={styles.head_winelist_container}>
                    <h1>I NOSTRI VINI</h1>
                    <p>
                        Vini unici, tra varietali e blend, ognuno con una propria anima ma con un’origine comune: la Terra Booleana.
                    </p>
                    <div className={styles.buttons}>
                        <button onClick={() => handleFilter("tutti")}>TUTTI</button>
                        <button onClick={() => handleFilter("rosso")}>ROSSI</button>
                        <button onClick={() => handleFilter("bianco")}>BIANCHI</button>
                        <button onClick={() => handleFilter("rosato")}>ROSATI</button>
                    </div>
                </div>
            </div>

            {/* down section with wine list of wine cards */}
            <div className={styles.big_wines_list_container}>
                <div className={styles.wines_list_container}>
                    {renderWines()}
                </div>
            </div>
        </>
    );
}