import { signIn } from "next-auth/client";
import style from "../styles/components/Login.module.css";

export function Login() {
  return (
    <section className={style.ContainerLogin}>
      <div className={style.Image}>
        <img src="./icons/simbolo.svg" alt="logo" />
      </div>
      <main className={style.ContentContainer}>
        <div className={style.Content}>

          <section className={style.ContentSection}>
            <img src="./icons/logo.svg" alt="logo" />
          </section>

          <section className={style.ContentMain}>
            <h1>Bem-vindo</h1>
            <div className={style.GitHubContainer}>
              <img src="./icons/Github.svg" alt="github-logo" />
              <p>Faça login com seu Github para começar</p>
            </div>
          </section>

          <button onClick={() => signIn()}>Sign in</button>
        </div>
      </main>
    </section>
  );
}
