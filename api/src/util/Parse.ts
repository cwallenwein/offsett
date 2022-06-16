import { ErrorOrigin, HttpStatusCode, OffsettError } from ".";

export class Parse {
  // Use ISO 8601: YYYY-MM-DD
  public static date(dateString: string): Date | undefined {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const dateParts: string[] = dateString.split("-");
      const lengthOfMonths: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if (dateParts[0] && dateParts[1] && dateParts[2]) {
        const year: number = parseInt(dateParts[0], 10);
        const month: number = parseInt(dateParts[1], 10);
        const day: number = parseInt(dateParts[2], 10);

        if (year < 1000 || year > 3000 || month === 0 || month > 12) {
          throw new OffsettError(ErrorOrigin.UTILITY, HttpStatusCode.BAD_REQUEST, "Invalid date range", true);
        }

        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
          lengthOfMonths[1] = 29;
        }

        const currentMonthLength: number | undefined = lengthOfMonths[month - 1];

        if (currentMonthLength) {
          if (day > 0 && day <= currentMonthLength) {
            return new Date(dateString);
          }
        }
      }
    }
    throw new OffsettError(ErrorOrigin.UTILITY, HttpStatusCode.BAD_REQUEST, "Invalid date format", true);
  }
}
