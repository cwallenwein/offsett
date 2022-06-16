export enum OffsettUrl {}

export namespace OffsettUrl {
  export enum relative {
    ESTIMATE_WALLET_IMPACT = "/estimate-impact/wallet-id/",
    ESTIMATE_IMPACT_WITH_TRANSACTION_ID = "/estimate-impact/transaction-id/",
    ESTIMATE_IMPACT_WITH_TRANSACTION_DATE = "/estimate-impact/transaction-date/",
  }

  export enum absolute {
    OFFSETT_API_BASEPATH = "https://backend-offsett-co.onrender.com",
  }
}
