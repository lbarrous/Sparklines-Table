// table headers.
const arrHead = [
  "name",
  "bestBid",
  "bestAsk",
  "lastChangeBid",
  "lastChangeAsk",
  "midprices"
];

/* Titles of every header */
const TABLE_HEADER_TRANSLATIONS = Object.freeze({
  name: "Name",
  bestBid: "Best bid price",
  bestAsk: "Best ask price",
  lastChangeBid: "Best ask price last changed",
  lastChangeAsk: "Best bid price last changed",
  midprices: "Mid Price"
});

const STORE_STATUS = Object.freeze({
  FREE: Symbol("free"),
  MUTATION: Symbol("mutation"),
  ACTION: Symbol("action")
});

/* Assuming server send an stomp frame every second */
const UPDATE_FRECUENCY_IN_MS = 1000;

export { arrHead, STORE_STATUS, UPDATE_FRECUENCY_IN_MS, TABLE_HEADER_TRANSLATIONS };
