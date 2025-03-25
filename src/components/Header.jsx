// Import module react router

import { Link } from "react-router-dom";


import logo from '../assets/provaLogo.png'

export default function Header() {

    return (

        // Header section
        <header>

            {/* USP bar section */}
            <div className="usp_bar">

                <p>Consegna gratuita per ordini superiori a 99€</p>

            </div>

            {/* Big header container */}
            <div className="header_container">

                {/* Logo container */}

                <div className="logo_container">

                    <Link to='/'>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>

                {/* Page link container */}

                <div className="page_link_container">
                    <Link to='/'>
                        <p> HOME PAGE</p>
                    </Link>

                    <p> I NOSTRI VINI</p>
                    <p> CONTATTI</p>
                </div>

                {/* Nav container */}

                <div className="nav_container">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <i class="fa-solid fa-bars"></i>
                </div>


            </div>



        </header>




    )
}