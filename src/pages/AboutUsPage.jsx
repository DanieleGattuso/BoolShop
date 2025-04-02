import Image from '../assets/grapes.jpg';
import styles from "./AboutUsPage.module.css"


export default function WineDetailsPage() {


    return (
        <>
            <div className={styles.imgcontainer}>
                <img className={styles.img} src={Image} alt="" />
            </div>

            <div className={styles.text_container}>
                <p>
                    Nel cuore della nostra terra, dove il sole bacia i filari e il vento racconta storie antiche, nascono i vini delle Cantine Booleane.
                    Siamo una realtà familiare profondamente legata al territorio, tra le dolci colline e le rocce assolate del Sud, dove la vite affonda le radici in un suolo generoso di storia, calcare e passione.

                    La nostra cantina è prima di tutto una scelta di vita: quella di rispettare il tempo, la terra e le tradizioni contadine che ci hanno cresciuto.
                    Ogni bottiglia è il frutto di un lavoro paziente, fatto a mano, con tecniche sostenibili che mettono al centro l’ambiente e il futuro.
                    Non usiamo pesticidi chimici, minimizziamo gli sprechi d’acqua e scegliamo solo energie rinnovabili per alimentare la nostra produzione.

                    Crediamo che il vino debba parlare non solo di gusto, ma anche di etica.
                    Ecco perché coltiviamo in biologico, proteggiamo la biodiversità dei nostri vigneti e investiamo nella rigenerazione del suolo.
                    Ogni calice che offriamo è un gesto d’amore verso questa terra che ci dona tutto.

                    Alle Cantine Booleane non produciamo solo vino.
                    Coltiviamo memoria, identità e rispetto.
                    Perché la vera qualità nasce da una terra che viene ascoltata, non sfruttata.
                </p>
            </div>

        </>
    );
}