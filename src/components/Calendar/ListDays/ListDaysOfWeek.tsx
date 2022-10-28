import styles from "./listDaysOfWeek.module.scss";
import { v4 as uuidv4 } from "uuid";

export const ListDaysOfWeek = () => {
  const data = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  return (
    <div className={styles.days}>
      {data.map((day) => (
        <div key={uuidv4()}>{day}</div>
      ))}
    </div>
  );
};
