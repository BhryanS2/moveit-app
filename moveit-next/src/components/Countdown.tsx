import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'

// style
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout

// jornada infinita
export function Countdown() {
    // contexto
    const { startnewChallenge } = useContext(ChallengesContext)

    // funcionamento do countdown
    const [time, setTime] = useState(0.1 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFineshed] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    // O podStart serve para verificar se o número tem dois algarismo, se não tiver ele coloca um 0
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    function startCountdown() {
        setIsActive(true)
        //isactive ? setIsActive(false) : setIsActive(true)
        // o useEffect funciona como quando mudar/acontecer eu quero executar uma function
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(0.1 * 60)
    }

    // eu quero executar uma function quadno o valor de isactive mudar
    useEffect(() => {

        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFineshed(true)
            setIsActive(false)
            startnewChallenge()
        }

    }, [isActive, time])

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

            {hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                    <img src="icons/FinishedCicle.svg" alt="Fim de ciclo"/>
                </button>
            ) : (
                <>
                    {isActive ? (
                        <button
                            type='button'
                            className={`${styles.countdownButton}  ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button
                            type='button'
                            className={`${styles.countdownButton}`}
                            onClick={startCountdown}
                        >
                            Inicionar um ciclo
                        </button>
                    )}
                </>
                )}
        </div>
    )
}