import { TFestival } from "../../../services/types";

import styles from "./modal-festival.module.scss";

export const ModalFestival = ({ data }: { data: TFestival }) => {
  return (
    <div className={styles.container}>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <p>{data.composers.join(", ")}</p>
      <p>{data.performers.join(", ")}</p>
      <p>{data.lectors.join(", ")}</p>
      <p>
        {data.events.map((event) => {
          return <p>{event}</p>;
        })}
      </p>
    </div>
  );
};
