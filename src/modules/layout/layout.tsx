import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";

type LayoutProps = {
  children: React.ReactNode[];
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
