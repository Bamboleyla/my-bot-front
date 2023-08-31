import { TitleFromWelcome } from "../../shared/components/TitleForWelcome";
import styles from "./styles.module.scss";
import efficiency from "../../shared/assets/efficiency.png";
import newClients from "../../shared/assets/newClients.png";
import simpleControl from "../../shared/assets/simplifyСontrol.png";
import { CardForWelcome } from "../../shared/components/CardForWelcome";

const config = [
  {
    img: efficiency,
    title: "Повысить производительность: ",
    description: [
      "• благодаря сокращению времени ведения учета;",
      "• благодаря распределения нагрузки среди мастеров;",
      "• благодаря автоматизации процессов;",
      "• благодаря моментальному получению информации о всех бизнес-процессах;",
      "• благодаря увеличению возможности обслуживания большего число клиентов;",
    ],
  },
  {
    img: newClients,
    title: "Привлечь новых клиентов: ",
    description: [
      "• благодаря удобству записи;",
      "• благодаря сокращения ожидания своей очереди;",
      "• благодаря получения регулярных предложений и акций от салона;",
      "• благодаря возможности обслуживания у любимого мастера ;",
      "• благодаря наличия клиентской поддержки;",
    ],
  },
  {
    img: simpleControl,
    title: "Упростить контроль: ",
    description: [
      "• приход, расход материалов за пару кликов;",
      "• простая инвентаризация;",
      "• остатки, движения материалов всегда перед вами;",
      "• автосписание с оказанных услуг;",
      "• ценообразование, рентабельность, финансовый результат, расчет зарплаты, премий и многое другое в режиме онлайн;",
    ],
  },
];

export const YouWillBeAble = () => {
  return (
    <div className={styles.youWillBeAble} data-testid={"YouWillBeAble"}>
      <TitleFromWelcome
        title="Благодаря Ядру,"
        description="ваш бизнес получает возможности:"
      />
      <div className={styles.cards}>
        {config.map(({ img, title, description }) => (
          <CardForWelcome img={img} title={title} description={description} />
        ))}
      </div>
    </div>
  );
};
