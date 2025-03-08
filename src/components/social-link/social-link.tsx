import { TSocial } from "../../services/types";
import styles from "./social-link.module.scss";

type SocialLinkProps = {
  data: TSocial;
};

export const SocialLink: React.FC<SocialLinkProps> = ({ data }) => {
  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialLink}
    >
      <img src={data.image} alt={data.name} />
    </a>
  );
};
