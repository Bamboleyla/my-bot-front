import styles from "./styles.module.scss";
import logo from "../../shared/assets/Logo320.svg";

export const Start = () => {
  return (
    <div className={styles.start} data-testid={"Start"}>
      <div className={styles.body}>
        <div className={styles.title}>
          <img src={logo} alt="Logo" />
          <p>Ядро</p>
        </div>
        <div className={styles.slogan}>
          <p>Автоматизация салона красоты</p>
          <p> - как никогда проста</p>
        </div>
      </div>
    </div>
  );
};
