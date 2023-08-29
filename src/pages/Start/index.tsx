import { Header } from "../../shared/components/Header";
import styles from "./styles.module.scss";

export const Start = () => {
  return (
    <>
      <Header />
      <div className={styles.start} data-testid={"Start"}>
        <div className={styles.body} />
      </div>
    </>
  );
};
