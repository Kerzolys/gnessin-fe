import { useEffect } from "react";
import { Auth } from "../../components/auth/auth";
import { NavLink } from "../../components/nav-link/nav-link";
import { useAuth } from "../../services/zustand/store";
import styles from "./admin.module.scss";
import { Preloader } from "../../components/preloader/preloader";
import { Button } from "../../components/button/button";

export const Admin = () => {
  const { isAuthenticated, restoreSession, isLoading, logout } = useAuth();
  console.log("auth", isAuthenticated);

  useEffect(() => {
    restoreSession();
  }, []);

  const handleLogOut = () => {
    logout();
  }

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
        <Button type="button" buttonText="Log out" onClick={handleLogOut} />
      </div>
    </div>
  );
};
