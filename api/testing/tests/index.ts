// process.env.NODE_ENV = "test";

import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { OffsettUrl } from "../../src/util";

chai.use(chaiHttp);

describe("GET /", function () {
  it("Server is running", async function () {
    const res = await chai.request(server).get("/").send();
    assert.equal(res.status, 200);
  });
});

describe("/GET /estimate-impact/wallet/:bitcoinAddress", function () {
  this.timeout(5000);
  it("200 if valid bitcoin address is specified", async function () {
    const url = OffsettUrl.relative.ESTIMATE_WALLET_IMPACT + "3HwXz83FvEbR1pDEwENKHmccYyR6YxMg78";
    const res = await chai.request(server).get(url).send();
    assert.equal(res.status, 200);
  });

  it("400 if random string is passed as bitcoin address", async function () {
    const url = OffsettUrl.relative.ESTIMATE_WALLET_IMPACT + "test123";
    const res = await chai.request(server).get(url).send();
    assert.equal(res.status, 400);
  });

  it("400 if invalid address is passed", async function () {
    const invalidBitcoinAddress = "3Hwxz12Fvebr1pDEwENKHmCCYyR6YxMg78";
    const url = OffsettUrl.relative.ESTIMATE_WALLET_IMPACT + invalidBitcoinAddress;
    const res = await chai.request(server).get(url).send();
    assert.equal(res.status, 400);
  });

  it("404 if no bitcoin address is specified", async function () {
    const res = await chai.request(server).get(OffsettUrl.relative.ESTIMATE_WALLET_IMPACT).send();
    assert.equal(res.status, 404);
  });
});

describe("/GET /estimate-impact/transaction/:transactionID", function () {
  this.timeout(5000);
  it("200 if valid bitcoin transaction id is specified", async function () {
    const url =
      OffsettUrl.relative.ESTIMATE_IMPACT_WITH_TRANSACTION_ID +
      "38cc819fc80fbd97dd00a86ebf5571dfa62c9d80c58a77e8dec1580a3764b311";
    const res = await chai.request(server).get(url).send();
    assert.equal(res.status, 200);
  });

  it("400 if random string is passed as bitcoin transaction id", async function () {
    const url = OffsettUrl.relative.ESTIMATE_IMPACT_WITH_TRANSACTION_ID + "test123";
    const res = await chai.request(server).get(url).send();
    assert.equal(res.status, 400);
  });

  it("400 if invalid bitcoin transaction id is passed", async function () {
    const invalidTransactionId = "38CQ819fc80fbd97dd00a86ebf5571DFa62c9d80c58a77e8dec1520a3764b111";
    const url = OffsettUrl.relative.ESTIMATE_IMPACT_WITH_TRANSACTION_ID + invalidTransactionId;
    const res = await chai.request(server).get(url).send();
    assert.equal(res.status, 400);
  });

  it("404 if no bitcoin transaction id is specified", async function () {
    const res = await chai.request(server).get(OffsettUrl.relative.ESTIMATE_IMPACT_WITH_TRANSACTION_ID).send();
    assert.equal(res.status, 404);
  });
});

describe("/GET /estimate-impact/transaction-date/:date", function () {
  this.timeout(5000);
  it("200 if valid date is specified", async function () {
    const url = OffsettUrl.relative.ESTIMATE_IMPACT_WITH_TRANSACTION_DATE + "2021-12-12";
    const res = await chai.request(server).get(url).send();
    assert.equal(res.status, 200);
  });

  it("400 if random string is passed as date", async function () {
    const url = OffsettUrl.relative.ESTIMATE_IMPACT_WITH_TRANSACTION_DATE + "test123";
    const res = await chai.request(server).get(url).send();
    assert.equal(res.status, 400);
  });

  it("400 if invalid date is passed", async function () {
    const invalidBitcoinAddress = "0300-50-50";
    const url = OffsettUrl.relative.ESTIMATE_IMPACT_WITH_TRANSACTION_DATE + invalidBitcoinAddress;
    const res = await chai.request(server).get(url).send();
    assert.equal(res.status, 400);
  });

  it("404 if no date is specified", async function () {
    const res = await chai.request(server).get(OffsettUrl.relative.ESTIMATE_IMPACT_WITH_TRANSACTION_DATE).send();
    assert.equal(res.status, 404);
  });
});
