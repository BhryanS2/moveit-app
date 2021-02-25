// HTML no nextjs
import Head from 'next/head'

// componentes
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from '../contexts/CountdownContext';

// style
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    
    <div className={styles.container}>
      <Head>
        <title>Início | moveit</title>
      </Head>

      <ExperienceBar />

      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>

    </div>
  )
}
