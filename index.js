/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require("./site/index.html");
// Apply the styles in style.css to the page.
require("./site/style.css");
require("./css/main.css");

// if you want to use es6, you can do something like
var index = require("./es6/index");
// here to load the myEs6code.js file, and it will be automatically transpiled.

// Change this to get detailed logging from the stomp library
global.DEBUG = false;

const url = "ws://localhost:8011/stomp";
const client = Stomp.client(url);
client.heartbeat.incoming = 1000;
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg);
  }
};

index.table.createTable();

function subscribeCallback(message) {
  const currencyPair = JSON.parse(message.body);
  index.Store.dispatch('updateCurrencypair', currencyPair);
  index.table.render();
}

function connectCallback() {
  document.getElementById("stomp-status").innerHTML =
    "It has now successfully connected to a stomp server serving price updates for some foreign exchange currency pairs.";
    client.subscribe("/fx/prices", subscribeCallback);
}

client.connect({}, connectCallback, function(error) {
  alert(error.headers.message);
});

const exampleSparkline = document.getElementById("example-sparkline");
Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3]);
