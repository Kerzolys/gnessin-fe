import { NewsItem } from "./components/news-item/news-item";
import { useEffect, useState } from "react";
import { Modal } from "../../components/modal/modal";
import { ModalNews } from "./components/modal-news/modal-news";
import { TNews } from "../../services/types";
import { useNewsState } from "../../services/zustand/store";

import styles from "./news.module.scss";
import { Button } from "../../components/button/button";

export const News = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<TNews | null>(null);
  const [openType, setOpenType] = useState<
    "news" | "archive" | "archiveDetail" | null
  >("news");
  const { news, loadNews } = useNewsState();
  const actualNews = news.filter((n) => n.archived !== true);
  const archivedNews = news.filter((n) => n.archived === true);
  useEffect(() => {
    loadNews();
  }, []);

  const handleOpen = (news: TNews) => {
    setSelectedNews(news);
    setOpenType("news");
    setIsOpen(true);
  };

  const handleOpenArchiveNews = () => {
    setIsOpen(true);
    setOpenType("archive");
  };

  const handleOpenArchiveDetail = (news: TNews) => {
    setSelectedNews(news);
    setOpenType("archiveDetail");
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedNews(null);
    setOpenType(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.container__heading}>Последние события</h2>
      <div className={styles.container__news}>
        {actualNews.map((news) => {
          return (
            <>
              <NewsItem
                key={news.id}
                data={news}
                onClick={() => handleOpen(news)}
              />
            </>
          );
        })}
        <Button
          buttonText="Архив новостей"
          type="button"
          onClick={handleOpenArchiveNews}
        />
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          {selectedNews && openType === "news" && (
            <ModalNews data={selectedNews} onClick={handleClose} />
          )}
          {openType === "archive" && (
            <>
              {archivedNews.map((n) => (
                <NewsItem
                  key={n.id}
                  data={n}
                  onClick={() => handleOpenArchiveDetail(n)}
                />
              ))}
            </>
          )}
          {openType === "archiveDetail" && selectedNews && (
            <ModalNews
              data={selectedNews}
              onClick={() => setOpenType("archive")}
            />
          )}
        </Modal>
      )}
    </div>
  );
};
