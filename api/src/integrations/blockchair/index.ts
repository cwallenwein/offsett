import axios, { AxiosResponse, AxiosError } from "axios";
import {
  IAddressEndpoint,
  IAddressData,
  IDailyTransactionCountEndpoint,
  ITransactionDataOfAddress,
  ITransactionEndpoint,
} from "./types";

import { Validate, OffsettError, ErrorOrigin, HttpStatusCode, OffsettErrorDescriptions } from "../../util";

export default class BlockchairApiClientWrapper {
  public static async getAllTransactionDatesOfWallet(bitcoinAddress: string): Promise<Date[]> {
    let first10kTransactionDates: Date[];
    let transactionCount: number;
    let pagesCount: number;
    let remainingTrasactionDates: Date[];
    if (Validate.bitcoinWalletAddress(bitcoinAddress)) {
      ({ first10kTransactionDates, transactionCount, pagesCount } = await this.getFirst10kTransactions(bitcoinAddress));
      remainingTrasactionDates = await this.getRemainingTransactions(bitcoinAddress, pagesCount - 1);

      const allTransactionDates: Date[] = first10kTransactionDates.concat(remainingTrasactionDates);

      if (transactionCount !== allTransactionDates.length) {
        throw new OffsettError(
          ErrorOrigin.BLOCKCHAIR,
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          OffsettErrorDescriptions.BLOCKCHAIR_INVALID_TRANSACTION_COUNT,
          false,
        );
      }

      return allTransactionDates;
    } else {
      throw new OffsettError(
        ErrorOrigin.BLOCKCHAIR,
        HttpStatusCode.BAD_REQUEST,
        OffsettErrorDescriptions.BITCOIN_ADDRESS_VALIDATION_ERROR,
        false,
      );
    }
  }

  public static async getDateOfTransaction(transactionID: string): Promise<Date | undefined> {
    let response: AxiosResponse<ITransactionEndpoint>;
    if (Validate.bitcoinTransactionID(transactionID)) {
      response = await BlockchairApiClient.getTransaction(transactionID);

      const transactionDate: string | undefined = response.data.data[transactionID]?.transaction.time;
      if (transactionDate) {
        return new Date(transactionDate);
      } else {
        return undefined;
      }
    } else {
      throw new OffsettError(
        ErrorOrigin.BLOCKCHAIR,
        HttpStatusCode.BAD_REQUEST,
        OffsettErrorDescriptions.BITCOIN_TRANSACTION_VALIDATION_ERROR,
        false,
      );
    }
  }

  public static async getDailyTransactionCount(): Promise<{ [key: string]: number }> {
    let response: AxiosResponse<IDailyTransactionCountEndpoint>;
    const dailyTransactions: { [key: string]: number } = {};

    response = await BlockchairApiClient.getDailyTransactionCount();

    response.data.data.forEach((value) => {
      dailyTransactions[value.date] = value["count()"];
    });
    return dailyTransactions;
  }

  private static async getFirst10kTransactions(
    bitcoinAddress: string,
  ): Promise<{ first10kTransactionDates: Date[]; transactionCount: number; pagesCount: number }> {
    let response: AxiosResponse<IAddressEndpoint>;
    let transactionDates: Date[];
    let transactionCount: number | undefined;

    response = await BlockchairApiClient.getAddress(bitcoinAddress, 0);

    const addressData: IAddressData | undefined = response.data.data[bitcoinAddress];
    if (addressData) {
      transactionCount = addressData.address.transaction_count;
      transactionDates = addressData.transactions.map((current: ITransactionDataOfAddress): Date => {
        return new Date(current.time);
      });
      const pagesCount: number = Math.ceil(transactionCount / 10000);
      return { first10kTransactionDates: transactionDates, transactionCount, pagesCount };
    }
    throw new OffsettError(
      ErrorOrigin.BLOCKCHAIR,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      "Address Data coud not be received",
      false,
    );
  }

  private static async getRemainingTransactions(bitcoinAddress: string, pagesCount: number): Promise<Date[]> {
    if (pagesCount <= 0) {
      return [];
    }

    const promises: Promise<AxiosResponse<IAddressEndpoint>>[] = [];

    for (let i = 1; i <= pagesCount; i++) {
      promises.push(BlockchairApiClient.getAddress(bitcoinAddress, 10000 * i));
    }

    const promiseResponses: AxiosResponse<IAddressEndpoint>[] = await Promise.all(promises);

    return promiseResponses
      .map((response: AxiosResponse<IAddressEndpoint>): Date[] | undefined =>
        response.data.data[bitcoinAddress]?.transactions?.map((current: ITransactionDataOfAddress): Date => {
          return new Date(current.time);
        }),
      )
      .filter((transactionDates: Date[] | undefined): transactionDates is Date[] => transactionDates !== undefined)
      .flat();
  }
}

class BlockchairApiClient {
  static async getAddress(
    bitcoinAddress: string,
    offset: number = 0,
    transactionDetails: boolean = true,
    limit: number = 10000,
  ): Promise<AxiosResponse<IAddressEndpoint>> {
    try {
      return await axios.get<IAddressEndpoint>(bitcoinAddress, {
        baseURL: "https://api.blockchair.com/bitcoin/dashboards/address/",
        responseType: "json",
        headers: { "content-Type": "application/json" },
        params: {
          transaction_details: transactionDetails,
          limit,
          offset,
        },
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getTransaction(transactionID: string): Promise<AxiosResponse<ITransactionEndpoint>> {
    try {
      return await axios.get<ITransactionEndpoint>(transactionID, {
        baseURL: "https://api.blockchair.com/bitcoin/dashboards/transaction/",
        responseType: "json",
        headers: { "content-Type": "application/json" },
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getDailyTransactionCount(): Promise<AxiosResponse<IDailyTransactionCountEndpoint>> {
    try {
      return await axios.get<IDailyTransactionCountEndpoint>("transactions", {
        baseURL: "https://api.blockchair.com/bitcoin",
        responseType: "json",
        headers: { "content-Type": "application/json" },
        params: {
          a: "date,count()",
        },
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static handleError(error: any): void {
    console.log(error);
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 402 || error?.response?.status === 429) {
        throw OffsettError.BLOCKCHAIR_LIMIT_EXCEEDED;
      } else {
        this.handleAxiosError(error);
      }
    } else {
      throw OffsettError.BLOCKCHAIR_ERROR;
    }
  }

  static handleAxiosError(error: AxiosError): void {
    const statusCode: number | undefined = error.response?.status;
    if (statusCode) {
      if (statusCode in HttpStatusCode) {
        throw new OffsettError(ErrorOrigin.AXIOS, statusCode, error.message, true);
      } else {
        // unknown status code
        throw new OffsettError(ErrorOrigin.AXIOS, HttpStatusCode.UNKNOWN, error.message, false);
      }
    } else {
      // undefined status code
      throw new OffsettError(ErrorOrigin.AXIOS, HttpStatusCode.UNKNOWN, error.message, false);
    }
  }
}
