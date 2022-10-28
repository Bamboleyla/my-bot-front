import { FC } from "react";
import styles from "./month.module.scss";
import { ReactComponent as PrewMonth } from "./prewMonth.svg";
import { ReactComponent as NextMonth } from "./nextMonth.svg";

export const Month: FC = () => {
  return (
    <div className={styles.title}>
      <PrewMonth />
      <div className={styles.month}>Month</div>
      <NextMonth />
      <div className={styles.year}>2022</div>
    </div>
  );
};
