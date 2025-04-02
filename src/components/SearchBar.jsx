import { useState } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from 'react-icons/fa'

function SearchBar({ onSearch }) {
    const [searchInput, setSearchInput] = useState("");

    const handleClick = () => {
        if (searchInput.trim() === "") return; // Evita ricerche vuote
        onSearch(searchInput.trim());
        setSearchInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleClick();
        }
    };

    return (
        <div className={styles.searchbar_container}>
            <input
                type="text"
                value={searchInput}
                placeholder="Cerca un vino..."
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}  // Aggiunto evento per il tasto Enter
                className={styles.input}
            />

            <FaSearch onClick={handleClick} className={styles.lens} />




        </div>
    );
}

export default SearchBar;
