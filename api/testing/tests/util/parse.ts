import { assert } from "chai";
import { Parse } from "../../../src/util";

describe("Parse.ts test", () => {
  describe("Format", () => {
    it("rejects invalid format", () => {
      assert.throws(() => {
        Parse.date("xxxx-xx-xx");
      });

      assert.throws(() => {
        Parse.date("10-10-2000");
      });

      assert.throws(() => {
        Parse.date("");
      });
    });

    it("parses valid format", () => {
      assert.doesNotThrow(() => Parse.date("2000-10-10"));
    });
  });

  describe("Date range", () => {
    describe("Years", () => {
      // important date ranges are the last 20 years and the next 20 years. The rest doesn't really matter
      it("parses 20 years ago", () => {
        assert.doesNotThrow(() => Parse.date("2000-01-01"));
      });

      it("parses ~now", () => {
        assert.doesNotThrow(() => Parse.date("2020-06-06"));
      });

      it("parses 20 years into the future", () => {
        assert.doesNotThrow(() => Parse.date("2040-12-31"));
      });
    });

    describe("Months", () => {
      it("rejects 0", () => {
        assert.throws(() => Parse.date("2020-00-10"));
      });

      it("rejects >12", () => {
        assert.throws(() => Parse.date("2020-13-10"));
      });
    });

    describe("Days", () => {
      it("rejects 0", () => {
        assert.throws(() => Parse.date("2020-01-00"));
      });

      it("rejects > 31", () => {
        assert.throws(() => Parse.date("2020-01-32"));
      });
    });
  });

  describe("Leap year", () => {
    it("distinguishes Feb 29", () => {
      assert.doesNotThrow(() => Parse.date("2020-02-29"));

      assert.throws(() => {
        Parse.date("2021-02-29");
      });
    });
  });

  describe("Correct parsing", () => {
    it("2020-10-15", () => {
      const parsedDate: Date | undefined = Parse.date("2020-10-15");
      assert.isNotNull(parsedDate);

      if (parsedDate) {
        assert.equal(parsedDate.getDate(), 15);
        // getMonth is zero-based -> Januar is 0
        assert.equal(parsedDate.getMonth(), 10 - 1);
        assert.equal(parsedDate.getFullYear(), 2020);
      }
    });

    it("2020-01-01", () => {
      const parsedDate: Date | undefined = Parse.date("2020-01-01");
      assert.isNotNull(parsedDate);

      if (parsedDate) {
        assert.equal(parsedDate.getDate(), 1);
        // getMonth is zero-based -> Januar is 0
        assert.equal(parsedDate.getMonth(), 1 - 1);
        assert.equal(parsedDate.getFullYear(), 2020);
      }
    });
  });
});
