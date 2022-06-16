import { ImpactEstimate } from ".";
const bitcoinEnergyConsumptionEstimatesPerDay: {
  [key: string]: number;
} = require("../../../data/btc/impact-estimates-per-transaction/per-day.json");

export class ImpactEstimator {
  // source: https://www.sciencedirect.com/science/article/pii/S2542435119302557
  static readonly GRAMS_CO2_PER_WATT_HOUR = 0.481;

  public static getEstimates(transactionDates: Date[]): ImpactEstimate {
    const usedEnergyOfWalletInWattHours: number = this.getUsedEnergyOfWalletInWattHours(transactionDates);
    const walletEmissionsInGramsCo2: number = this.getWalletEmissionsInGramsCo2(usedEnergyOfWalletInWattHours);

    return {
      numberOfTransactions: transactionDates.length,
      walletEmissionsInGramsCo2,
      usedEnergyOfWalletInWattHours,
    };
  }

  private static getWalletEmissionsInGramsCo2(usedEnergyOfWalletInWattHours: number) {
    return Math.round(usedEnergyOfWalletInWattHours * this.GRAMS_CO2_PER_WATT_HOUR);
  }

  private static getUsedEnergyOfWalletInWattHours(allTransactionDates: Date[] | null): number {
    let usedEnergyOfWalletInWattHours = 0;
    if (allTransactionDates) {
      allTransactionDates
        .map((transactionDate: Date) => {
          return transactionDate.toISOString().substring(0, 10);
        })
        .forEach((transactionDate: string) => {
          const usedEnergyOfTransactionsInWattHours: number | undefined =
            bitcoinEnergyConsumptionEstimatesPerDay[transactionDate];
          if (usedEnergyOfTransactionsInWattHours) {
            usedEnergyOfWalletInWattHours += usedEnergyOfTransactionsInWattHours;
          }
        });
    }
    return Math.round(usedEnergyOfWalletInWattHours);
  }
}
