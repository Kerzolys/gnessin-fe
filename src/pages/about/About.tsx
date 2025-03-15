import { Festival } from "../../modules/festival/festival";
import { Hero } from "../../modules/hero/hero";
import { Layout } from "../../modules/layout/layout";

export const About = () => {
  return (
    <>
      <Layout>
        <Hero />
        <Festival />
      </Layout>
    </>
  );
};
