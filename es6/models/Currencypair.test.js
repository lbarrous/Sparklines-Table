import CurrencyPair from "./CurrencyPair";

describe("Currencypair testing", () => {
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
  const currencyPair = new CurrencyPair(currencypairMessage);

  it("should store lastUpdate", () => {
    expect(currencyPair.getLastUpdate()).toEqual(currencypairMessage);
  });
  it("should set lastUpdate", () => {
    currencyPair.setLastUpdate(otherCurrencypairMessage);
    expect(currencyPair.getLastUpdate()).toEqual(otherCurrencypairMessage);
  });
  it("should store midprices", () => {
    expect(currencyPair.getMidPrices()).toEqual([
      (currencypairMessage.bestAsk + currencypairMessage.bestBid) / 2
    ]);
  });
  it("should set midprices", () => {
    currencyPair.setMidPrices([1]);
    expect(currencyPair.getMidPrices()).toEqual([1]);
  });
  it("should add midprice", () => {
    const currentMidPrices = currencyPair.getMidPrices();
    currencyPair.addMidPrice(1);
    expect(currencyPair.getMidPrices()).toEqual([...currentMidPrices, 1]);
  });
  it("should override midprice", () => {
    const currentMidPrices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const expectedMidPrices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    currencyPair.setMidPrices(currentMidPrices);
    currencyPair.addMidPrice(10);
    expect(currencyPair.getMidPrices()).toEqual(expectedMidPrices);
  });
});
