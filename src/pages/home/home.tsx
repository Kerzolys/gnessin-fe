import { Hero } from "../../modules/hero/hero";
import { History } from "../../modules/history/history";
import { Layout } from "../../modules/layout/layout";
import { Media } from "../../modules/media/media";
import { News } from "../../modules/news/news";

export const Home = () => {
  return (
    <>
      <Layout>
        <Hero />
        <History />
        <Media />
        <News />
      </Layout>
    </>
  );
};
