import { useState, useEffect } from 'react'

// style
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
    // funcinamento do countdown
    const [time, setTime] = useState(25 * 60)
    const [active, setActive] = useState(false)


    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    // O podStart serve para verificar se o número tem dois algarismo, se não tiver ele coloca um 0
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    function startCountdown() {
        setActive(true)
        
        // active ? setActive(false) : setActive(true)
        // o useEffect funciona como quando mudar/acontecer eu quero executar uma function
    }

    // eu quero executar uma function quadno o valor de active mudar
    useEffect(() => {
        
        if (active && time > 0) {
            setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }

    }, [active, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            <button
                type='button'
                className={styles.countdownButton}
                onClick={startCountdown}
            >
                iniciar um ciclo
            </button>
        </div>
    )
}