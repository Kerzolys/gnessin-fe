import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/button/button";
import { useNewsState, usePhotosState } from "../../../services/zustand/store";
import { Preloader } from "../../../components/preloader/preloader";
import { useEffect, useState } from "react";
import { ModalNews } from "../../news/components/modal-news/modal-news";
import { TNews } from "../../../services/types";
import { FormAddNews } from "./components/form-add-news";
import { Modal } from "../../../components/modal/modal";

import styles from "./news.module.scss";
import { FormDeleteNews } from "./components/form-delete-news";
import { FormEditNews } from "./components/form-edit-news";

export const News = () => {
  const { news, loadNews, isLoading } = useNewsState();
  const { loadPhotos } = usePhotosState();
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openType, setOpenType] = useState<"add" | "edit" | "delete" | null>(
    null
  );
  const [selectedNews, setSelectedNews] = useState<TNews | null>(null);

  useEffect(() => {
    loadNews();
    loadPhotos();
  }, []);

  const handleOpenAdd = () => {
    setOpenType("add");
    setIsOpen(true);
  };

  const handleOpenEdit = (news: TNews) => {
    setSelectedNews(news);
    setOpenType("edit");
    setIsOpen(true);
  };
  const handleOpenDelete = (news: TNews) => {
    setSelectedNews(news);
    setOpenType("delete");
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  if (isLoading) return <Preloader />;
  return (
    <div className={styles.container}>
      <div className={styles.container__newsList}>
        {news.map((news) => {
          return (
            <div className={styles.container__newsList__news}>
              <ModalNews data={news} />
              <Button
                buttonText="Edit"
                type="button"
                onClick={() => handleOpenEdit(news)}
              />
              <Button
                buttonText="Delete"
                type="button"
                onClick={() => handleOpenDelete(news)}
              />
            </div>
          );
        })}
      </div>
      <Button buttonText="Add news" type="button" onClick={handleOpenAdd} />
      <Button buttonText="Back" type="button" onClick={handleBack} />
      {isOpen && openType === "add" && (
        <Modal onClose={handleClose}>
          <FormAddNews onCancel={handleClose} />
        </Modal>
      )}
      {isOpen && openType === "delete" && selectedNews && (
        <Modal onClose={handleClose}>
          <FormDeleteNews data={selectedNews} onCancel={handleClose} />
        </Modal>
      )}
      {isOpen && openType === "edit" && selectedNews && (
        <Modal onClose={handleClose}>
          <FormEditNews data={selectedNews} onCancel={handleClose} />
        </Modal>
      )}
    </div>
  );
};
