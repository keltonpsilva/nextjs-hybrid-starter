import { isUndefined } from "lodash";
import { format, toZonedTime } from "date-fns-tz";

const formatToUtc = (dateString: string) => {
  if (isUndefined(dateString)) {
    throw new RangeError("Invalid date value");
  }

  const localDate = new Date(dateString);
  const utcDate = toZonedTime(localDate, "Europe/London");
  return format(utcDate, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: "UTC" });
};

export default formatToUtc;
