import { TNews } from "../../../../services/types";

type ModalNewsProps = {
  data: TNews;
};

export const ModalNews: React.FC<ModalNewsProps> = ({ data }) => {
  return (
    <div>
      <span>{data.date}</span>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      {data.photos &&
        data.photos.map((photo) => {
          return (
            <>
              <img src={photo.src} alt={photo.title} key={photo.id} />;
            </>
          );
        })}
    </div>
  );
};
