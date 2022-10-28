import { Day } from "./Day/Day";
import { calendar, currentDate } from "./Days.utils";
import styles from "./days.module.scss";
import { v4 as uuidv4 } from "uuid";

export const Days = () => {
  return (
    <div className={styles.list}>
      {calendar().map((day) => (
        <Day key={uuidv4()} date={day} currentDate={currentDate} />
      ))}
    </div>
  );
};
