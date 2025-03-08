import { useEffect } from "react";

import { useSocialState } from "../../services/zustand/store";
import { SocialLink } from "../social-link/social-link";
import styles from "./footer.module.scss";
import { Preloader } from "../preloader/preloader";

export const Footer = () => {
  const { social, loadSocial, isLoading } = useSocialState();
  useEffect(() => {
    loadSocial();
  }, []);
  return (
    <div className={styles.footer}>
      <div className={styles.footer__social}>
        {isLoading && social.length > 0 && <Preloader />}
        {social.map((social) => {
          return <SocialLink key={social.id} data={social} />;
        })}
      </div>
      &copy; Kerzolys.Frontend 2024
    </div>
  );
};
