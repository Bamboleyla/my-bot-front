import styles from "./styles.module.scss";

export const Start = () => {
  return (
    <div className={styles.start} data-testid={"Start"}>
      <div className={styles.body}></div>
    </div>
  );
};
