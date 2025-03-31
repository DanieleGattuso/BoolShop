import { Outlet } from "react-router-dom"

import { useLocation } from 'react-router-dom';

import Header from "../components/Header"
import Footer from "../components/Footer"
import UspBar from "../components/UspBar"

import styles from "../components/Header.module.css";


export default function DefaultLayout() {

    const location = useLocation();

    // controlla se siamo su WinePage
    const isWinePage = location.pathname === '/winespage';
    return (
        <>
            <UspBar />
            <header className={isWinePage ? styles.sticky_header : ''}>
                <Header />
            </header>

            <main>
                <Outlet />
            </main>
            <Footer />

        </>
    )
}