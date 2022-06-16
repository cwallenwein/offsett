import express from "express";
import dotenv from "dotenv";
import BlockchairApiClientWrapper from "./integrations/blockchair/";
import { ImpactEstimator } from "./services/estimate-impact";
import { Parse, OffsettUrl, OffsettErrorHandler } from "./util";

const app: express.Express = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const port = 3001;

// Configure .env
dotenv.config({ path: "./config/.env" });

app.get("/", (_, res) => {
  res.status(200).send("Hello World!");
});

app.get(
  OffsettUrl.relative.ESTIMATE_WALLET_IMPACT + ":bitcoinAddress",
  async (req: express.Request<{ bitcoinAddress: string }>, res: express.Response, next: express.NextFunction) => {
    try {
      const bitcoinAddress: string = req.params.bitcoinAddress;
      const beforeLoadingTransactionDates = new Date();
      const transactionDates: Date[] = await BlockchairApiClientWrapper.getAllTransactionDatesOfWallet(bitcoinAddress);
      const afterLoadingTransactionDates = new Date();
      const estimatedEmissions = await ImpactEstimator.getEstimates(transactionDates);
      const afterEstimation = new Date();
      res.status(200).json(estimatedEmissions);
      console.log(
        `loading transaction dates ${
          (afterLoadingTransactionDates.getTime() - beforeLoadingTransactionDates.getTime()) / 1000
        } sec`,
      );
      console.log(
        `estimating emissions ${(afterEstimation.getTime() - afterLoadingTransactionDates.getTime()) / 1000} sec`,
      );
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  OffsettUrl.relative.ESTIMATE_IMPACT_WITH_TRANSACTION_ID + ":transactionID",
  async (
    req: express.Request<{ transactionID: string }>,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<void> => {
    try {
      const transactionID: string = req.params.transactionID;
      const beforeLoadingTransactionDates = new Date();
      const transactionDate: Date | undefined = await BlockchairApiClientWrapper.getDateOfTransaction(transactionID);
      const afterLoadingTransactionDates = new Date();
      if (transactionDate) {
        const estimatedEmissions: ImpactEstimator = await ImpactEstimator.getEstimates([transactionDate]);
        res.status(200).json(estimatedEmissions);
      } else {
        res.status(400).send();
      }
      const afterEstimation = new Date();
      console.log(
        `loading transaction dates ${
          (afterLoadingTransactionDates.getTime() - beforeLoadingTransactionDates.getTime()) / 1000
        } sec`,
      );
      console.log(
        `estimating emissions ${(afterEstimation.getTime() - afterLoadingTransactionDates.getTime()) / 1000} sec`,
      );
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  OffsettUrl.relative.ESTIMATE_IMPACT_WITH_TRANSACTION_DATE + ":date",
  async (req: express.Request<{ date: string }>, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const transactionDate: Date | undefined = Parse.date(req.params.date);
      if (transactionDate) {
        const afterEstimation = new Date();
        const estimatedEmissions = await ImpactEstimator.getEstimates([transactionDate]);
        const beforeEstimation = new Date();
        res.status(200).json(estimatedEmissions);
        console.log(`estimating emissions ${(afterEstimation.getTime() - beforeEstimation.getTime()) / 1000} sec`);
      } else {
        res.status(400).send("Invalid date");
      }
    } catch (error) {
      next(error);
    }
  },
);

app.use(OffsettErrorHandler.handle);

app
  .listen(port, () => {
    return console.log(`server is listening on ${port}`);
  })
  .on("error", (err) => {
    if (err) {
      return console.error(err);
    }
  });

export default app;
