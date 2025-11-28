const toUTCDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};

const getSuffix = (n: number) => {
  if (n % 10 === 1 && n % 100 !== 11) return "st";
  if (n % 10 === 2 && n % 100 !== 12) return "nd";
  if (n % 10 === 3 && n % 100 !== 13) return "rd";
  return "th";
};

const formatPrettyDate = (dateStr: string): string => {
  const date = toUTCDate(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}${getSuffix(day)}, ${year}`;
};

const formatArrayOfDates = (dates: string[]): string => {
  if (!dates.length) return "";

  // Normalize + sort
  const parsed = dates
    .map(d => ({
      raw: d,
      date: toUTCDate(d),
      y: toUTCDate(d).getUTCFullYear(),
      m: toUTCDate(d).getUTCMonth(),
      d: toUTCDate(d).getUTCDate(),
      monthName: toUTCDate(d).toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Group by YEAR first
  const years: Record<number, typeof parsed> = {};
  parsed.forEach(p => {
    years[p.y] ||= [];
    years[p.y].push(p);
  });

  const formattedYearGroups: string[] = [];

  for (const year of Object.keys(years).map(Number).sort()) {
    const datesInYear = years[year];

    // Now group by MONTH inside each year
    const monthGroups: Record<number, typeof parsed> = {};
    datesInYear.forEach(p => {
      monthGroups[p.m] ||= [];
      monthGroups[p.m].push(p);
    });

    const formattedMonthGroups: string[] = [];

    for (const m of Object.keys(monthGroups).map(Number).sort()) {
      const list = monthGroups[m];

      // List of days formatted minimally (month appears only once)
      if (list.length === 1) {
        const p = list[0];
        formattedMonthGroups.push(`${p.monthName} ${p.d}${getSuffix(p.d)}`);
      } else {
        // multiple days in same month
        const days = list.map(p => `${p.d}${getSuffix(p.d)}`);
        const last = days.pop();
        const body = days.length ? `${days.join(", ")} and ${last}` : last;
        formattedMonthGroups.push(`${list[0].monthName} ${body}`);
      }
    }

    // Join month groups for the year
    const finalPart =
      formattedMonthGroups.length === 1
        ? `${formattedMonthGroups[0]}, ${year}`
        : `${formattedMonthGroups.slice(0, -1).join(", ")} and ${formattedMonthGroups.at(-1)}, ${year}`;

    formattedYearGroups.push(finalPart);
  }

  // If only one year, return the single formatted block
  if (formattedYearGroups.length === 1) {
    return formattedYearGroups[0];
  }

  // Multiple years: join with " and "
  return formattedYearGroups.join(" and ");
};

export { formatPrettyDate, formatArrayOfDates };
