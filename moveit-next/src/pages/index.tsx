// HTML no nextjs
import Head from 'next/head'
import { GetServerSideProps } from 'next'

//login
import {useSession } from 'next-auth/client'

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

import { Load } from '../components/Load';
import { Login } from '../components/Login';

import { Navbar } from '../components/navbar';
import { useState } from 'react';

type HomeProps = {
  level: number
  currentExperience: number
  challengeComplete: number
}

export default function Home(props: HomeProps) {
  const [ session, loading ] = useSession()
  const [navOpen, setNavOpen] = useState(false)
  if(loading) return <Load/>
  const toggle = () => setNavOpen(!navOpen)
  return <>
    {
      // se não tiver logado mostre
      !session && <>
        <Login/>
      </>
    }

    {
      //pessoa logada
      session && <>
        {
          navOpen? (
            <div className={styles.NavBar}>
              <Navbar toggle={toggle}/>
            </div>
            ) : (
              <div className={styles.NavBarOff}>
                <button onClick={toggle}>Open nav</button>
              </div>
            )
        }
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

            <CountdownProvider >
              <section>
                <div>
                  <Profile />
                  <CompletedChallenges />
                  <Countdown />
                </div>
                <div className={styles.challengeBox}>
                  <ChallengeBox />
                </div>
              </section>
            </CountdownProvider>

          </div>

        </ChallengesProvider>
      </>
    }
  </>
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
