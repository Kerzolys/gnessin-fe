import { useEffect, useState } from "react";
import { NavLink } from "../nav-link/nav-link";

import styles from "./header.module.scss";

export const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if(navIsOpen) {
      document.body.style.overflow = "hidden";
    }else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [navIsOpen]);

  const handleNavOpen = () => {
    setNavIsOpen(true);
  };

  const handleNavClose = () => {
    setNavIsOpen(false);
  };

  if (isMobile && !navIsOpen) {
    return (
      <div className={styles.container}>
        <img src="/assets/logo.png" alt="logo" />
        <div className={styles.container__nav} onClick={handleNavOpen}>
          <div className={styles.container__nav_mobile}></div>
        </div>
      </div>
    );
  }

  if (isMobile && navIsOpen) {
    return (
      <div className={styles.container_mobile}>
        <div className={styles.nav_mobile}>
          <button onClick={handleNavClose} className={styles.nav_mobile__close}>
            &times;
          </button>
          <NavLink to="/" title="Главная" />
          <NavLink to="/about" title="История" />
          <NavLink to="/event" title="События" />
          <NavLink to="/contacts" title="Контакты" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__nav}>
        <NavLink to="/" title="Главная" />
        <NavLink to="/about" title="История" />
      </div>
      <img src="/assets/logo.png" alt="logo" />
      <div className={styles.container__nav}>
        <NavLink to="/event" title="События" />
        <NavLink to="/contacts" title="Контакты" />
      </div>
    </div>
  );
};
