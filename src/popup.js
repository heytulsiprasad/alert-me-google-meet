(() => {
  ////////////////////////////////////////////////////////////////////////////
  // Constants
  ////////////////////////////////////////////////////////////////////////////

  const bgSuccess = "#6ae97063";
  const bgInfo = "#cce5ff61";
  const bgWarning = "#fdff8159";
  const bgDanger = "#ff8c8c73";

  // Status DOM elements
  const footerDiv = document.querySelector("footer.footer");
  const footerMsg = document.getElementById("alert-msg");

  // Show pre-existing status
  chrome.storage.sync.get(["details"], (data) => {
    const log = data.details.options;

    switch (log.status) {
      case "success":
        footerDiv.style.backgroundColor = bgSuccess;
        footerMsg.innerText = log.message;
        break;
      case "warning":
        footerDiv.style.backgroundColor = bgWarning;
        footerMsg.innerText = log.message;
        break;
      case "info":
        footerDiv.style.backgroundColor = bgInfo;
        footerMsg.innerText = log.message;
        break;
      case "danger":
        footerDiv.style.backgroundColor = bgDanger;
        footerMsg.innerText = log.message;
        break;
      default:
        footerDiv.style.backgroundColor = bgInfo;
    }
  });

  // Listen upcoming status from content.js
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.details && changes.details.newValue.type === "log") {
      const log = changes.details.newValue.options;

      switch (log.status) {
        case "success":
          footerDiv.style.backgroundColor = bgSuccess;
          footerMsg.innerText = log.message;
          break;
        case "warning":
          footerDiv.style.backgroundColor = bgWarning;
          footerMsg.innerText = log.message;
          break;
        case "info":
          footerDiv.style.backgroundColor = bgInfo;
          footerMsg.innerText = log.message;
          break;
        case "danger":
          footerDiv.style.backgroundColor = bgDanger;
          footerMsg.innerText = log.message;
          break;
        default:
          footerDiv.style.backgroundColor = bgInfo;
      }
    }

    // ref: https://stackoverflow.com/a/20077854/11674552
    return true;
  });

  // This Adds Words to The DOM (called from addBtn listener)
  const addWords = (wordsArray) => {
    const displayedWords = [
      ...document.querySelectorAll(".word__ele"),
    ].map((i) => i.innerText.toLowerCase());

    for (let j = 0; j < wordsArray.length; j++) {
      // Checks if not already exists
      if (!displayedWords.includes(wordsArray[j].toLowerCase())) {
        const wordBox = document.createElement("div");
        wordBox.setAttribute("class", "words__box");

        const crossIcon = document.createElement("span");
        crossIcon.setAttribute("class", "material-icons remove");
        crossIcon.innerText = "clear";

        crossIcon.addEventListener("click", (e) => {
          const val = e.target.nextElementSibling.innerText.toLowerCase();
          e.target.parentElement.remove();

          chrome.storage.sync.get(["alertWords"], (data) => {
            const alertWords = data.alertWords;
            const idx = alertWords.map((i) => i.toLowerCase()).indexOf(val);

            if (idx > -1) {
              alertWords.splice(idx, 1);
            }

            chrome.storage.sync.set({ alertWords });
          });
        });

        const pTag = document.createElement("p");
        pTag.setAttribute("class", "word__ele");
        pTag.innerText = wordsArray[j];

        wordBox.append(crossIcon, pTag);

        const parentBox = document.querySelector(".words__boxes");
        parentBox.appendChild(wordBox);
      }
    }
  };

  // Get pre-existing alert words
  chrome.storage.sync.get(["alertWords"], (data) => {
    const alertWords = data.alertWords;

    // Add to DOM
    addWords(alertWords);
  });

  const addBtn = document.getElementById("add-btn");

  // Add Button Event Listener
  addBtn.addEventListener("click", () => {
    const alertWordsDoc = document.getElementById("alert-words");
    const alertWords = alertWordsDoc.value.split(",").map((str) => str.trim());

    if (!alertWords.includes("")) {
      // Add them to DOM
      addWords(alertWords);

      // Remove from input box
      alertWordsDoc.value = "";

      const displayedWords = [...document.querySelectorAll(".word__ele")].map(
        (i) => i.innerText
      );

      // Save to local storage
      saveToLocalStorage(displayedWords);
    }
  });

  // Saves to sync storage, called from addBtn event listener
  const saveToLocalStorage = (displayedWords) => {
    chrome.storage.sync.set({ alertWords: displayedWords });
  };

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
  });
})();
