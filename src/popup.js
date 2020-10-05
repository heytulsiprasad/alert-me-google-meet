(() => {
  // TODO: Attach event listener to local storage to update your words

  // Send changed localstorage data to content.js
  chrome.storage.onChanged.addListener((changes, namespace) => {
    const alertWords = changes.alertWords.newValue;
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { alertWords });
      }
    );
  });

  // This Adds Words to The DOM
  const addWords = (wordsArray) => {
    const displayedWords = [
      ...document.querySelectorAll(".word__ele"),
    ].map((i) => i.innerText.toLowerCase());

    // console.log(wordsArray, displayedWords);

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

            chrome.storage.sync.set({ alertWords }, () => {
              console.log("Deleted!");
            });
          });
        });

        const pTag = document.createElement("p");
        pTag.setAttribute("class", "word__ele");
        pTag.innerText = wordsArray[j];

        wordBox.append(crossIcon, pTag);

        // Append to document
        const parentBox = document.querySelector(".words__boxes");
        parentBox.appendChild(wordBox);
      }
    }
  };

  // Get previously stored data
  chrome.storage.sync.get(["alertWords"], (data) => {
    const alertWords = data.alertWords;

    // Add to DOM
    addWords(alertWords);
  });

  // ADD Words Event Listener
  const addBtn = document.getElementById("add-btn");

  addBtn.addEventListener("click", () => {
    const alertWordsDoc = document.getElementById("alert-words");
    const alertWords = alertWordsDoc.value.split(",").map((str) => str.trim());

    // Add them to DOM
    addWords(alertWords);

    // Remove from input box
    alertWordsDoc.value = "";

    const displayedWords = [...document.querySelectorAll(".word__ele")].map(
      (i) => i.innerText
    );

    // Save to local storage
    saveToLocalStorage(displayedWords);
  });

  const saveToLocalStorage = (displayedWords) => {
    chrome.storage.sync.set({ alertWords: displayedWords }, () => {
      console.log("Saved!");
    });
  };

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
  });
})();
