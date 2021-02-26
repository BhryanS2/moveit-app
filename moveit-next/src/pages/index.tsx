// HTML no nextjs
import Head from 'next/head'
import { GetServerSideProps } from 'next'

// componentes
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from '../contexts/CountdownContext';

// style
import styles from '../styles/pages/Home.module.css'
import { ChallengesProvider } from '../contexts/ChallengeContext';

interface HomeProps {
  level: number
  currentExperience: number
  challengeComplete: number
}

export default function Home(props:HomeProps) {

  //console.log(props)

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengeComplete={props.challengeComplete}
    >
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
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengeComplete } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeComplete: Number(challengeComplete)
    }
  }
}
