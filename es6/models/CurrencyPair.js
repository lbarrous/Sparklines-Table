import { UPDATE_FRECUENCY_IN_MS } from "../constants";

export default class CurrencyPair {
  constructor(lastUpdate) {
    this.lastUpdate = lastUpdate;
    this.midprices = new Array().fill((lastUpdate.bestAsk + lastUpdate.bestBid) / 2);
  }

  getLastUpdate() {
    return this.lastUpdate;
  }

  setLastUpdate(lastUpdate) {
    this.lastUpdate = lastUpdate;
  }

  getMidPrices() {
    return this.midprices;
  }

  setMidPrices(midprices) {
    this.midprices = midprices;
  }

  addMidPrice(midprice) {
    /*
    If we have less elements of midprices in the array than the maximum we just add them, otherwise
    we just remove the oldest and add the new one.
    */
    if (
      this.midprices.length < Math.floor(30 / (UPDATE_FRECUENCY_IN_MS / 1000))
    ) {
      this.midprices = [...this.midprices, midprice];
    } else {
      this.midprices = [...this.midprices.slice(1), midprice];
    }
  }
}
