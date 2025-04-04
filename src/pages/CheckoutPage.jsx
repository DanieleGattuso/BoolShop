
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from 'react';
import WineContext from "../context/WineContext";
import validCountries from "../functions/validCountries";
import styles from "./CheckoutPage.module.css"
import Toast from "../components/Toast";

export default function CheckoutPage() {
    // CONTEXT
    const { cartPair } = useContext(WineContext);
    // state for the form data
    const [formData, setFormData] = useState(initialFormData);
    // state for the error message
    const [errorMessage, setErrorMessage] = useState("")

    // initial state for the form
    const initialFormData = {
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        zipCode: "",
        country: "",
        cart: cartPair,
    };


    // function to set the value of the form fields
    function setFieldValue(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    // function to handle form submission
    async function sendData(e) {
        // cancel the default behavior of the form
        e.preventDefault();
        // console.log("Dati inviati:", formData);

        // api call to send the form data
        axios.post('http://localhost:3000/api/orders', formData)
            .then(response => {
                // console.log('Risposta:', response.data);

                // insert the sessionId in localStorage
                localStorage.setItem("sessionId", response.data.sessionId);
                // wait 100ms & redirect to the payment page 
                setTimeout(() => {
                    window.location.href = response.data.url;
                }, 500);
            })
            // handle errors
            .catch(error => {
                if (error.response) {
                    // error in data response
                    console.error('Errore nella risposta:', error.response.data.error);
                    // set the error message to the error message from the server
                    setErrorMessage(error.response.data.error)
                    // error status code
                    console.error('Codice di stato:', error.response.status);
                    // error headers
                    console.error('Headers:', error.response.headers);
                } else if (error.request) {
                    // request was made but no response was received
                    console.error('Errore nella richiesta:', error.request);
                } else {
                    // something happened in setting up the request
                    console.error('Errore nella configurazione della richiesta:', error.message);
                }
            });
    }


    // function to validate the input fields
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
            {errorMessage && <Toast message={`ERRORE NEL PROSEGUIRE NELL'ORDINE`} />}
            {/* {errorMessage != "" ? <div>{errorMessage}</div> : */}
            <div className="container">
                <h2 className="p-3">Ci siamo quasi...</h2>

                {/* checkout form */}
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

                            {/* country */}
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
                            {/* button to return in the shopping bag */}
                            <div className={styles.back_button} >
                                <Link to="/shopping-bag">Indietro</Link>
                            </div >
                            {/* button to confirm the order */}
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
