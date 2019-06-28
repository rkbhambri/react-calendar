const getDateByMonthOffset = (date = null, offset) => {
  if (!date) date = new Date();

  const d = new Date(date);
  d.setDate(1);
  d.setMonth(d.getMonth() + offset);

  return d;
};

const getMonthId = date => `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`;

const getMonth = (date = null, opts = {}) => {
  if (!date) date = new Date();

  let first = new Date(date);
  first.setHours(0);
  first.setMinutes(0);
  first.setSeconds(0);
  first.setDate(1);

  let last = new Date(date);
  last.setHours(0);
  last.setMinutes(0);
  last.setSeconds(0);
  last.setMonth(last.getMonth() + 1);
  last.setDate(0);

  let weekStartDay = opts.startDay || 0; // By default starts on sunday

  let formatDate =
    opts.formatDate ||
    function(date) {
      return date;
    };
  let formatSiblingMonthDate = opts.formatSiblingMonthDate || formatDate;
  let firstDaysToComplete = (7 + first.getDay() - weekStartDay) % 7;
  let day = 1 - firstDaysToComplete;

  let weeks = Math.ceil((last.getDate() + firstDaysToComplete) / 7);
  let lines = [];
  let headers = [];

  for (let w = 0; w < weeks; w++) {
    let row = [];
    for (let d = 0; d < 7; d++) {
      let currentDay = day + d;
      let currentDate = createDateOffset(first, currentDay);
      let siblingMonth = checkSiblingMonth(currentDay);
      let format = siblingMonth ? formatSiblingMonthDate : formatDate;

      row.push(
        format(currentDate, {
          dayOfMonth: currentDay,
          siblingMonth: siblingMonth,
          week: w,
          position: d,
        })
      );

      if (opts.formatHeader && w === 0) headers.push(opts.formatHeader(currentDate, d));
    }
    day += 7;
    lines.push(row);
  }

  if (opts.formatHeader) lines.unshift(headers);

  return {
    weeks: lines,
    id: getMonthId(date),
    date,
  };

  function createDateOffset(date, offset) {
    var newDate = new Date(date);
    newDate.setDate(offset);
    return newDate;
  }

  function checkSiblingMonth(day) {
    return day <= 0 ? -1 : day > last.getDate() ? 1 : 0;
  }
};

export { getMonth, getMonthId, getDateByMonthOffset };


