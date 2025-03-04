import { Slider } from "./components/slider/slider";
import { testVideos } from "./services/testVideos";

import styles from "./media.module.scss";

export const Media = () => {
  return (
    <div className={styles.container}>
      <Slider slides={testVideos} />
    </div>
  );
};
