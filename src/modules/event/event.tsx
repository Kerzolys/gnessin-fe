import { useEffect } from "react";
import { useEventState } from "../../services/zustand/store";
import { Preloader } from "../../components/preloader/preloader";

import styles from "./event.module.scss";

export const Event = () => {
  const { isLoading, event, loadEvent } = useEventState();
  useEffect(() => {
    loadEvent();
  }, []);

  if (isLoading) return <Preloader />;
  if (!event)
    return (
      <h2>
        Пока событий не предвидится, но все может измениться! Следите за нашими
        обновлениями в социальных сетях
      </h2>
    );
  return (
    <div className={styles.container}>
      <h2>{event.title}</h2>
      <h3>Описание</h3>
      <p>{event.description}</p>
      <h3>Даты</h3>
      <p>{event.date}</p>
      <h3>Условия</h3>
      <p>{event.conditions}</p>
    </div>
  );
};
