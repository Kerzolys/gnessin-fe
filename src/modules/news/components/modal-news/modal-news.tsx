import { TNews } from "../../../../services/types";

import styles from "./modal-news.module.scss";

type ModalNewsProps = {
  data: TNews;
};

export const ModalNews: React.FC<ModalNewsProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <span>{data.date}</span>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      {data.photos &&
        data.photos.map((photo) => {
          return (
            <div className={styles.container__photos}>
              <img
                className={styles.container__photos__photo}
                src={photo.src}
                alt={photo.title}
                key={photo.id}
              />
            </div>
          );
        })}
    </div>
  );
};
