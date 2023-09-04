import { TitleFromWelcome } from "../../../shared/components/TitleForWelcome";
import { WhoIsItForCard } from "../../../shared/components/WhoIsItForCard";
import styles from "./styles.module.scss";
import beauty from "../../../shared/assets/beauty.png";
import spa from "../../../shared/assets/spa.png";
import manicure from "../../../shared/assets/manicure.png";
import barber from "../../../shared/assets/barber.png";
import brows from "../../../shared/assets/brows.png";
import massage from "../../../shared/assets/massage.png";
import epilation from "../../../shared/assets/epilation.png";
import photoStudio from "../../../shared/assets/photoStudio.png";
import tattoo from "../../../shared/assets/tattoo.png";
import grummer from "../../../shared/assets/grummer.png";
import solarium from "../../../shared/assets/solarium.png";
import piercing from "../../../shared/assets/piercing.png";

const config = [
  {
    img: beauty,
    title: "Салонов красоты",
  },
  {
    img: spa,
    title: "SPA салонов",
  },
  {
    img: manicure,
    title: "Салонов маникюра",
  },
  {
    img: barber,
    title: "Барбершопов",
  },
  {
    img: brows,
    title: "Салонов бровей и ресниц",
  },
  {
    img: massage,
    title: "Массажных салонов",
  },
  {
    img: epilation,
    title: "Салонов эпиляции",
  },
  {
    img: photoStudio,
    title: "Фото студий",
  },
  {
    img: tattoo,
    title: "Тату салонов",
  },
  {
    img: grummer,
    title: "Грумер салонов",
  },
  {
    img: solarium,
    title: "Соляриев",
  },
  {
    img: piercing,
    title: "Студий пирсинга",
  },
];

export const WhoIsItFor = () => {
  return (
    <div className={styles.component} data-testid={"WhoIsItFor"}>
      <TitleFromWelcome
        title="Для кого разработано Ядро?"
        description="Программа идеально подходит для:"
      />
      <div className={styles.cards}>
        {config.map((item) => (
          <WhoIsItForCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};
