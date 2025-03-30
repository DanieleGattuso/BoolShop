import { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
    const [searchInput, setSearchInput] = useState("");

    const handleClick = () => {
        onSearch(searchInput.trim());
        setSearchInput("");
    };

    return (
        <div className={styles.searchbar_container}>
            <input
                type="text"
                value={searchInput}
                placeholder="Cerca un vino..."
                onChange={(e) => setSearchInput(e.target.value)}
                className={styles.input}
            />
            <button onClick={handleClick} className={styles.button}>
                Cerca!
            </button>
        </div>
    );
}

export default SearchBar;