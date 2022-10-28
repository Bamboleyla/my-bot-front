import { Month } from "./Month/Month";
import { ListDaysOfWeek } from "./ListDays/ListDaysOfWeek";
import { Days } from "./Days/Days";

export const Calendar = () => {
  return (
    <div>
      <Month />
      <ListDaysOfWeek />
      <Days />
    </div>
  );
};
