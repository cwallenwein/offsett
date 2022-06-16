import { validate } from "wallet-address-validator";

export class Validate {
  public static bitcoinTransactionID(transactionID: string): boolean {
    return /^[a-fA-F0-9]{64}$/.test(transactionID);
  }

  public static bitcoinWalletAddress(walletAddress: string): boolean {
    return validate(walletAddress, "BTC");
  }

  public static bitcoinTransactionDates(dates: Date[]): boolean {
    return !dates.map((date) => this.bitcoinTransactionDate(date)).includes(false);
  }

  public static bitcoinTransactionDate(date: Date): boolean {
    const dateOfFirstBitcoinTransaction: Date = new Date(2009, 1, 16);
    const today: Date = new Date();
    return date >= dateOfFirstBitcoinTransaction && date <= today;
  }
}
