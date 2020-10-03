console.log("[alert-me-google-meet] loaded");

try {
  (() => {
    ////////////////////////////////////////////////////////////////////////////
    // State Variables
    ////////////////////////////////////////////////////////////////////////////

    // Checks if control bar is present
    // https://i.imgur.com/tqkyuqG.png
    let ON_CALL = false;
    let IS_SUBTITLE_ON = false;

    ////////////////////////////////////////////////////////////////////////////
    // Global Observer
    ////////////////////////////////////////////////////////////////////////////

    const docObserver = new MutationObserver(() => {
      if (document.body.querySelector("div[jscontroller='kAPMuc']")) {
        ON_CALL = true;
        // Remove observer
        docObserver.disconnect();

        console.log("docObserver changes");
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

        console.log("subtitle Observer");
      });

      subtitleObserver.observe(subtitleDiv, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["style"],
      });
    };

    const whenSubtitleOff = () => {
      console.log("Captions turned off");
    };

    // -------------------------------------------------------------------------
    // Invoke when subtitles are on (MAIN FUNCTIONALITY)
    // -------------------------------------------------------------------------
    const whenSubtitleOn = () => {
      // console.log("Captions turned on");

      const subtitleDiv = document.querySelector("div[jscontroller='D1tHje']");
      const subtitleObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // console.log(mutation);

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

              // Get image base64
              // https://stackoverflow.com/a/20285053/11674552
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

              // Match with input got from browser
              let msg = "Awesome".toLowerCase();

              let lwrSpeech = speech.toLowerCase();
              if (lwrSpeech.includes(msg)) {
                // console.log({ speaker, photo, speech });

                // Send notifications

                toDataURL(photo).then((base64Link) => {
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
              }

              // console.log(`${speaker} said ${speech}`);
            }
          });
        });
      });

      subtitleObserver.observe(subtitleDiv, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
      });
    };
  })();
} catch (e) {
  console.log("init error", e);
}
