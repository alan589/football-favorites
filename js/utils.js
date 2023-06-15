export function getWeekDates() {
    const oneDayinMs = 86400000;
    // const date = Date.now()
    const date = Date.parse(new Date("06-28-2023"));
    const weekday = new Date(date).getDay();
    const firstDay = oneDayinMs * (weekday - 1);
    const lastDay = oneDayinMs * (7 - weekday);

    const lastWeekDate = new Date(date + lastDay);
    const firstWeekDate = new Date(date - firstDay);

    return {
        from: formatDate(firstWeekDate),
        to: formatDate(lastWeekDate)
    }
  }

  export function formatDate (date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate() + 1).padStart(2, "0")}`;
  };