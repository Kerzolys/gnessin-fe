import { useEffect, useState } from "react";
import { useFestivalsState } from "../../services/zustand/store";
import styles from "./festival.module.scss";
import { Preloader } from "../../components/preloader/preloader";
import { FestivalItem } from "./components/fesival-item/festival-item";
import { Modal } from "../../components/modal/modal";
import { ModalFestival } from "./components/modal-festival/modal-festival";
import { TFestival } from "../../services/types";

export const Festival = () => {
  const { isLoading, festivals, loadFestivals } = useFestivalsState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFestival, setSelectedFestival] = useState<TFestival | null>(
    null
  );
  useEffect(() => {
    loadFestivals();
  }, []);

  const handleOpen = (festival: TFestival) => {
    setSelectedFestival(festival);
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

  if (!festivals) return <div className={styles.container_loading}></div>;
  if (isLoading) return <Preloader />;
  return (
    <>
      <div className={styles.container}>
        {festivals.map((festival) => (
          <div>
            <FestivalItem
              data={festival}
              onClick={() => handleOpen(festival)}
            />
          </div>
        ))}
      </div>
      {isOpen && selectedFestival && (
        <Modal onClose={handleClose}>
          <ModalFestival data={selectedFestival} />
        </Modal>
      )}
    </>
  );
};
