import { Hero } from "../../modules/hero/hero";
import { History } from "../../modules/history/history";
import { Layout } from "../../modules/layout/layout";
import { Media } from "../../modules/media/media";
import { News } from "../../modules/news/news";
import { testHeroEvent } from "../../services/tests/testHeroEvent";

export const Home = () => {
  const heroEvent = testHeroEvent;
  return (
    <>
      <Layout>
        <Hero heroEvent={heroEvent} />
        <History />
        <Media />
        <News />
      </Layout>
    </>
  );
};
