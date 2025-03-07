import { Slider } from "./components/slider/slider";
import { useVideosState } from "../../services/zustand/store";
import { useEffect } from "react";
import { Preloader } from "../../components/preloader/preloader";

import styles from "./media.module.scss";

export const Media = () => {
  const { isLoading, loadVideos, videos } = useVideosState();
  useEffect(() => {
    loadVideos();
  }, []);
  return (
    <div className={styles.container}>
      {!isLoading && videos.length === 0 && <p>Нет видео</p>}
      {isLoading && videos.length > 0 && <Preloader />}
      {videos.length > 0 && <Slider slides={videos} />}
    </div>
  );
};
