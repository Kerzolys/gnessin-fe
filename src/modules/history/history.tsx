import { useEffect, useState } from "react";
import { Line } from "../../components/line/line";
import { Preloader } from "../../components/preloader/preloader";
import { useFestivalsState } from "../../services/zustand/store";
import { FestivalItem } from "../festival/components/fesival-item/festival-item";

import styles from "./history.module.scss";
import { Modal } from "../../components/modal/modal";
import { ModalFestival } from "../festival/components/modal-festival/modal-festival";

export const History = () => {
  const { isLoading, festivals, loadFestivals } = useFestivalsState();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const randomFestival =
    festivals[Math.floor(Math.random() * festivals.length)];

  useEffect(() => {
    loadFestivals();
  }, []);
  if (isLoading) {
    return <Preloader />;
  }
  return (
    <div className={styles.container}>
      <Line isForward />
      <div className={styles.container__festival}>
        <FestivalItem data={randomFestival} onClick={handleOpen}/>
      </div>
      <Line isForward={false} />
      {isOpen && (
        <Modal onClose={handleClose}>
          <ModalFestival data={randomFestival} />
        </Modal>
      )}
    </div>
  );
};
