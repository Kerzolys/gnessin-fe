import { useEffect, useRef, useState } from "react";
import { Button } from "../../../../components/button/button";
import { TNews } from "../../../../services/types";

import styles from "./news-item.module.scss";
import classNames from "classnames";

export type NewsItemProps = {
  data: TNews;
  onClick: () => void;
};

export const NewsItem: React.FC<NewsItemProps> = ({ data, onClick }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const newsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (newsRef.current) {
      observer.observe(newsRef.current);
    }
  }, []);
  return (
    <div className={styles.container}>
      <div
        ref={newsRef}
        className={classNames(styles.container__news, {
          [styles.container__news_visible]: isVisible,
        })}
        onClick={onClick}
      >
        <span>{data.date}</span>
        <h2>{data.title}</h2>
        <p>{data.shortDescription}</p>
      </div>
      {data.archived == true ? null : (
        <div className={styles.container__button}>
          <Button buttonText="Подробнее" type="button" onClick={onClick} />
        </div>
      )}
    </div>
  );
};
