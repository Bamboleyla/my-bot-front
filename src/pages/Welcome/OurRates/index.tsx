import { CardForOurRates } from "../../../shared/components/CardForOurRates";
import styles from "./styles.module.scss";
import professional from "../../../shared/assets/professionalRates.png";
import start from "../../../shared/assets/startRates.png";

const config = [
  {
    img: start,
    title: "Start",
    subTitle: "БЕСПЛАТНО / 3мес",
    description: "Попробуйте все преимущества нашего сервиса",
  },
  {
    img: professional,
    title: "Professional",
    subTitle: "500 руб. мес.",
    description: "Используйте возможности сервиса на все 100%",
  },
];

export const OurRates = () => {
  return (
    <div className={styles.component} data-testid={"OurRates"}>
      {config.map(({ img, title, subTitle, description }) => (
        <CardForOurRates
          key={title}
          img={img}
          title={title}
          subTitle={subTitle}
          description={description}
        />
      ))}
    </div>
  );
};
