import { UPDATE_FRECUENCY_IN_MS } from "../constants";

export default class CurrencyPair {
  constructor(data) {
    this.name = data.name;
    this.bestBid = data.bestBid;
    this.bestAsk = data.bestAsk;
    this.lastChangeAsk = data.lastChangeAsk;
    this.lastChangeBid = data.lastChangeBid;
    this.midprices = new Array().fill((this.bestAsk + this.bestBid) / 2);
  }

  get name() {
    return this.name;
  }
  get bestBid() {
    return this.bestBid;
  }
  get bestAsk() {
    return this.bestAsk;
  }
  get lastChangeAsk() {
    return this.lastChangeAsk;
  }
  get lastChangeBid() {
    return this.lastChangeBid;
  }

  set name(name) {
    return (this.name = name);
  }
  set bestBid(bestBid) {
    return (this.bestBid = bestBid);
  }
  set bestAsk(bestAsk) {
    return (this.bestAsk = bestAsk);
  }
  set lastChangeAsk(lastChangeAsk) {
    return (this.lastChangeAsk = lastChangeAsk);
  }
  set lastChangeBid(lastChangeBid) {
    return (this.lastChangeBid = lastChangeBid);
  }
  set midPrices(midPrices) {
    return (this.midPrices = midPrices);
  }

  addMidPrice(midPrice) {
    /*
    If we have less elements of midprices in the array than the maximum we just add them, otherwise
    we just remove the oldest and add the new one.
    */
    if (
      this.midprices.length < Math.floor(30 / (UPDATE_FRECUENCY_IN_MS / 1000))
    ) {
      this.midprices = [...this.midprices, midPrice];
    } else {
      this.midprices = [...this.midprices.slice(1), midprice];
    }
  }
}
