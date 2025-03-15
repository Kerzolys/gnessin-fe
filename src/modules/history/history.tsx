import { useEffect } from "react";
import { Line } from "../../components/line/line";
import { Preloader } from "../../components/preloader/preloader";
import { useFestivalsState } from "../../services/zustand/store";

import { FestivalItem } from "../festival/components/fesival-item/festival-item";

export const History = () => {
  const { isLoading, festivals, loadFestivals } = useFestivalsState();
  const randomFestival =
    festivals[Math.floor(Math.random() * festivals.length)];
  


  useEffect(() => {
    loadFestivals();
  }, []);
  if (isLoading) {
    return <Preloader />;
  }
  return (
    <div>
      <Line isForward />
      <div>
        <FestivalItem data={randomFestival} />
      </div>

      <Line isForward={false} />
    </div>
  );
};
