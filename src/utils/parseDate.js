module.exports = (strDate) => {
  try {
    const secInMs = 1000;
    const minInMs = secInMs * 60;
    const hourInMs = minInMs * 60;
    const dayInMs = hourInMs * 24;

    // Calc difference in milliseconds
    let diffInMs = new Date() - new Date(strDate);

    if (diffInMs < 0) {
      return "";
    }

    const times = [];

    // Calc days difference
    const diffInDays = Math.floor(diffInMs / dayInMs);
    diffInMs = diffInMs - diffInDays * dayInMs;
    times.push({
      type: diffInDays > 1 ? "days" : "day",
      diff: diffInDays,
    });

    // Calc hours difference
    const diffInHours = Math.floor(diffInMs / hourInMs);
    diffInMs = diffInMs - diffInHours * hourInMs;
    times.push({
      type: diffInHours > 1 ? "hours" : "hour",
      diff: diffInHours,
    });

    // Calc minutes difference
    const diffInMins = Math.floor(diffInMs / minInMs);
    diffInMs = diffInMs - diffInMins * minInMs;
    times.push({
      type: diffInMins > 1 ? "mins" : "min",
      diff: diffInMins,
    });

    // Calc minutes difference
    const diffInSecs = Math.floor(diffInMs / secInMs);
    diffInMs = diffInMs - diffInSecs * secInMs;
    times.push({
      type: diffInSecs > 1 ? "secs" : "sec",
      diff: diffInSecs,
    });

    const result = [];
    for (let time of times) {
      if (result.length === 2) break;

      if (time.diff > 0) {
        result.push(`${time.diff} ${time.type}`);
      }
    }

    return result.join(" ");
  } catch (err) {
    return "time-ended";
  }
};
