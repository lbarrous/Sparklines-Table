import sortArray from "./Sorter";
import CurrencyPair from "../models/CurrencyPair";

describe("Sorter testing", () => {
  const getCurrencyPairMessage = lastChangeBid => {
    return {
      lastChangeBid: lastChangeBid
    };
  };
  const currencypair1 = new CurrencyPair(getCurrencyPairMessage(1));
  const currencypair2 = new CurrencyPair(getCurrencyPairMessage(2));
  const currencypair3 = new CurrencyPair(getCurrencyPairMessage(3));
  const currentArray = [currencypair3, currencypair1, currencypair2];
  const expectedArray = [currencypair3, currencypair2, currencypair1];
  it("should sort the array properly", () => {
    expect(sortArray(currentArray)).toEqual(expectedArray);
  });
});
