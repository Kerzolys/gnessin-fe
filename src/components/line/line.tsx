import { useEffect, useRef, useState } from "react";
import styles from "./line.module.scss";
import classNames from "classnames";

export const Line = ({ isForward = true }: { isForward: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (lineRef.current) {
      observer.observe(lineRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return <div ref={lineRef} className={classNames(styles.line, {[styles.line_visible]: isVisible, [styles.line_backward]: !isForward})}></div>;
};
