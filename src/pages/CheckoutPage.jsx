import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';


// mettiamo l'oggetto vuoto all'interno di una variabile
const initialFormData = {
    // aggiungiamo tutte le proprietà che vogliamo mappare e assegniamo loro un valore iniziale.
    fullName: '',
    email: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    country: "",
    cart: [
        { "wine_id": 5, "quantity": 3 },
        { "wine_id": 12, "quantity": 2 }
    ]
    // cart:"" da vedere come fare
};

export default function CheckoutPage() {
    const endpoint = 'http://localhost:3000/api/orders';

    // creiamo una variabile di stato che conterrà il nostro array di oggetti
    const [formData, setFormData] = useState(initialFormData);

    // funzione per inviare i dati
    function sendData(e) {
        e.preventDefault();
        console.log("Dati inviati:", formData);
        axios.post(endpoint, formData)
            .then(response => {
                console.log("Ordine inviato con successo:", response.data);
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
                                    className="form-control"
                                    id="input_zipCode"
                                    placeholder="Inserisci il tuo codice postale"
                                />
                            </div>
                            <div className="mb-3 col">
                                <div>
                                    <label htmlFor="country" className="form-label">Stato</label>
                                </div>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={setFieldValue}
                                    className="form-control"
                                    id="input_country"
                                    placeholder="Inserisci lo stato"
                                />
                            </div>
                        </section>

                        <div className="d-flex justify-content-end pb-3">
                            <Link to='/'>
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
