import styles from "./styles.module.scss";

interface Props {
  img: string;
  title: string;
  description: string[];
}

export const CardForWelcome = ({ img, title, description }: Props) => {
  return (
    <div className={styles.body} data-testid={"CardForWelcome"}>
      <img src={img} alt="imgCard" />
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        {description.map((string, index) => {
          return (
            <p key={index} className={styles.string}>
              {string}
            </p>
          );
        })}
      </div>
    </div>
  );
};
