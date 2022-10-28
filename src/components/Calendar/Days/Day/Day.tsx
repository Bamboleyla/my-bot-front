import { FC } from "react";
import styles from "./day.module.scss";
import { getDayStyle } from "./day.utils";

export const Day: FC<{ date: number; currentDate: Date }> = ({
  date,
  currentDate,
}) => {
  // Получаем входяшую через props дату
  const incommingData = new Date(date);

  return (
    <div className={styles.wrapper}>
      <div className={styles[getDayStyle(date, currentDate)]}>
        {incommingData.getDate()}
      </div>
    </div>
  );
};
