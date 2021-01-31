import { arrHead } from "../constants";
import Component from "../core/Component";
import Store from "../store/Index";

export default class Table extends Component {
  // Pass our store instance and the HTML element up to the parent Component
  constructor() {
    super({
      Store,
      element: document.querySelector(".js-items")
    });
  }

  /**
   * Create table
   *
   * @returns {void}
   */
  createTable() {
    const emptyTable = document.createElement("table");
    emptyTable.setAttribute("id", "emptyTable"); // table id.

    var tr = emptyTable.insertRow(-1);

    arrHead.forEach((header, index) => {
      let th = document.createElement("th"); // the header object.
      th.innerHTML = arrHead[index];
      tr.appendChild(th);
    });

    const container = document.getElementById("container");
    container.appendChild(emptyTable); // add table to a container.
  }

  /**
   * Fill table with values
   *
   * @returns {void}
   */
  fillTable() {
    var table = document.getElementById("emptyTable");

    Store.state.currencyPairs.forEach(currencyPair => {
      let row = tbody.insertRow(-1);
      row.className = "order";

      for (const value of arrHead) {
        let cell = row.insertCell();
        cell.className = "order-item";
        cell.innerHTML = currencyPair.value;
      }
    });
  }

  render() {
    let self = this;

    const emptyTable = document.createElement("table");
    emptyTable.setAttribute("id", "emptyTable"); // table id.

    var tr = emptyTable.insertRow(-1);

    arrHead.forEach((header, index) => {
      let th = document.createElement("th"); // the header object.
      th.innerHTML = arrHead[index];
      tr.appendChild(th);
    });

    const container = document.getElementById("container");
    container.appendChild(emptyTable); // add table to a container.
  }
}
