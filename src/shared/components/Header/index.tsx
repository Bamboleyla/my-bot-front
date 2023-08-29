import styles from "./styles.module.scss";
import logo from "./core.svg";
import { Button } from "antd";

export const Header = () => {
  return (
    <div className={styles.header} data-testid={"Header"}>
      <div className={styles.body}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <div className={styles.signature}>ЯДРО</div>
        </div>
        <div className={styles.section}>
          <span>Описание</span>
          <span>Возможности</span>
          <span>Клиенты</span>
          <span>Тарифы</span>
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
