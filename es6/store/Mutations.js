import CurrencyPair from "../models/CurrencyPair";
import sortArray from "../utils/Sorter";

export default {
  updateCurrencypair(state, payload) {
    let newState;
    const existingCurrencyPair = state.currencyPairs.filter(
      currencyPair => currencyPair.lastUpdate.name === payload.name
    );

    if (existingCurrencyPair.length) {
      const newCurrencyPair = new CurrencyPair(payload);
      /* Copy the midprices of the old currencyPair */
      newCurrencyPair.setMidPrices(existingCurrencyPair[0].midprices);
      newCurrencyPair.addMidPrice(
        (newCurrencyPair.lastUpdate.bestBid +
          newCurrencyPair.lastUpdate.bestAsk) /
          2
      );
      const existingCurrencypairIndex = state.currencyPairs.findIndex(
        currencyPair => currencyPair.lastUpdate.name === payload.name
      );

      /* We change the desired currencyPair for the new one in the array if we already have it */
      newState = {
        currencyPairs: sortArray([
          ...state.currencyPairs.slice(0, existingCurrencypairIndex),
          newCurrencyPair,
          ...state.currencyPairs.slice(existingCurrencypairIndex + 1)
        ])
      };
    } else {
      /* We just add the new currencypair if we don't have it */
      newState = {
        currencyPairs: sortArray(
          state.currencyPairs.concat([new CurrencyPair(payload)])
        )
      };
    }

    return newState;
  }
};
