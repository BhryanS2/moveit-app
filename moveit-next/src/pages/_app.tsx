// styles
import '../styles/global.css'

// contexto do usuário
import { ChallengesContext, ChallengesProvider } from "../contexts/ChallengeContext"

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp
