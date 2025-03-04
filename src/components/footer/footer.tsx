import { testSocial } from "../../services/tests/testSocial";
import { SocialLink } from "../social-link/social-link";
import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__social}>
        {testSocial.map((social) => {
          return <SocialLink key={social.id} data={social} />;
        })}
      </div>
      &copy; Kerzolys.Frontend 2024
    </div>
  );
};
