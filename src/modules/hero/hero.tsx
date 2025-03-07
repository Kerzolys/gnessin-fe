import { useEffect } from "react";

import styles from "./hero.module.scss";
import { Preloader } from "../../components/preloader/preloader";
import { useHeroEvent } from "../../services/zustand/store";

export const Hero = () => {
  const { heroEvent, loadHeroEvent } = useHeroEvent();
  useEffect(() => {
    loadHeroEvent();
  }, []);
  if (!heroEvent) return <Preloader />;
  return (
    <div className={styles.container}>
      <h1 className={styles.container__heading}>{heroEvent.title}</h1>
      <span>{heroEvent.date}</span>
    </div>
  );
};
