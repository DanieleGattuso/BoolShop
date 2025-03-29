import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js non è ancora caricato
            console.log("Stripe non è caricato, attendi il caricamento completo");
            return;
        }

        // Conferma il pagamento con il clientSecret che hai ricevuto dal server
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/payment-success', // URL dove l'utente sarà indirizzato dopo il pagamento
            },
        });

        if (error) {
            console.log("Errore:", error.message); // Mostra eventuali errori nel processo di pagamento
        } else if (paymentIntent.status === 'succeeded') {
            console.log("Pagamento completato con successo:", paymentIntent);
            // Puoi fare altre operazioni come aggiornare lo stato o reindirizzare l'utente
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" disabled={!stripe}>Paga</button>
        </form>
    );
}