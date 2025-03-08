import { useEffect, useState } from "react";
import { useSocialState } from "../../../services/zustand/store";
import { Preloader } from "../../../components/preloader/preloader";
import { SocialLink } from "../../../components/social-link/social-link";
import { Button } from "../../../components/button/button";
import { TSocial } from "../../../services/types";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../components/modal/modal";
import { FormAddSocial } from "./components/form-add-social";

import styles from "./social.module.scss";
import { FormDeleteSocial } from "./components/form-delete-social";
import { FormEditSocial } from "./components/form-edit-social";

export const Social = () => {
  const { social, loadSocial, isLoading } = useSocialState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openType, setOpenType] = useState<"edit" | "delete" | "add" | null>(
    null
  );
  const [selectedSocial, setSelectedSocial] = useState<null | TSocial>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadSocial();
  }, []);

  const handleBack = () => navigate(-1);
  const handleClose = () => setIsOpen(false);
  const handleOpenEdit = (social: TSocial) => {
    setSelectedSocial(social);
    setOpenType("edit");
    setIsOpen(true);
  };
  const handleOpenDelete = (social: TSocial) => {
    setSelectedSocial(social);
    setOpenType("delete");
    setIsOpen(true);
  };
  const handleOpenAdd = () => {
    setOpenType("add");
    setIsOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__socialList}>
        {isLoading && <Preloader />}
        {!isLoading && social.length === 0 && (
          <h2>Пока нет социальных сетей</h2>
        )}
        {social.map((social) => {
          return (
            <div className={styles.container__socialList__social}>
              <SocialLink data={social} />
              <Button
                buttonText="Edit"
                type="button"
                onClick={() => handleOpenEdit(social)}
              />
              <Button
                buttonText="Delete"
                type="button"
                onClick={() => handleOpenDelete(social)}
              />
            </div>
          );
        })}
      </div>
      <Button buttonText="Add social" type="button" onClick={handleOpenAdd} />
      <Button buttonText="Back" type="button" onClick={handleBack} />
      {isOpen && openType === "add" && (
        <Modal onClose={handleClose}>
          <FormAddSocial onCancel={handleClose} />
        </Modal>
      )}
      {isOpen && openType === "delete" && selectedSocial && (
        <Modal onClose={handleClose}>
          <FormDeleteSocial data={selectedSocial} onCancel={handleClose} />
        </Modal>
      )}
      {isOpen && openType === "edit" && selectedSocial && (
        <Modal onClose={handleClose}>
          <FormEditSocial data={selectedSocial} onCancel={handleClose} />
        </Modal>
      )}
    </div>
  );
};
