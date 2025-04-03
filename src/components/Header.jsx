import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from '../assets/Cantine_Booleane.svg';
import { useContext, useState, useEffect } from "react";
import wineContext from "../context/WineContext";
import { FaBars } from 'react-icons/fa'; // icona hamburger

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [bounce, setBounce] = useState(false); // Stato per bounce animazione

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const { cart } = useContext(wineContext);
    let cartQuantity = cart.length;

    // Triggera l'animazione bounce ogni volta che cambia la quantità nel carrello
    useEffect(() => {
        if (cartQuantity > 0) {
            setBounce(true);
            const timer = setTimeout(() => setBounce(false), 400);
            return () => clearTimeout(timer);
        }
    }, [cartQuantity]);

    return (
        <header className={styles.sticky_header}>
            <div className={styles.header_container}>
                <div className={styles.small_header_container}>
                    {/* Logo */}
                    <div className={styles.logo_container}>
                        <Link to='/'>
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>

                    {/* Menu desktop */}
                    <div className={styles.page_link_container}>
                        <Link className={styles.underline_hover} to='/'>HOME PAGE</Link>
                        <Link className={styles.underline_hover} to='/winespage'>I NOSTRI VINI</Link>
                        <Link className={styles.underline_hover} to='/aboutuspage'>CHI SIAMO</Link>
                    </div>

                    {/* Carrello + Hamburger */}
                    <div className={styles.nav_container}>
                        <Link to='/shopping-bag'>
                            <div className={styles.icon_cart}>
                                <i className="fa-solid fa-bag-shopping"></i>
                                {cartQuantity > 0 && (
                                    <p className={bounce ? styles.cart_bounce : ""}>{cartQuantity}</p>
                                )}
                            </div>
                        </Link>
                        <FaBars onClick={toggleMenu} className={styles.hamburger_icon} />
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className={styles.mobile_menu}>
                    <Link className={styles.mobile_link} to='/' onClick={toggleMenu}>HOME PAGE</Link>
                    <Link className={styles.mobile_link} to='/winespage' onClick={toggleMenu}>I NOSTRI VINI</Link>
                    <Link className={styles.underline_hover} to='/aboutuspage' onClick={toggleMenu}>CHI SIAMO</Link>
                </div>
            )}
        </header>
    );
}