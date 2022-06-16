import BlockchairApiClientWrapper from "../../integrations/blockchair";
import { promises as fs } from "fs";
import EnergyConsumptionEstimatesReader from "./EnergyConsumptionEstimatesReader";

export default class ImpactEstimateSetup {
  public static async start(): Promise<void> {
    const dailyTransactionCount: { [key: string]: number } =
      await BlockchairApiClientWrapper.getDailyTransactionCount();
    await this.writeJsonToFile(JSON.stringify(dailyTransactionCount), "data/btc/transactions/per-day.json");

    const energyConsumptionEstimatesPerTransactionInWh: { [key: string]: number } =
      await EnergyConsumptionEstimatesReader.getEstimatesPerTransactionInWh(dailyTransactionCount);

    await this.writeJsonToFile(
      JSON.stringify(energyConsumptionEstimatesPerTransactionInWh),
      "data/btc/total-energy-consumption-estimates-in-twh/per-day.json",
    );
  }

  private static async writeJsonToFile(jsonData: string, outputPath: string): Promise<void> {
    try {
      await fs.writeFile(outputPath, jsonData, { flag: "w" });
      console.log("File saved: " + outputPath);
    } catch (error) {
      console.log(error);
    }
  }
}
