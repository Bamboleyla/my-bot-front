import styles from "./styles.module.scss";

interface Props {
  img: string; //Путь к картинке
  title: string; //Заголовок
  subTitle: string; //Подзаголовок
  description: string; //Описание
}

export const CardForOurRates = ({
  img,
  title,
  subTitle,
  description,
}: Props) => {
  return (
    <div className={styles.component}>
      <div className={styles.body} data-testid={"CardForOurRates"}>
        <img src={img} alt="imgCard" />
        <div className={styles.text}>
          <p className={styles.title}>{title}</p>
          <p className={styles.sub}>{subTitle}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
};
