
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from 'react';
import WineContext from "../context/WineContext";
import validCountries from "../functions/validCountries";
import styles from "./CheckoutPage.module.css"

export default function CheckoutPage() {
    const { cartPair, setCartPair, setCart } = useContext(WineContext);

    // mettiamo l'oggetto vuoto all'interno di una variabile
    const initialFormData = {
        // aggiungiamo tutte le proprietà che vogliamo mappare e assegniamo loro un valore iniziale.
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        zipCode: "",
        country: "",
        cart: cartPair,
    };

    // creiamo una variabile di stato che conterrà il nostro array di oggetti
    const [formData, setFormData] = useState(initialFormData);

    console.log('ciao', localStorage.getItem("sessionId"))
    // funzione per inviare i dati
    async function sendData(e) {
        e.preventDefault();
        console.log("Dati inviati:", formData);
        // const response = await axios.post(endpoint, formData)
        axios.post('http://localhost:3000/api/orders', formData)
            .then(response => {
                // console.log('Risposta:', response.data);
                window.location.href = response.data.url;
                localStorage.removeItem("sessionId")
                localStorage.setItem("sessionId", response.data.sessionId);
                setCart([])
                setCartPair([])
                localStorage.removeItem("cart")
            })
            .catch(error => {
                if (error.response) {
                    // La risposta è stata ricevuta, ma il server ha risposto con un codice di stato che indica un errore
                    console.error('Errore nella risposta:', error.response.data);
                    console.error('Codice di stato:', error.response.status);
                    console.error('Headers:', error.response.headers);
                } else if (error.request) {
                    // La richiesta è stata fatta, ma non è stata ricevuta alcuna risposta
                    console.error('Errore nella richiesta:', error.request);
                } else {
                    // Qualcosa è andato storto nel configurare la richiesta
                    console.error('Errore nella configurazione della richiesta:', error.message);
                }
            });
    }





    // Creiamo una funzione unica per gestire l'evento onChange dei nostri campi.
    function setFieldValue(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const validateInput = (event) => {
        const inputValue = event.target.name
        if (inputValue === "fullName" && !event.target.value) {
            event.target.setCustomValidity(`inserisci il tuo nome completo`)
        } else if (inputValue === "email" && !event.target.value) {
            event.target.setCustomValidity(`inserisci un'e-mail valida "@" `)
        } else if (inputValue === "phoneNumber" && !event.target.value) {
            event.target.setCustomValidity(`inserisci il tuo numero di telefono`)
        } else if (inputValue === "address" && !event.target.value) {
            event.target.setCustomValidity(`inserisci il tuo indirizzo di fatturazione`)
        } else if (inputValue === "zipCode" && !/^\d{5}$/.test(event.target.value)) {
            event.target.setCustomValidity(`Il codice postale deve essere composto da 5 numeri`)
        } else if (inputValue === "country" && !validCountries.includes(event.target.value.trim())) {
            event.target.setCustomValidity(`Paese non valido`)
        }
        else {
            event.target.setCustomValidity('');
        }
    }


    return (
        <>
            <div className="container">
                <h2 className="p-3">Ci siamo quasi...</h2>

                {/* da modificare la class */}
                <section className={styles.checkout_form}>

                    {/* form */}
                    <form onSubmit={sendData}>
                        <div className={`row ${styles.input_box}`}>
                            <div className="col-sm-12 col-lg-6 mb-3">
                                {/* fullname */}
                                <label htmlFor="input-fullname" className="form-label">Nome Completo</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={setFieldValue}
                                    required
                                    onInvalid={validateInput} // Attiva il messaggio personalizzato
                                    onInput={validateInput} // Rimuove l'errore quando l'utente inizia a scrivere
                                    className="form-control"
                                    id="input-fullname"
                                    placeholder="Inserisci il tuo nome"

                                />
                            </div>

                            <div className="col-sm-12 col-lg-6 mb-3">
                                {/* email */}
                                <label htmlFor="input-email" className="form-label">Indirizzo e-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={setFieldValue}
                                    required
                                    onInvalid={validateInput} // Attiva il messaggio personalizzato
                                    onInput={validateInput} // Rimuove l'errore quando l'utente inizia a scrivere
                                    className="form-control"
                                    id="input-email"
                                    placeholder="Inserisci la tua e-mail"
                                />
                            </div>

                            <div className="col-sm-12 col-lg-4 mb-3">
                                {/* phoneNumber */}
                                <label htmlFor="input-phoneNumber" className="form-label">Numero di telefono</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={setFieldValue}
                                    required
                                    onInvalid={validateInput} // Attiva il messaggio personalizzato
                                    onInput={validateInput} // Rimuove l'errore quando l'utente inizia a scrivere
                                    className="form-control"
                                    id="input-phoneNumber"
                                    placeholder="Inserisci il tuo Numero di telefono"
                                />
                            </div>

                            <div className="col-sm-12 col-lg-4 mb-3">
                                {/* address */}
                                <label htmlFor="address" className="form-label">Indirizzo</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={setFieldValue}
                                    required
                                    onInvalid={validateInput} // Attiva il messaggio personalizzato
                                    onInput={validateInput} // Rimuove l'errore quando l'utente inizia a scrivere
                                    className="form-control"
                                    id="input_address"
                                    placeholder="Inserisci il tuo indirizzo"
                                />
                            </div>

                            {/* Sezione file */}
                            <div className="col-sm-12 col-lg-4 mb-3">
                                <div>
                                    <label htmlFor="zipCode" className="form-label">Codice Postale</label>
                                </div>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={setFieldValue}
                                    required
                                    onInvalid={validateInput} // Attiva il messaggio personalizzato
                                    onInput={validateInput} // Rimuove l'errore quando l'utente inizia a scrivere
                                    className="form-control"
                                    id="input_zipCode"
                                    placeholder="Inserisci il tuo codice postale"
                                />
                            </div>
                            <div className="col-sm-12 col-lg-4 mb-3">
                                <div>
                                    <label htmlFor="country" className="form-label">Stato</label>
                                </div>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={setFieldValue}
                                    required
                                    onInvalid={validateInput} // Attiva il messaggio personalizzato
                                    onInput={validateInput} // Rimuove l'errore quando l'utente inizia a scrivere
                                    className="form-control"
                                    id="input_country"
                                >
                                    <option value="" disabled>Seleziona il tuo stato</option>
                                    {validCountries.map((country, index) => (
                                        <option key={index} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.box_button}>
                            <div className={styles.back_button} >
                                <Link to="/shopping-bag">Indietro</Link>
                            </div >
                            <div>
                                <button type="submit" className={styles.confirm_button}>Conferma</button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}
