// neverstoplearning
import { createContext, ReactNode, useEffect, useState } from 'react'
import { LevelUpModal } from '../components/LevelUpModal'

// cookies
import Cookies from 'js-cookie'

// desafios
import challenges from '../../challenge.json'

// dados do challenge (dos desafios)
type Challenge = {
    type: 'body' | 'eye'
    description: String
    amount: number
}

// tipo do value do ChallengesProviderProps
type ChallengesContextData = {
    level: number
    currentExperience: number
    challengeComplete: number
    activeChallenge: Challenge
    experienceToNextLevel: number
    levelUp: () => void
    startnewChallenge: () => void
    resetChallenge: () => void
    completeChallenge: () => void
    closeLevelUpModal: () => void
}

// tipo do children
type ChallengesProviderProps = {
    children: ReactNode;
    level: number
    currentExperience: number
    challengeComplete: number
}

// esse context serve para um componente se comunicar com outro
export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({
    children,
    ...rest
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengeComplete, setChallengeComplete] = useState(rest.challengeComplete ?? 0)

    const [activeChallenge, setActiveChallenge] = useState(null)
    // estado do modal
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    // calcular a experiência do usuário
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    // pedir para o usuário permitir notificação
    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengeComplete', String(challengeComplete))
    }, [level, currentExperience, challengeComplete])

    function levelUp() {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    // fechar modal
    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)
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
                completeChallenge,
                closeLevelUpModal
            }}
        >
            {children}
            { isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )
}