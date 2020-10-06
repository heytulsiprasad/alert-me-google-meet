(() => {
  // Throws notification when called in content.js in L:179
  chrome.runtime.onMessage.addListener((data) => {
    if (data.type === "notification") {
      chrome.notifications.create("", data.options);
    }
  });
})();
