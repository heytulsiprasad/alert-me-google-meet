const logger = {};

setInterval(() => {
  // Check if user is on home screen of meet, dont execute the code

  const body = document.body;

  const subtitleDiv = document.querySelector("div[jscontroller='D1tHje']");

  if (!subtitleDiv) {
    logger.error = "Join the meeting first.";
    console.log("Join first");
  }

  if (subtitleDiv) {
    logger.status = "Awesome, you're in the meeting";

    const isSubtitleOn = subtitleDiv.style.display === "none" ? false : true;

    if (isSubtitleOn) {
      console.log("Turned on");

      // Get all words from inside those span elements
      // https://i.imgur.com/WPn7y8g.png

      // Search through all the spans for buzz words and log when theres a hit
      // Learn chrome notification api
    } else {
      console.log("Turned off");
    }
  }
}, 1000);
