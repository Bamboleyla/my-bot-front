import styles from "./styles.module.scss";
import logo from "./core.svg";
import { Button } from "antd";
import { useState } from "react";
import { IDivId } from "./models";

//Header главного окна
export const Header = () => {
  //Хранится последнее местоположение позиции окна пользователя
  const [location, setLocation] = useState<IDivId>();

  //Обработчик события клика по span, в зависимости у какого span произошел onClick, перемешает окно пользователя
  const handleClick = (divId: IDivId) => {
    let point = 0;

    if (divId === location) {
      point = 0;
      setLocation(undefined);
    } else {
      if (divId === "WhatIs") point = 1280;
      else if (divId === "YouWillBeAble") point = 3940;
      else if (divId === "WhoIsItFor") point = 5989;
      else if (divId === "OurRates") point = 7941;

      setLocation(divId);
    }

    window.scrollTo(0, point);
  };
  return (
    <div className={styles.header} data-testid={"Header"}>
      <div className={styles.body}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <div className={styles.signature}>ЯДРО</div>
        </div>
        <div className={styles.section}>
          <span onClick={() => handleClick("WhatIs")}>Описание</span>
          <span onClick={() => handleClick("YouWillBeAble")}>Возможности</span>
          <span onClick={() => handleClick("WhoIsItFor")}>Клиенты</span>
          <span onClick={() => handleClick("OurRates")}>Тарифы</span>
        </div>
        <div className={styles.buttons}>
          <Button ghost size="large">
            Попробовать бесплатно
          </Button>
          <Button ghost size="large">
            Войти
          </Button>
        </div>
      </div>
    </div>
  );
};
