// styles
import '../styles/global.css'

// contexto do usuário
import { ChallengesProvider } from "../contexts/ChallengeContext"

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
