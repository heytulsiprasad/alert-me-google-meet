console.log("[alert-me-google-meet] loaded");

try {
  (() => {
    // Show status on start
    chrome.storage.sync.set({
      details: {
        type: "log",
        options: {
          status: "danger",
          message: "Not on call",
        },
      },
    });

    ////////////////////////////////////////////////////////////////////////////
    // State Variables
    ////////////////////////////////////////////////////////////////////////////

    // Checks if control bar is present
    // https://i.imgur.com/tqkyuqG.png
    let ON_CALL = false;
    let IS_SUBTITLE_ON = false;

    ////////////////////////////////////////////////////////////////////////////
    // Getting Alert Words
    ////////////////////////////////////////////////////////////////////////////

    let ALERT_WORDS = [];

    // Gets pre-saved words upon start
    chrome.storage.sync.get(["alertWords"], (data) => {
      const alertWords = data.alertWords;
      const lwrAlertWords = alertWords.map((str) => str.toLowerCase());
      ALERT_WORDS = lwrAlertWords;
    });

    // Listens to further changes in sync storage
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes.alertWords) {
        const alertWords = changes.alertWords.newValue;

        const lwrAlertWords = alertWords.map((str) => str.toLowerCase());
        ALERT_WORDS = lwrAlertWords;
      }
    });

    ////////////////////////////////////////////////////////////////////////////
    // Global Observer
    ////////////////////////////////////////////////////////////////////////////

    const docObserver = new MutationObserver(() => {
      if (document.body.querySelector("div[jscontroller='kAPMuc']")) {
        ON_CALL = true;
        // Remove observer
        docObserver.disconnect();

        chrome.storage.sync.set({
          details: {
            type: "log",
            options: {
              status: "success",
              message: "You're in a call, add your keywords",
            },
          },
        });

        callStarts();
      }
    });

    docObserver.observe(document.body, { childList: true });

    // -------------------------------------------------------------------------
    // Invoke after call starts
    // -------------------------------------------------------------------------
    const callStarts = () => {
      const subtitleDiv = document.querySelector("div[jscontroller='D1tHje']");

      // To notify the first time
      IS_SUBTITLE_ON = subtitleDiv.style.display === "none" ? false : true;
      if (IS_SUBTITLE_ON) whenSubtitleOn();
      else whenSubtitleOff();

      const subtitleObserver = new MutationObserver(() => {
        IS_SUBTITLE_ON = subtitleDiv.style.display === "none" ? false : true;
        if (IS_SUBTITLE_ON) whenSubtitleOn();
        else whenSubtitleOff();
      });

      subtitleObserver.observe(subtitleDiv, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["style"],
      });
    };

    // -------------------------------------------------------------------------
    // Invoke when subs are off
    // -------------------------------------------------------------------------
    const whenSubtitleOff = () => {
      chrome.storage.sync.set({
        details: {
          type: "log",
          options: {
            status: "warning",
            message: "Turn on your captions",
          },
        },
      });
    };

    // -------------------------------------------------------------------------
    // Invoke when subs are on (MAIN FUNCTIONALITY)
    // -------------------------------------------------------------------------
    const whenSubtitleOn = () => {
      chrome.storage.sync.set({
        details: {
          type: "log",
          options: {
            status: "success",
            message: "You're all set, add your keywords and relax",
          },
        },
      });

      // DOM element containing all subtitles
      const subtitleDiv = document.querySelector("div[jscontroller='D1tHje']");

      const subtitleObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const newNodes = mutation.addedNodes;

          newNodes.forEach((node) => {
            if (node.classList && node.classList.contains("CNusmb")) {
              const speaker = node.parentNode.parentNode.parentNode.parentNode.querySelector(
                ".zs7s8d.jxFHg"
              ).textContent;
              const photo = node.parentNode.parentNode.parentNode.parentNode
                .querySelector(".KpxDtd.r6DyN")
                .getAttribute("src");
              const speech = node.textContent;

              // Get image base64 from url
              // ref: https://stackoverflow.com/a/20285053/11674552
              const toDataURL = (url) =>
                fetch(url)
                  .then((response) => response.blob())
                  .then(
                    (blob) =>
                      new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                      })
                  );

              // -------------------------------------------------------------------------
              // Check for matches
              // -------------------------------------------------------------------------
              let lwrSpeech = speech.toLowerCase();

              for (let i = 0; i < ALERT_WORDS.length; i++) {
                if (lwrSpeech.indexOf(ALERT_WORDS[i]) !== -1) {
                  toDataURL(photo).then((base64Link) => {
                    chrome.storage.sync.set({
                      details: {
                        type: "log",
                        options: {
                          status: "info",
                          message:
                            "You were notified. Check your notifications",
                        },
                      },
                    });

                    // Send notif alert to background.js
                    chrome.runtime.sendMessage("", {
                      type: "notification",
                      options: {
                        title: "Alert — from Google Meet",
                        message: `${speaker} just said ${speech}`,
                        iconUrl: base64Link,
                        type: "basic",
                      },
                    });
                  });

                  // Reduces the number of mutations
                  // (silents the observer for 5 seconds)
                  subtitleObserver.disconnect();
                  setTimeout(() => {
                    subtitleObserver.observe(subtitleDiv, {
                      childList: true,
                      subtree: true,
                      attributes: false,
                      characterData: false,
                    });
                  }, 3000);
                }
              }
            }
          });
        });
      });

      // Start observing subtitle div
      subtitleObserver.observe(subtitleDiv, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
      });
    };
  })();
} catch (e) {
  console.error("init error", e);
}
