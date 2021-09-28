(() => {
  var lastnotification = "";

  // Throws notification when called in content.js in L:179
  chrome.runtime.onMessage.addListener((data) => {
    if (data.type === "notification") {
        // check if the notification is similar to the last one sent
        if(lastnotification != `${data.alert_word}${data.speaker}`){
              lastnotification = `${data.alert_word}${data.speaker}`;
              chrome.notifications.create("", data.options);
        }else{
              console.log("avoided notification duplication");
        }
    }
  });
})();
