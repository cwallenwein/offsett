import MockDate from "mockdate";
import { assert } from "chai";
import { Validate } from "../../../src/util";

describe("Validate.ts test", () => {
  describe("bitcoinTransactionDate", () => {
    it("rejects out of range", () => {
      MockDate.set(new Date(2021, 12, 31));

      assert.isFalse(Validate.bitcoinTransactionDate(new Date(2009, 1, 15)));
      assert.isFalse(Validate.bitcoinTransactionDate(new Date(2022, 1, 1)));
    });

    it("accepts in range", () => {
      MockDate.set(new Date(2021, 12, 31));

      assert.isTrue(Validate.bitcoinTransactionDate(new Date(2021, 12, 12)));
    });
  });
});
