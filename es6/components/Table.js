import { arrHead, TABLE_HEADER_TRANSLATIONS } from "../constants";
import Component from "../core/Component";
import Store from "../store/Index";

export default class Table extends Component {
  // Pass our store instance and the HTML element up to the parent Component
  constructor(element = null) {
    super({
      Store,
      element: element //We create the table in its own component
    });
  }

  /**
   * Create table
   *
   * @returns {void}
   */
  createTable() {
    const emptyTable = document.createElement("table");
    emptyTable.setAttribute("id", "currencyPairsTable"); // table id.

    const tr = emptyTable.insertRow(-1);

    arrHead.forEach((header, index) => {
      let th = document.createElement("th"); // the header object.
      th.innerHTML = TABLE_HEADER_TRANSLATIONS[arrHead[index]];
      tr.appendChild(th);
    });

    const container = document.getElementById("container");
    container.appendChild(emptyTable); // add table to a container.
    this.element = emptyTable; //Attach the table to element property
  }

  /**
   * Format every cell of the row
   *
   * @returns {void}
   */
  formatCell(row, typeOfCell, currencyPair) {
    let cell = row.insertCell();
    cell.className = "currencyPair-item";

    if (typeOfCell === arrHead[5]) {
      const sparks = document.createElement(
        `sparkLine-${currencyPair.lastUpdate.name}`
      );
      cell.appendChild(sparks);
      Sparkline.draw(sparks, currencyPair[typeOfCell]);
    } else if (typeOfCell === arrHead[0]) {
      cell.innerHTML = currencyPair.lastUpdate[typeOfCell].toUpperCase();

    } else {
      cell.innerHTML = currencyPair.lastUpdate[typeOfCell];
    }
  }

  /**
   * Fill table with new values
   *
   * @returns {void}
   */
  fillTable() {
    const table = this.element;

    //Redraw the table every time as sorting of elements
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    Store.state.currencyPairs.forEach(currencyPair => {
      let row = table.insertRow(-1);
      row.className = "currencyPair";
      row.id = currencyPair.lastUpdate.name;

      for (const value of arrHead) {
        this.formatCell(row, value, currencyPair);
      }
    });
  }

  /**
   * React to state changes and render the component's HTML
   *
   * @returns {void}
   */
  render() {
    this.fillTable();
  }
}
