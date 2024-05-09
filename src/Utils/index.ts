const WEEK_LENGTH: number = 7;
const MONTHS: string[] = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];
const DAYS: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDateArray(month: number, year: number): number[][] {
  const firstDateOfMonth: Date = new Date(year, month, 1);
  const lastDateOfMonth: Date = new Date(year, month + 1, 0);
  const firstDayOfMonth: number = firstDateOfMonth.getDay();
  let dateArray: (number | null)[] = new Array(42).fill(null);
  
  for (let i = firstDayOfMonth, j = 1; j <= lastDateOfMonth.getDate(); i++, j++) {
    dateArray[i] = j;
  }

  let splicedDateArray: number[][] = [];
  while (dateArray.length > 0) {
    splicedDateArray.push(dateArray.splice(0, 7) as number[]);
  }

  return splicedDateArray;
}

export { WEEK_LENGTH, MONTHS, DAYS, getDateArray };
