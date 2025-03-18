import { useEffect, useRef, useState } from "react";
import { Button } from "../../../../components/button/button";
import { TFestival } from "../../../../services/types";

import styles from "./festival-item.module.scss";
import classNames from "classnames";

export const FestivalItem = ({
  data,
  onClick,
}: {
  data: TFestival;
  onClick?: () => void;
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const festivalRef = useRef<HTMLDivElement | null>(null);

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

    if (festivalRef.current) {
      observer.observe(festivalRef.current);
    }

    // return () => observer.disconnect();
  }, []);

  if (!data) return <p>Здесь скоро появится информация!</p>;
  return (
    <div className={styles.container}>
      <div
        ref={festivalRef}
        className={classNames(styles.container__item, {
          [styles.container__item_visible]: isVisible,
        })}
        onClick={onClick}
      >
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </div>
      <Button
        extraClassname={styles.container__button}
        buttonText="Подробнее"
        type="button"
        onClick={onClick}
      />
    </div>
  );
};
