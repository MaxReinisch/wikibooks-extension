let getBooked = document.getElementById('getBooked');


getBooked.onclick = function(element) {
  console.log("click")
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.runtime.sendMessage({action:"getBooked", "url":tabs[0].url});


  });
}
