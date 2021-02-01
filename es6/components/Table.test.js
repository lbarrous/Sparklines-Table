import Table from "./Table";
import Store from "../store/Index";

describe("Table testing", () => {
  const table = new Table();
  const currencypairMessage = {
    bestAsk: 1.8673896975789588,
    bestBid: 1.865352902137246,
    lastChangeAsk: -0.0844967289853018,
    lastChangeBid: -0.05319176693877892,
    name: "gbpaud",
    openAsk: 1.9260254995268742,
    openBid: 1.895374500473126,
  }
  let createElement;
  let querySelector;
  beforeEach(() => {
    createElement = document.createElement;
    querySelector = document.querySelector;
  });
  afterEach(() => {
    jest.restoreAllMocks();
    document.createElement = createElement;
    document.querySelector = querySelector;
  });
  it("should be defined", () => {
    expect(table).toBeDefined();
  });
  it("should create table", () => {
    const htmlTable = {
      setAttribute: jest.fn(),
      appendChild: jest.fn(),
      insertRow: jest.fn().mockReturnThis()
    };
    const container = { appendChild: jest.fn() };
    const thElement = { appendChild: jest.fn() };
    document.getElementById = jest.fn().mockImplementation(() => container);
    document.createElement = jest.fn().mockImplementation(tagName => {
      switch (tagName) {
        case "table":
          return htmlTable;
        case "th":
          return thElement;
      }
    });
    table.createTable();
    expect(document.createElement).toBeCalledTimes(7);
  });

  it("should render table", () => {
    const tableElement = { rows: [], deleteRow: jest.fn(), insertRow: jest.fn().mockReturnThis(), insertCell: jest.fn().mockReturnThis(), appendChild:jest.fn().mockReturnThis() }
    const table = new Table(tableElement);
    const sparkline = { draw: jest.fn() };
    global.Sparkline = sparkline;
    Store.dispatch('updateCurrencypair', currencypairMessage);
    table.render();
    table.formatCell = jest.fn();
    expect(tableElement.insertCell).toBeCalledTimes(6);
  });
});
