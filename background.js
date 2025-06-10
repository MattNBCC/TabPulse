// Create empty refresh object
let refreshTimers = {};

function onMessage(message, sender) {
  let tabId = message.tabId;
  console.log("Message received:", message);

  if (message.command === "start") {
    if (refreshTimers[tabId]) {
      clearInterval(refreshTimers[tabId]);
      console.log("Cleared old interval for tab " + tabId);
    }

    refreshTimers[tabId] = setInterval(function () {
      console.log("Reloading tab " + tabId);
      browser.tabs.reload(tabId);
    }, message.interval);

    console.log(
      "Started refresh on tab " + tabId + " every " + message.interval + "ms"
    );
  }

  if (message.command === "stop") {
    if (refreshTimers[tabId]) {
      clearInterval(refreshTimers[tabId]);
      delete refreshTimers[tabId];
      console.log("Stopped refresh on tab " + tabId);
    }
  }
}

browser.runtime.onMessage.addListener(onMessage);
