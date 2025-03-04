import { useState } from "react";
import { TVideo } from "../../../../services/types";
import { Slide } from "../slide/slide";

import styles from "./slider.module.scss";
import { Button } from "../../../../components/button/button";
import classNames from "classnames";

export type SliderProps = {
  slides: TVideo[];
};

export const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (evt: React.TouchEvent) => {
    evt.preventDefault();
    setTouchStartX(evt.touches[0].clientX);
  };

  const handleTouchMove = (evt: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(evt.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchEndX - touchStartX;
      if (distance < -50) {
        handleNextSlide();
      } else if (distance > 50) {
        handlePrevSlide();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleNextSlide = () => {
    if (slides.length > 0) {
      setSlideIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevSlide = () => {
    if (slides.length > 0) {
      setSlideIndex((prevIndex) =>
        prevIndex === 0 ? slides.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div
      className={styles.slider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Button
        buttonText=""
        onClick={handlePrevSlide}
        type="button"
        extraClassname={styles.prevButton}
      />
      {slides.map((slide, index) => (
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={classNames(styles.slider__container, {
            [styles.slider__container_active]: slideIndex === index,
          })}
        >
          <Slide data={slide} key={slide.id} />
        </div>
      ))}
      <Button
        buttonText=""
        onClick={handleNextSlide}
        type="button"
        extraClassname={styles.nextButton}
      />
    </div>
  );
};
