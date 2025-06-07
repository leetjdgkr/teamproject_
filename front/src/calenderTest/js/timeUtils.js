export const calculateDurationInHours = (start, finish) => {
  const [startH, startM] = start.split(":").map(Number);
  const [finishH, finishM] = finish.split(":").map(Number);

  const startTotalMinutes = startH * 60 + startM;
  const finishTotalMinutes = finishH * 60 + finishM;

  const diffMinutes = finishTotalMinutes - startTotalMinutes;
  let hours = diffMinutes > 0 ? diffMinutes / 60 : 0;

  if (hours > 4) hours -= 1;
  return hours;
};

export const convertHoursToHMS = (floatHours) => {
  const hours = Math.floor(floatHours);
  const minutes = Math.floor((floatHours - hours) * 60);
  const seconds = Math.round(((floatHours - hours) * 60 - minutes) * 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
