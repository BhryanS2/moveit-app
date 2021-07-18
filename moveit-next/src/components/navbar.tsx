import { signOut } from "next-auth/client";
import Link from "next/link";
import React, { ReactNode, useState } from "react";

import style from "../styles/components/Nav.module.css";

type NavProps = {
  isHome: boolean;
  isRank: boolean;
  children?: ReactNode;
};

export function Navbar({ isHome, isRank, children }: NavProps) {
  const activeAwerd = isRank;
  const activeHome = isHome;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <React.Fragment>
      <div className={style.Body}>
        <nav>
          {isOpen ? (
            <div className={style.NavBar}>
              <div>
                <img src="./icons/logoIcon.svg" alt="logo" />
                <button onClick={toggle}>close nav</button>
              </div>
              <div className={style.NavContainer}>
                {activeHome ? (
                  <button className={`${style.ActiveNav} ${style.buttons}`}>
                    <Link href="/">
                      <img src="./icons/home-active.svg" alt="home" />
                    </Link>
                  </button>
                ) : (
                  <button className={style.buttons}>
                    <Link href="/">
                      <img src="./icons/home.svg" alt="home" />
                    </Link>
                  </button>
                )}
                {/* {activeAwerd ? (
                  <button className={`${style.ActiveNav} ${style.buttons}`}>
                    <Link href="/Rank">
                      <img src="./icons/award-active.svg" alt="medalha" />
                    </Link>
                  </button>
                ) : (
                  <button className={style.buttons}>
                    <Link href="/Rank">
                      <img src="./icons/award.svg" alt="medalha" />
                    </Link>
                  </button>
                )} */}
              </div>
              <div>
                <button onClick={() => signOut()}>Sing out</button>
              </div>
            </div>
          ) : (
            <div className={style.NavBarOff}>
              <button onClick={toggle}>Open nav</button>
            </div>
          )}
        </nav>
        {children}
      </div>
    </React.Fragment>
  );
}
