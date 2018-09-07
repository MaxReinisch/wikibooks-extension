console.log("Extension is on this page")

function showBody(){
  return document.body.innerText
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.action === "showMeYourBody"){
      console.log("getting isbns");
      sendResponse({"body" : showBody()});

    }
  });
