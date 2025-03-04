import { THeroEvent } from "../../services/types";

import styles from "./hero.module.scss";

type HeroProps = {
  heroEvent: THeroEvent;
};

export const Hero: React.FC<HeroProps> = ({ heroEvent }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.container__heading}>{heroEvent.title}</h1>
      <span>{heroEvent.date}</span>
    </div>
  );
};
