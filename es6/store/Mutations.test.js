import Store from "./Index";
import State from "./State";
import * as mutations from "./Mutations";
import CurrencyPair from "../models/CurrencyPair";

describe("Mutations testing", () => {
  const currencypairMessage = {
    bestAsk: 1.8673896975789588,
    bestBid: 1.865352902137246,
    lastChangeAsk: -0.0844967289853018,
    lastChangeBid: -0.05319176693877892,
    name: "gbpaud",
    openAsk: 1.9260254995268742,
    openBid: 1.895374500473126
  };
  const otherCurrencypairMessage = {
    bestAsk: 2.8673896975789588,
    bestBid: 4.865352902137246,
    lastChangeAsk: -0.0844967289853018,
    lastChangeBid: -1.05319176693877892,
    name: "gbpaud",
    openAsk: 1.9260254995268742,
    openBid: 3.895374500473126
  };
  it("should add a new currencypair to the state", () => {
    const expectedState = {
      currencyPairs: [new CurrencyPair(currencypairMessage)]
    };
    expect(
      mutations.default.updateCurrencypair(State, currencypairMessage)
    ).toEqual(expectedState);
  });
  it("should override an existing currencypair", () => {
    const currentCurrencyPair = new CurrencyPair(currencypairMessage);
    const currentState = {
      currencyPairs: [currentCurrencyPair]
    };
    const expectedCurrencyPair = new CurrencyPair(currencypairMessage);
    expectedCurrencyPair.setLastUpdate(otherCurrencypairMessage);
    expectedCurrencyPair.addMidPrice(
      (otherCurrencypairMessage.bestAsk + otherCurrencypairMessage.bestBid) / 2
    );
    const expectedState = {
      currencyPairs: [expectedCurrencyPair]
    };
    expect(
      mutations.default.updateCurrencypair(
        currentState,
        otherCurrencypairMessage
      )
    ).toEqual(expectedState);
  });
});
