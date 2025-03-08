import { useEffect, useState } from "react";
import { Auth } from "../../components/auth/auth";
import { NavLink } from "../../components/nav-link/nav-link";
import { useAuth } from "../../services/zustand/store";
import styles from "./admin.module.scss";
import { Preloader } from "../../components/preloader/preloader";
import { Button } from "../../components/button/button";
import { Modal } from "../../components/modal/modal";

export const Admin = () => {
  const { isAuthenticated, restoreSession, isLoading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    restoreSession();
  }, []);

  const handleLogOut = () => {
    logout();
  };

  const handleOpenRegister = () => {
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Preloader />
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <Auth isRegister={false} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Hello</h1>
      <div className={styles.container__nav}>
        <h2>Admin Panel</h2>
        <NavLink
          extraClassname={styles.container__nav__link}
          to="./hero"
          title="Main event"
        />
        <NavLink
          extraClassname={styles.container__nav__link}
          to="./videos"
          title="Videos"
        />
        <NavLink
          extraClassname={styles.container__nav__link}
          to="./festivals"
          title="Festivals"
        />
        <NavLink
          extraClassname={styles.container__nav__link}
          to="./news"
          title="News"
        />
        <NavLink
          extraClassname={styles.container__nav__link}
          to="./photos"
          title="Photos"
        />
        <NavLink
          extraClassname={styles.container__nav__link}
          to="./social"
          title="Social media"
        />
        <NavLink
          extraClassname={styles.container__nav__link}
          to="/"
          title="Home"
        />
        <Button
          type="button"
          buttonText="Register new user"
          onClick={handleOpenRegister}
          extraClassname={styles.container__nav__button}
        />

        <Button
          type="button"
          buttonText="Log out"
          onClick={handleLogOut}
          extraClassname={styles.container__nav__button}
        />
      </div>
      {isOpen && (
        <Modal onClose={handleClose}>
          <Auth isRegister />
        </Modal>
      )}
    </div>
  );
};
