
import React, { useState, useEffect } from 'react';
import styles from './UspBar.module.css';

const messages = [
    'Spedizione gratuita su ordini superiori a €99!',
    'Vini selezionati da sommelier certificati',
    'Reso gratuito entro 30 giorni!',
];

const UspBar = () => {
    const [currentMessage, setCurrentMessage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length);
        }, 5000); // cambia frase ogni 5 secondi

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.usp_bar}>
            <p key={currentMessage} className={styles.fade}>
                {messages[currentMessage]}
            </p>
        </div>
    );
};

export default UspBar;