
import styles from "./Footer.module.css";
import europe from "../assets/european-union.png"
import waves from "../assets/path.svg"

export default function Footer() {

    return (

        <footer>



            <div className={styles.footer_container}>

                <img src={waves} alt="" className={styles.footer_big_wave} />
                <div className={styles.footer_nav_bars_container}>

                    <div className={styles.footer_nav_bars}>
                        <ul>
                            <li>CHI SIAMO</li>
                            <li>COMUNITA'</li>
                            <li>TERRITORIO</li>
                        </ul>
                    </div>

                    <div className={styles.footer_nav_bars}>
                        <ul>
                            <li>I NOSTRI VINI</li>
                            <li>A TAVOLA</li>
                            <li>SOSTENIBILITA'</li>
                        </ul>
                    </div>

                    <div className={styles.footer_nav_bars}>
                        <ul>
                            <li>CONTATTI</li>
                            <li>SHOP</li>
                            <li>CANTINA BOOLWINE</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.social_container}>

                    <div className={styles.small_social_container}>

                        <img src={waves} alt="" className={styles.footer_small_waves} />

                    </div>

                    <div className={styles.small_social_container}>
                        <ul>
                            <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
                            <li><a href="#"></a><i className="fa-brands fa-instagram"></i></li>
                            <li><a href="#"></a><i className="fa-brands fa-youtube"></i></li>
                        </ul>

                    </div>

                    <div className={styles.small_social_container}>
                        <img src={waves} alt="" className={styles.footer_small_waves} />

                    </div>



                </div>

                <div className={styles.policy_container}>

                    <div className={styles.europe_container}>
                        <img src={europe} alt="EU Flag" className={styles.euFlag} />
                        <p>CAMPAIGN FINANCED ACCORDING TO EU REG. NO. 1308/2013</p>
                    </div>

                    <div className={styles.policy_nav_bar_container}>

                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#"></a>Cookie Policy</li>
                            <li><a href="#"></a>Crediti</li>
                        </ul>
                    </div>

                </div>

                <div className={styles.copyright_container}>
                    <p>Copyright © 2025 CANTINE BOOLEANE S.C.A - STRADA STATALE 115, 92013 MENFI (AG) - P.IVA 00071330849</p>
                </div>
            </div>

        </footer>
    )
}