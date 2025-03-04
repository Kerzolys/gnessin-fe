import { TVideo } from "../../../../services/types";

import styles from "./slide.module.scss";

export type SlideProps = {
  data: TVideo;
};

export const Slide: React.FC<SlideProps> = ({ data }) => {
  const convertToEmbedUrl = (url: string) => {
    const youtubeRegex =
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <iframe
      className={styles.video}
      src={convertToEmbedUrl(data.videoSrc)}
      frameBorder={1}
      allow="autoplay; fullscreen"
      title={data.title}
      width="100%"
      height="100%"
    ></iframe>
  );
};
