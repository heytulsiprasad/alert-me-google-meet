(() => {
  // TODO: Attach event listener to local storage to update your words
  // chrome.storage.onChanged.addListener((changes, namespace) => {
  //   console.log(changes, namespace);
  // });

  const addBtn = document.getElementById("add-btn");
  addBtn.addEventListener("click", () => {
    const rawAlertWords = document.getElementById("alert-words").value;
    const alertWords = rawAlertWords
      .split(",")
      .map((str) => str.trim().toLowerCase());

    // TODO: Send query to content.js

    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { alertWords });
      }
    );

    // TODO: Save to local storage
  });

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
  });
})();
