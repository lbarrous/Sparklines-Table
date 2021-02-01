// table headers.
const arrHead = [
  "name",
  "bestBid",
  "bestAsk",
  "lastChangeAsk",
  "lastChangeBid",
  "midprices"
];

const TABLE_HEADER_TRANSLATIONS = Object.freeze({
  name: "Name",
  bestBid: "Best bid price",
  bestAsk: "Best ask price",
  lastChangeAsk: "Best bid price last changed",
  lastChangeBid: "Best ask price last changed",
  midprices: "Mid Price"
});

const STORE_STATUS = Object.freeze({
  FREE: Symbol("free"),
  MUTATION: Symbol("mutation"),
  ACTION: Symbol("action")
});

const UPDATE_FRECUENCY_IN_MS = 3000;

export default arrHead;

export { arrHead, STORE_STATUS, UPDATE_FRECUENCY_IN_MS, TABLE_HEADER_TRANSLATIONS };
