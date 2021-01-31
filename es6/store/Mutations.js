import CurrencyPair from "../models/CurrencyPair";

export default {
  updateCurrencypair(state, payload) {
    let newState;
    const existingCurrencyPair = state.currencyPairs.filter(
      currencyPair => currencyPair.name === payload.name
    );

    if (existingCurrencyPair.length) {
      const newCurrencyPair = new CurrencyPair(payload);
      newCurrencyPair.midPrices = existingCurrencyPair.midPrices;
      newCurrencyPair.addMidPrice(
        (newCurrencyPair.bestBid + newCurrencyPair.bestAsk) / 2
      );
      const existingCurrencypairIndex = state.currencyPairs.findIndex(
        currencyPair => currencyPair.name === payload.name
      );

      newState = {
        currencyPairs: [
          ...state.currencyPairs(0, existingCurrencypairIndex),
          newCurrencyPair,
          ...state.currencyPairs(existingCurrencypairIndex + 1)
        ]
      };
    } else {
      newState = state.currencyPairs.concat([new CurrencyPair(payload)]);
    }

    return newState;
  }
};
