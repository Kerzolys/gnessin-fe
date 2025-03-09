import { useEffect } from "react";

import styles from "./hero.module.scss";
import { Preloader } from "../../components/preloader/preloader";
import { useHeroEvent } from "../../services/zustand/store";

export const Hero = () => {
  const { heroEvent, loadHeroEvent, isLoading } = useHeroEvent();
  useEffect(() => {
    loadHeroEvent();
  }, []);
  if (!heroEvent) return <div className={styles.container_loading}></div>;
  return (
    <div className={styles.container}>
      {isLoading && heroEvent && <Preloader />}
      {/* {!heroEvent && <Preloader />} */}
      <h1 className={styles.container__heading}>{heroEvent.title}</h1>
      <span>{heroEvent.date}</span>
    </div>
  );
};
