// HTML no nextjs
import Head from "next/head";
import { GetServerSideProps } from "next";

//login
import { useSession } from "next-auth/client";

// componentes
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import { Load } from "../components/Load";
import { Login } from "../components/Login";
import { Navbar } from "../components/navbar";

import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengeContext";

// style
import styles from "../styles/pages/Home.module.css";

type HomeProps = {
  level: number;
  currentExperience: number;
  challengeComplete: number;
};

export default function Home(props: HomeProps) {
  const [session, loading] = useSession();

  if (loading) return <Load />;
  return (
    <>
      {
        // se não tiver logado mostre
        !session && (
          <>
            <Login />
          </>
        )
      }

      {
        //pessoa logada
        session && (
          <>
            <Navbar isHome isRank={false} >
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
                    <div className={styles.challengeBox}>
                      <ChallengeBox />
                    </div>
                  </section>
                </CountdownProvider>
              </div>
            </ChallengesProvider>
            </Navbar>
          </>
        )
      }
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengeComplete } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeComplete: Number(challengeComplete),
    },
  };
};
