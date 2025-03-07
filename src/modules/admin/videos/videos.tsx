import { useEffect, useState } from "react";
import { useVideosState } from "../../../services/zustand/store";
import { Preloader } from "../../../components/preloader/preloader";
import { Button } from "../../../components/button/button";
import { useNavigate } from "react-router-dom";
import { FormDeleteVideo } from "./components/form-delete-video/form-delete-video";
import { TVideo } from "../../../services/types";
import { Modal } from "../../../components/modal/modal";
import { FormAddVideo } from "./components/form-add-video/form-add-video";
import { FormEditVideo } from "./components/form-edit-video/form-edit-video";

import styles from "./videos.module.scss";

export const Videos = () => {
  const { videos, isLoading, loadVideos } = useVideosState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openType, setOpenType] = useState<"edit" | "add" | "remove" | null>(
    null
  );
  const [selectedVideo, setSelectedVideo] = useState<null | TVideo>(null);
  const navigate = useNavigate();
  useEffect(() => {
    loadVideos();
  }, []);

  const handleBack = () => navigate(-1);
  const handleClose = () => setIsOpen(false);
  const handleOpenAdd = () => {
    setIsOpen(true);
    setOpenType("add");
  };
  const handleOpenEdit = (video: TVideo) => {
    setIsOpen(true);
    setOpenType("edit");
    setSelectedVideo(video);
  };
  const handleOpenDelete = (video: TVideo) => {
    setIsOpen(true);
    setOpenType("remove");
    setSelectedVideo(video);
  };

  const convertToEmbedUrl = (url: string) => {
    const youtubeRegex =
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__videos}>
        {isLoading ? (
          <Preloader />
        ) : (
          videos.map((video) => (
            <div key={video.id} className={styles.container__videos__video}>
              <p>{video.title}</p>
              <iframe
                
                src={convertToEmbedUrl(video.videoSrc)}
                frameBorder="0"
                allow="autoplay; fullscreen"
                title={video.title}
                width="100%"
                height="100%"
              ></iframe>
              <Button
                buttonText="Edit"
                type="button"
                onClick={() => handleOpenEdit(video)}
              />
              <Button
                buttonText="Delete"
                type="button"
                onClick={() => handleOpenDelete(video)}
              />
            </div>
          ))
        )}
      </div>
      <Button buttonText="Add video" type="button" onClick={handleOpenAdd} />
      <Button buttonText="Back" type="button" onClick={handleBack} />
      {isOpen && openType === "remove" && selectedVideo && (
        <Modal onClose={handleClose}>
          <FormDeleteVideo data={selectedVideo} onCancel={handleClose} />
        </Modal>
      )}
      {isOpen && openType === "add" && (
        <Modal onClose={handleClose}>
          <FormAddVideo onCancel={handleClose} />
        </Modal>
      )}
      {isOpen && openType === "edit" && selectedVideo && (
        <Modal onClose={handleClose}>
          <FormEditVideo data={selectedVideo} onCancel={handleClose} />
        </Modal>
      )}
    </div>
  );
};
