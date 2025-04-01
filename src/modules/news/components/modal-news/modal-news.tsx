import { useLocation } from "react-router-dom";
import { Button } from "../../../../components/button/button";
import { TNews } from "../../../../services/types";

import styles from "./modal-news.module.scss";

type ModalNewsProps = {
  data: TNews;
  onClick?: () => void;
};

export const ModalNews: React.FC<ModalNewsProps> = ({ data, onClick }) => {
const location = useLocation()
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
      {data.archived == true && location.pathname !== '/admin/news' ? (
        <Button buttonText="Назад" type="button" onClick={onClick} />
      ) : null}
    </div>
  );
};
