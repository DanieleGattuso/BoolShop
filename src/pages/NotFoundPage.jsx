import videoBg from "../assets/ai-error.mp4";
import { useRef, useEffect } from "react";
import styles from "./NotFoundPage.module.css"; // Importa il file CSS

export default function NotFoundPage() {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.9; // Rallenta il video
        }
    }, []);

    return (
        <div className='container py-4'>
            <h1>🍷 Ops! Il vino è andato in testa...</h1>
            <h2>Forse è il caso di tornare alla <a href="/" className={styles.link}>HOME</a> per ritrovare la strada giusta! 🏠</h2>
            <p className={styles.subText}>Nel dubbio, respira, bevi un bicchiere d'acqua e riprova. O magari apri un'altra bottiglia! 😉</p>
            <div className={styles.videoBox}>
                <video ref={videoRef} autoPlay loop muted playsInline>
                    <source src={videoBg} type="video/mp4" />
                </video>
            </div>
        </div>
    );
}