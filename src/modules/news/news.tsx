import { NewsItem } from "./components/news-item/news-item";
import { testNews } from "./services/testNews";

import styles from "./news.module.scss";
import { useEffect, useState } from "react";
import { Modal } from "../../components/modal/modal";
import { ModalNews } from "./components/modal-news/modal-news";
import { TNews } from "../../services/types";
import { useNewsState } from "../../services/zustand/store";
import { Preloader } from "../../components/preloader/preloader";

export const News = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<TNews | null>(null);
  const { news, isLoading, loadNews } = useNewsState();

  useEffect(() => {
    loadNews();
  }, []);

  const handleOpen = (news: TNews) => {
    setSelectedNews(news);
    setIsOpen(true);
  };


  return (
    <div className={styles.container}>
      <h2 className={styles.container__heading}>Последние события</h2>
      <div className={styles.container__news}>
        {news.map((news) => {
          return (
            <>
              {/* {isLoading && <Preloader />} */}
              <NewsItem
                key={news.id}
                data={news}
                onClick={() => handleOpen(news)}
              />
            </>
          );
        })}
      </div>
      {isOpen && selectedNews && (
        <Modal onClose={() => setIsOpen(false)}>
          <ModalNews data={selectedNews} />
        </Modal>
      )}
    </div>
  );
};
