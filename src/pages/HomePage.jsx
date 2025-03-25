import axios from "axios";


import styles from "./HomePage.module.css";

import videoBg from '../assets/vinogiusto.mp4';

export default function HomePage() {

    return (
        <>
            <div className={styles.homepage_video}>
                <video autoPlay loop muted playsInline>
                    <source src={videoBg} type="video/mp4" />
                    Il tuo browser non supporta il tag video.
                </video>

                <div className={styles.overlay_content}>
                    <h1>Siamo troppo forti</h1>
                </div>
            </div>
        </>
    )




}