import { PixelRatio } from "react-native";

export function currencyFormat(num, dp = 2) {
  return parseFloat(num)
    .toFixed(dp)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function formatDate(date, formatType) {
  const format = formatType ?? "long";
  if (format === "long") {
    // Format as "November 2, 2023"
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else if (format === "short") {
    // Format as "30/11/2023"
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0"); // Adding leading zero if single digit
    const day = `${d.getDate()}`.padStart(2, "0"); // Adding leading zero if single digit
    return `${day}/${month}/${year}`;
  } else {
    return "Invalid formatType";
  }
}

export function extractTimeFromDate(dateTimeString) {
  const date = new Date(dateTimeString);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert hours to 12-hour format and determine AM/PM
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  // Adding leading zeros to minutes if less than 10
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${period}`;
}

export function getFontSize(originalSize) {
  const fontScale = PixelRatio.getFontScale();
  const responsiveSize = originalSize / fontScale;
  return responsiveSize;
}
