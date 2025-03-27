// Import module react router

import { Link } from "react-router-dom";

// Import header css
import styles from "./Header.module.css";


import logo from '../assets/provaLogo.png'

export default function Header() {

    return (

        // Header section
        <header>



            {/* Big header container */}
            <div className={styles.header_container}>

                {/* Logo container */}

                <div className={styles.logo_container}>

                    <Link to='/'>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>

                {/* Page link container */}

                <div className={styles.page_link_container}>
                    <Link to='/'>
                        <p> HOME PAGE</p>
                    </Link>

                    <Link to='/winespage'>
                        <p> I NOSTRI VINI</p>
                    </Link>
                    <p> CONTATTI</p>
                </div>

                {/* Nav container */}

                <div className={styles.nav_container}>
                    <i className="fa-solid fa-bag-shopping"></i>
                    <i className="fa-solid fa-bars"></i>
                </div>


            </div>



        </header>




    )
}