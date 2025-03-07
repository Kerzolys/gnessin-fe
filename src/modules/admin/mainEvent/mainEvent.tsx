import { useEffect, useState } from "react";
import { useHeroEvent } from "../../../services/zustand/store";
import { Button } from "../../../components/button/button";
import { Preloader } from "../../../components/preloader/preloader";
import { FormEditEvent } from "./components/form-edit-event/form-edit-event";
import { Modal } from "../../../components/modal/modal";
import { useNavigate } from "react-router-dom";

export const MainEvent = () => {
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const { heroEvent, loadHeroEvent, isLoading } = useHeroEvent();
  const navigator = useNavigate();
  useEffect(() => {
    loadHeroEvent();
  }, []);

  const handleOpenEdit = () => setIsOpenEdit(true);
  const handleCloseEdit = () => setIsOpenEdit(false);
  const handleBack = () => {
    navigator(-1);
  };

  return (
    <div>
      <div>
        <h2>Main Event</h2>
        {heroEvent && <p>{heroEvent.title}</p>}
        {isLoading && <Preloader />}
        <Button buttonText="Edit" onClick={handleOpenEdit} type="button" />
      </div>
      {isOpenEdit && (
        <Modal onClose={handleCloseEdit}>
          <FormEditEvent data={heroEvent!} onCancel={handleCloseEdit} />
        </Modal>
      )}
      <Button buttonText="Back" onClick={handleBack} type="button" />
    </div>
  );
};
