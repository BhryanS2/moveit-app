// agora usamos o css module, ele funciona como um styleshhet em rect-native
import { useContext } from 'react'

import { ChallengesContext } from '../contexts/ChallengeContext'

import { useSession } from 'next-auth/client'

import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const [session, loading] = useSession()
    const { level } = useContext(ChallengesContext)
    
    return (
        <div className={styles.profileContainer}>
            <img src={session.user.image} alt={session.user.name} />
            <div>
                <strong>{session.user.name}</strong>
                <p>
                    {/* os arquivos dentro de public, podem ser acessados como se tivessem na mesma pasta */}
                    <img src="icons/level.svg" alt="level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}