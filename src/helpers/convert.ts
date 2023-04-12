const convertMinutesToHoursAndMinutes = (minutes: number): string => {
  if (isNaN(minutes) || minutes < 0) {
    throw new Error(
      "Invalid input. Please provide a positive number of minutes."
    );
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursString = hours > 0 ? `${hours}hr ` : "";
  const minutesString = remainingMinutes > 0 ? `${remainingMinutes}min` : "";

  return hoursString + minutesString;
};

export { convertMinutesToHoursAndMinutes };
