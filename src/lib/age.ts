import { differenceInDays, differenceInYears, addYears } from "date-fns";

/** Age display: "28y 235d" from ISO birthday. */
export function formatAge(birthday: string, now = new Date()): string {
  const birth = new Date(birthday);
  const years = differenceInYears(now, birth);
  const lastBirthday = addYears(birth, years);
  const days = differenceInDays(now, lastBirthday);
  return `${years}y ${days}d`;
}
