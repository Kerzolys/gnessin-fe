import { Link } from "react-router-dom";

import styles from "./nav-link.module.scss";

type NavLinkProps = {
  to: string;
  title: string;
};

export const NavLink: React.FC<NavLinkProps> = ({ to, title }) => {
  return (
    <Link to={to} className={styles.navLink}>
      {title}
    </Link>
  );
};

