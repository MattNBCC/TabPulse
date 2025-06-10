document.getElementById("start").addEventListener("click", function () {
  handleStartClick();
});

document.getElementById("stop").addEventListener("click", function () {
  handleStopClick();
});

function handleStartClick() {
  let interval = parseInt(document.getElementById("interval").value, 10);

  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(function (tabs) {
      let tab = tabs[0];

      console.log("Sending START:", { tabId: tab.id, interval });

      browser.runtime.sendMessage({
        command: "start",
        interval: interval,
        tabId: tab.id,
      });

      document.getElementById("status").textContent =
        "Started on tab " + tab.id;
    });
}

function handleStopClick() {
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(function (tabs) {
      let tab = tabs[0];

      console.log("Sending STOP:", { tabId: tab.id });

      browser.runtime.sendMessage({
        command: "stop",
        tabId: tab.id,
      });

      document.getElementById("status").textContent =
        "Stopped on tab " + tab.id;
    });
}
