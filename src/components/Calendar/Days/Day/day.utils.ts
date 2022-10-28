export const getDayStyle = (incomming: number, current: Date): string => {
  //1. Получаем текущий день, месяц
  const currentDay = current.getDate();
  const currentMonth = current.getMonth();

  //2. Получаем входяшую дату, месяц
  const incommingData = new Date(incomming);

  const incommingDay = incommingData.getDate();
  const incommingMonth = incommingData.getMonth();

  //3. Определяем для каждого дня свой стиль
  // -current сегодня
  // -future будущие дни текущего месяца
  // -past прошедшие дни текущего месяца
  // -default дни не из текущего месяца
  if (incommingMonth === currentMonth) {
    if (incommingDay === currentDay) return "current";
    else if (incommingDay > currentDay) return "future";
    else if (incommingDay < currentDay) return "past";
    else {
      console.error("getDayStyle() не получилось определить день ");
      return "default";
    }
  } else return "default";
};
