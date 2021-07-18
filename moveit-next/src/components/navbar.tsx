import { signOut } from 'next-auth/client';
import Link from 'next/link'

import style from '../styles/components/Nav.module.css'

type NavProps = {
    toggle: () => void
}

export function Navbar({toggle}:NavProps) {
    const activeAwerd=false;
    const activeHome=false;
    return (
        <nav>
            <div>
                <img src="./icons/logoIcon.svg" alt="logo" />
                <button onClick={() => signOut()}>Sing out</button>
                <button onClick={toggle}>close nav</button>
            </div>
            <div>
                {
                    activeHome ? (
                        <button className={style.ActiveNav}>
                            <Link href="/">
                                <img src="./icons/home" alt="home" />
                            </Link>
                        </button>
                    ) : (
                        <button className={style.DisableNav}>
                            <Link href="/">
                                <img src="./icons/home" alt="home" />
                            </Link>
                        </button>
                    )
                }
                {
                    activeHome ? (
                        <button className={style.ActiveNav}>
                            <Link href="/Rank">
                                <img src="./icons/award" alt="medalha" />
                            </Link>
                        </button>
                    ) : (
                        <button className={style.DisableNav}>
                            <Link href="/Rank">
                                <img src="./icons/award" alt="medalha" />
                            </Link>
                        </button>
                    )
                }
            </div>
        </nav>
    )
}