import React, { useState, useEffect } from 'react';
import style from "./PopUp.module.css";

export default function Popup() {
    const [birthYear, setBirthYear] = useState(''); // Store only the birth year
    const [isAdult, setIsAdult] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Check if the user has already verified their age
    useEffect(() => {
        const isAgeVerified = localStorage.getItem('ageVerified');
        if (!isAgeVerified) {
            setShowPopup(true);
        } else {
            setIsAdult(true);
        }
    }, []);

    // Function to calculate age based on the birth year
    const calculateAge = (year) => {
        if (!year || isNaN(year) || year.length !== 4) return NaN;
        const currentYear = new Date().getFullYear();
        return currentYear - parseInt(year, 10);
    };

    // Handle birth year submission
    const handleSubmit = () => {
        if (!birthYear || birthYear.length !== 4) {
            setErrorMessage("Inserisci un anno valido.");
            return;
        }

        const age = calculateAge(birthYear);
        if (age < 0 || age > 130) {
            setErrorMessage("Inserisci un anno di nascita valido.");
            return;
        }

        if (age >= 18) {
            setIsAdult(true);
            localStorage.setItem('ageVerified', 'true');
            setShowPopup(false);
        } else {
            setErrorMessage("Devi avere almeno 18 anni per accedere a questo sito.");
        }
    };

    return (
        <>
            {showPopup && !isAdult && (
                <div className={style.popup_overlay}>
                    <div className={style.popup_content}>
                        <h2>Verifica dell'età</h2>
                        <p>Inserisci il tuo anno di nascita per accedere al sito.</p>
                        <input className={style.input} type="text"
                            value={birthYear}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ''); // Allow only numbers
                                if (value.length <= 4) setBirthYear(value);
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            placeholder="AAAA"
                        />
                        <button className={style.button} onClick={handleSubmit}>Invia</button>
                        {errorMessage && <p className={style.error}>{errorMessage}</p>}
                    </div>
                </div>
            )}
        </>
    );
}