export const modifiedData = (data) => {
  const matchData = [...data[0].cards, ...data[0].goalscorer]
    .map((detail) => ({
      ...detail,
    }))
    .concat(
      data[0].substitutions.home.map((substitution) => ({
        ...substitution,
        team: "home",
      }))
    )
    .concat(
      data[0].substitutions.away.map((substitution) => ({
        ...substitution,
        team: "away",
      }))
    )
    .sort((a, b) => {
      const parseTime = (timeString) => {
        if (timeString.includes("+")) {
          const [minutes, extraMinutes] = timeString.split("+").map(Number);
          return minutes + extraMinutes;
        } else {
          return parseInt(timeString, 10);
        }
      };

      const timeA = parseTime(a.time);
      const timeB = parseTime(b.time);
      return timeA - timeB;
    });
  return matchData;
};
