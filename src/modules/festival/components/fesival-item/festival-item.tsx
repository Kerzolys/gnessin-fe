import { Button } from "../../../../components/button/button";
import { TFestival } from "../../../../services/types";

import styles from "./festival-item.module.scss";

export const FestivalItem = ({
  data,
  onClick,
}: {
  data: TFestival;
  onClick?: () => void;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__item} onClick={onClick}>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </div>
      <Button extraClassname={styles.container__button} buttonText="Подробнее" type="button" onClick={onClick} />
    </div>
  );
};
