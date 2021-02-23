// agora usamos o css module, ele funciona como um styleshhet em rect-native
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/BhryanS2.png" alt="BHryan" />
            <div>
                <strong>BhryanS2</strong>
                <p>
                    {/* os arquivos dentro de public, podem ser acessados como se tivessem na mesma pasta */}
                    <img src="icons/level.svg" alt="level" />
                    Level 1
                </p>
            </div>
        </div>
    )
}