import CurrencyPair from "../models/CurrencyPair";
import compare from "../utils/Sorter";

export default {
  updateCurrencypair(state, payload) {
    let newState;
    const existingCurrencyPair = state.currencyPairs.filter(
      currencyPair => currencyPair.lastUpdate.name === payload.name
    );

    if (existingCurrencyPair.length) {
      const newCurrencyPair = new CurrencyPair(payload);
      newCurrencyPair.setMidPrices(existingCurrencyPair[0].midprices);
      newCurrencyPair.addMidPrice(
        (newCurrencyPair.lastUpdate.bestBid +
          newCurrencyPair.lastUpdate.bestAsk) /
          2
      );
      const existingCurrencypairIndex = state.currencyPairs.findIndex(
        currencyPair => currencyPair.lastUpdate.name === payload.name
      );

      newState = {
        currencyPairs: [
          ...state.currencyPairs.slice(0, existingCurrencypairIndex),
          newCurrencyPair,
          ...state.currencyPairs.slice(existingCurrencypairIndex + 1)
        ].sort(compare)
      };
    } else {
      newState = {
        currencyPairs: state.currencyPairs.concat([new CurrencyPair(payload)]).sort(compare)
      };
    }

    return newState;
  }
};
