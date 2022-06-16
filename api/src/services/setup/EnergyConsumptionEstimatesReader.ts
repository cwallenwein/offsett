import { promises as fs } from "fs";
import { OffsettError } from "../../util";

export default class EnergyConsumptionEstimatesReader {
  public static async getEstimatesPerTransactionInWh(dailyTransactionCount: {
    [key: string]: number;
  }): Promise<{ [key: string]: number }> {
    let anualEnergyConsumptionEstimatesInKwh: { [key: string]: number } =
      await this.readAnualEnergyConsumptionEstimatesInKwhFromCsv();
    anualEnergyConsumptionEstimatesInKwh = this.convertDateFormat(anualEnergyConsumptionEstimatesInKwh);
    return this.convertToEnergyConsumptionEstimatesPerTransacionInWh(
      anualEnergyConsumptionEstimatesInKwh,
      dailyTransactionCount,
    );
  }

  private static async readAnualEnergyConsumptionEstimatesInKwhFromCsv(): Promise<{ [key: string]: number }> {
    let data: string | undefined;
    try {
      const filepath: string = "data/btc/total-energy-consumption-estimates-in-twh/per-day.csv";
      data = await fs.readFile(filepath, {
        encoding: "utf-8",
      });
    } catch (error) {
      console.log(error);
    }

    const anualEnergyConsumptionEstimatesInTwh: { [key: string]: number } = {};

    if (data) {
      const lines: string[] = data.toString().split("\n");
      lines.shift();

      lines.forEach((line: string) => {
        const columns: string[] = line.split(",");
        if (columns[0] && columns[1]) {
          const date: string = columns[0];
          const estimatedTwhPerYear = parseFloat(columns[1]);
          anualEnergyConsumptionEstimatesInTwh[date] = estimatedTwhPerYear;
        }
      });
    }
    return anualEnergyConsumptionEstimatesInTwh;
  }

  private static convertDateFormat(energyConsumptionEstimates: { [key: string]: number }): { [key: string]: number } {
    const withUpdatedDateFormat: { [key: string]: number } = {};

    Object.entries(energyConsumptionEstimates).forEach((value: [string, number]) => {
      const dateInWrongFormat = value[0];
      const currentBitcoinTotalEnergyConsumptionEstimate = value[1];
      const dateParts: string[] = dateInWrongFormat.split("/");
      const year: string | undefined = dateParts[0];
      const month: string | undefined = dateParts[1];
      const day: string | undefined = dateParts[2];
      if (year && month && day) {
        const dateInCorrectFormat = `${year}-${month.padStart(2, "0")}-${day}`;
        withUpdatedDateFormat[dateInCorrectFormat] = currentBitcoinTotalEnergyConsumptionEstimate;
      } else {
        throw OffsettError.SETUP_ERROR;
      }
    });

    return withUpdatedDateFormat;
  }

  private static convertToEnergyConsumptionEstimatesPerTransacionInWh(
    anualEnergyConsumptionEstimatesInKwh: {
      [key: string]: number;
    },
    dailyTransactionCount: { [key: string]: number },
  ): { [key: string]: number } {
    const energyConsumptionEstimatePerTransactionInWh: { [key: string]: number } = {};

    Object.entries(anualEnergyConsumptionEstimatesInKwh).forEach((value: [string, number]) => {
      const currentDate: string = value[0];
      const currentEnergyConsumptionEstimateForDayInKwh: number = value[1] * Math.pow(10, 12);
      const currentTransactionCountForDay: number | undefined = dailyTransactionCount[currentDate];
      if (currentTransactionCountForDay) {
        const energyConsumptionEstiamteForDay: number =
          currentEnergyConsumptionEstimateForDayInKwh / (currentTransactionCountForDay * 365);
        console.log(energyConsumptionEstiamteForDay);
        energyConsumptionEstimatePerTransactionInWh[currentDate] = energyConsumptionEstiamteForDay;
      }
    });

    return energyConsumptionEstimatePerTransactionInWh;
  }
}
