import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from 'react';
import WineContext from "../context/WineContext";
import validCountries from "../functions/validCountries";


export default function CheckoutPage() {
    const { cartPair, setCartPair, setCart } = useContext(WineContext);


    // mettiamo l'oggetto vuoto all'interno di una variabile
    const initialFormData = {
        // aggiungiamo tutte le proprietà che vogliamo mappare e assegniamo loro un valore iniziale.
        fullName: '',
        email: "",
        phoneNumber: "",
        address: "",
        zipCode: "",
        country: "",
        cart: cartPair,
    };


    const endpoint = 'http://localhost:3000/api/orders';

    // creiamo una variabile di stato che conterrà il nostro array di oggetti
    const [formData, setFormData] = useState(initialFormData);

    // funzione per inviare i dati
    function sendData(e) {
        e.preventDefault();
        console.log("Dati inviati:", formData);
        axios.post(endpoint, formData)
            .then(response => {
                console.log("Ordine inviato con successo:", response.data)
                setFormData(initialFormData);
                localStorage.clear();
                setCart([]);
                setCartPair([]);


            })
            .catch(error => {
                console.error("Errore nell'invio dell'ordine:", error.response?.data || error.message);
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
            event.target.setCustomValidity(`inserisci un'email valida "@" `)
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
                <h1>Inserisci i tuoi dati</h1>

                {/* da modificare la class */}
                <section className='add-trip-sections'>

                    {/* form */}
                    <form onSubmit={sendData}>
                        <div className='row'>
                            <div className="col-6 mb-3">
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

                            <div className="col mb-3">
                                {/* email */}
                                <label htmlFor="input-email" className="form-label">Email</label>
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
                                    placeholder="Inserisci la tua email"
                                />
                            </div>

                            <div className="col mb-3">
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
                        </div>

                        <div className="row">
                            <div className="col mb-3">
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
                        </div>

                        {/* Sezione file */}
                        <section className='row'>
                            <div className="mb-3 col">
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
                            <div className="mb-3 col">
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
                        </section>

                        <div className="d-flex justify-content-end pb-3">
                            <Link to='/shopping-bag'>
                                <button type="button" className="btn btn-secondary mx-3">Indietro</button>
                            </Link>
                            <button type="submit" className="btn btn-primary">Conferma</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}
