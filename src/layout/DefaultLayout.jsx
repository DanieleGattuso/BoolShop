import { Outlet } from "react-router-dom"

import Header from "../components/Header"
import Footer from "../components/Footer"
import UspBar from "../components/UspBar"


export default function DefaultLayout() {

    return (
        <>
            <UspBar />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />

        </>
    )
}