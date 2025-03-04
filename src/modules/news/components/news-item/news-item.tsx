import { Button } from "../../../../components/button/button";
import { TNews } from "../../../../services/types";

import styles from "./news-item.module.scss";

export type NewsItemProps = {
  data: TNews;
  onClick: () => void;
};

export const NewsItem: React.FC<NewsItemProps> = ({ data, onClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__news} onClick={onClick}>
        <span>{data.date}</span>
        <h2>{data.title}</h2>
        <p>{data.shortDescription}</p>
      </div>
      <div className={styles.container__button}>
        <Button buttonText="Подробнее" type="button" onClick={onClick} />
      </div>
    </div>
  );
};
