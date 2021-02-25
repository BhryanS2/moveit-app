// neverstoplearning
import { createContext, ReactNode, useEffect, useState } from 'react'

// desafios
import challenges from '../../challenge.json'

// dados do challenge (dos desafios)
interface Challenge {
    type: 'body' | 'eye'
    description: String
    amount: number
}

// tipo do value do ChallengesProviderProps
interface ChallengesContextData {
    level: number
    currentExperience: number
    challengeComplete: number
    activeChallenge: Challenge
    experienceToNextLevel: number
    levelUp: () => void
    startnewChallenge: () => void
    resetChallenge: () => void
    completeChallenge: () => void
}

// tipo do children
interface ChallengesProviderProps {
    children: ReactNode;
}


// esse context serve para um componente se comunicar com outro
export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengeComplete, setChallengeComplete] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null)

    // calcular a experiência do usuário
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    // pedir para o usuário permitir notificação
    useEffect(() => {
        Notification.requestPermission()
    }, [])

    function levelUp() {
        setLevel(level + 1)
    }

    // mostra um desafio aleatorio
    function startnewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification("Novo desafio", {
                body: `Valendo ${challenge.amount} xp!`
            }) 
        }
    }

    // zera o desafio
    function resetChallenge() {
        setActiveChallenge(null)
    }

    // desafio completo
    function completeChallenge() {
        if (!activeChallenge) return;
        const { amount } = activeChallenge

        // console.log(activeChallenge)

        let finalExperience = currentExperience + amount

        // console.log(finalExperience)

        if (finalExperience >= experienceToNextLevel) {
            finalExperience -= experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengeComplete(challengeComplete + 1)
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengeComplete,
                levelUp,
                experienceToNextLevel,
                startnewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge
            }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}