//1.Получаем текущую дату, день, месяц
export const currentDate = new Date();

//2.Получаем день недели, месяца
const dayOfMounth = currentDate.getDate();
const dayOfWeek = currentDate.getDay();

//3.Получаем первый понедельник календаря
const time =
  currentDate.getTime() - (dayOfMounth + dayOfWeek) * 24 * 3600 * 1000;

//4.Получаем список оставшихся из 41-го дней календаря
export const calendar = (): number[] => {
  const result = [time];
  let value = time;
  for (let i = 0; i < 41; i++) {
    value = value + 24 * 3600 * 1000;
    result.push(value);
  }
  return result;
};
