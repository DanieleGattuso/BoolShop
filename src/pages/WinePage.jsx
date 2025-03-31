import axios from "axios";
import SearchBar from "../components/SearchBar";
import { useState, useEffect, useContext } from "react";
import wineContext from "../context/WineContext";
import { useSearchParams, useNavigate } from "react-router-dom";

// Importing CSS module for styling
import styles from "./Winespage.module.css";

// Importing the WineCard component to display individual wine items
import WineCard from "../components/WineCard";

// Main WinesPage component
export default function WinesPage() {



    const { cart, setCart } = useContext(wineContext);

    // State to store all wines fetched from the API
    const [wines, setWines] = useState([]);

    // State to store wines after applying filters or search
    const [filteredWines, setFilteredWines] = useState([]);

    // Hooks for handling URL parameters and navigation
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Extract the 'type' parameter from the URL (default is "tutti" if not provided)
    const filterType = searchParams.get("type") || "tutti";

    // Extract the 'name' parameter from the URL (default is an empty string if not provided)
    const searchQuery = searchParams.get("name") || "";

    // Function to fetch wines from the backend API based on filters and search query
    const fetchWines = () => {
        let url = "http://localhost:3000/api/wines";
        const params = [];

        // Add type filter to the API URL if a specific type is selected
        if (filterType !== "tutti") params.push(`type=${filterType}`);

        // Add search query parameter to the API URL if provided
        if (searchQuery) params.push(`search=${searchQuery}`);

        // Append parameters to URL if any exist
        if (params.length > 0) url += `?${params.join('&')}`;

        // Fetch wines from the backend using axios
        axios.get(url)
            .then(res => {
                setWines(res.data);            // Save fetched wines to the state
                setFilteredWines(res.data);    // Initially, filteredWines will also hold all fetched wines
            })
            .catch(err => console.error("Error fetching wines:", err));
    };

    // useEffect hook to call fetchWines whenever filterType or searchQuery parameters change
    useEffect(fetchWines, [filterType, searchQuery]);

    // Function to handle filter button clicks; navigates to URL with type parameter
    const handleFilter = (type) => {
        navigate(type === "tutti" ? "/winespage" : `/winespage?type=${type}`);
    };

    // Function to handle search submissions; navigates to URL with name parameter
    // Function to handle search submissions; navigates to URL with both type and name parameters
    const handleSearch = (name) => {
        const params = [];

        // Preserve current type filter in search if it's not "tutti"
        if (filterType !== "tutti") params.push(`type=${filterType}`);

        // Add search query parameter if provided
        if (name) params.push(`name=${name}`);

        // Construct the URL with the parameters
        const queryString = params.join("&");

        // Navigate to the updated URL
        navigate(`/winespage${queryString ? `?${queryString}` : ""}`);
    };

    // Function to render WineCard components for each wine in filteredWines state
    const renderWines = () => filteredWines.map(wine => (
        <WineCard key={wine.id} wineProps={wine} cart={cart} setCart={setCart} />
    ));

    // JSX to render the WinesPage UI
    return (
        <>
            <div className={styles.big_container}>
                <div className={styles.head_winelist_container}>
                    <h1>I NOSTRI VINI</h1>
                    <p>
                        Vini unici, tra varietà e blend, ognuno con una propria anima ma con un'origine comune: la Terra Booleana.
                    </p>



                </div>
            </div>

            <div className={styles.filters_container}>
                <div className={styles.buttons}>
                    <button
                        className={filterType === "tutti" ? styles.active : ""}
                        onClick={() => handleFilter("tutti")}
                    >
                        TUTTI
                    </button>
                    <button
                        className={filterType === "rosso" ? styles.active : ""}
                        onClick={() => handleFilter("rosso")}
                    >
                        ROSSI
                    </button>
                    <button
                        className={filterType === "bianco" ? styles.active : ""}
                        onClick={() => handleFilter("bianco")}
                    >
                        BIANCHI
                    </button>
                    <button
                        className={filterType === "rosato" ? styles.active : ""}
                        onClick={() => handleFilter("rosato")}
                    >
                        ROSATI
                    </button>
                    <button
                        className={filterType === "discount" ? styles.active : ""}
                        onClick={() => handleFilter("discount")}
                    >
                        OFFERTE
                    </button>

                </div>

                <SearchBar onSearch={handleSearch} className={styles.searchbar} />
            </div>

            <div className={styles.big_wines_list_container}>
                <div className={styles.wines_list_container}>
                    {filteredWines.length > 0 ? (
                        renderWines()
                    ) : (
                        <div>
                            <p>Nessun vino corrispondente ai criteri di ricerca. <button onClick={() => navigate('/winespage')}><b>Mostra tutti i vini.</b></button></p>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}

