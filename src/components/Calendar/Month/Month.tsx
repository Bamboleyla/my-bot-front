import { FC } from "react";
import styles from "./month.module.scss";
import { ReactComponent as PrewMonth } from "./prewMonth.svg";
import { ReactComponent as NextMonth } from "./nextMonth.svg";
import { useAppSelector } from "../../../hooks/redux";

export const Month: FC = () => {
  const { today } = useAppSelector((state) => state.todayDateReducer);
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return (
    <div className={styles.title}>
      <PrewMonth />
      <div className={styles.month}>{months[today.month]}</div>
      <NextMonth />
      <div className={styles.year}>{today.year}</div>
    </div>
  );
};
