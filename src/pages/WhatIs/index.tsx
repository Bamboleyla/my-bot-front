import { CardForWelcome } from "../../shared/components/CardForWelcome";
import { TitleFromWelcome } from "../../shared/components/TitleForWelcome";
import styles from "./styles.module.scss";
import owner from "../../shared/assets/owner.png";
import admin from "../../shared/assets/administrator.png";
import master from "../../shared/assets/master.png";
import client from "../../shared/assets/client.png";

const config = [
  {
    img: owner,
    title: "Владельцу: ",
    description: [
      "• получать информацию о расходах и доходах, количестве выполненной работы мастерами, остатков на складе, истории посещения салона клиентами и другую бизнес информацию;",
      "• находить и влиять на неэффективные показатели бизнеса;",
      "• читать отзывы клиентов;",
      "• увеличить трафик клиентов;",
    ],
  },
  {
    img: admin,
    title: "Администратору: ",
    description: [
      "• распределять онлайн заказы;",
      "• консультировать клиентов онлайн;",
      "• управлять расписанием работы мастеров;",
      "• рассчитывать заработную плату мастеров;",
      "• вести учет расходных материалов;",
      "• информировать клиентов о акциях через мессенджеры;",
      "• упростить, ускорить и повысить эффективность своей работы;",
    ],
  },
  {
    img: master,
    title: "Мастеру: ",
    description: [
      "• знать сколько обслужено клиентов;",
      "• видеть свой график работы на день, неделю, месяц;",
      "• читать отзывы клиентов о качестве выполненной работе;",
      "• знать в любой момент сколько уже заработано;",
      "• соревноваться со своими коллегами по рейтингу;",
    ],
  },
  {
    img: client,
    title: "Клиенту: ",
    description: [
      "• легко записаться к любимому мастеру;",
      "• получать скидки, подарки, участвовать в акциях от салона;",
      "• оставлять отзывы о качестве услуг;",
      "• оценивать работу и влиять на рейтинг мастера;",
      "• карта лояльности больше не нужна, все в вашем телефоне;",
      "• клиентская поддержка;",
    ],
  },
];

export const WhatIs = () => {
  return (
    <div className={styles.whatIs} data-testid={"WhatIs"}>
      <TitleFromWelcome
        title="Что такое Ядро?"
        description="Это облачное решение позволяет:"
      />
      <div className={styles.cards}>
        {config.map(({ img, title, description }) => (
          <CardForWelcome img={img} title={title} description={description} />
        ))}
      </div>
    </div>
  );
};
