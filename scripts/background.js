
// Extension only active on wikipedia pages
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'en.wikipedia.org'},
    })
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()]
}]);
});

// // parse JSON response for IDs
// function getIDsFromResponse(data){
//   if(data instanceof Array){
//     for(let book of data){
//       let id = Object.values(book.responses)[0].identifier;
//       ids.push(id);
//     }
//   }else{
//     // console.log(data.message);
//   }
//   return ids;
// }

// // requests "/context/books/" endpoint
// function getBooked(url){
//   var xhr=new XMLHttpRequest();
//   var new_url="https://archive.org/services/context/books?url=" + url;
//   xhr.open("GET",new_url,true);
//   xhr.onload=function(){
//     let data=JSON.parse(xhr.response);
//     ids = getIDsFromResponse(data);
//
//
//
//   }
//   xhr.send();
// }


let ids = []
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){

    // sent from popup requesting that background.js get
    // book identifiers (IDs), and open booklist.html window
    if(request.action === "getBooked"){
      let windowOptions = {
        "url": chrome.runtime.getURL("booklist.html") + "?url="+request.url,
        "left":100,
        "top": 100,
        "width": 500,
        "height":1000
      }
      chrome.windows.create(windowOptions);

    }
    // sent from booklist.js requesting that backgrond.js get
    // send book identifiers
    // if(request.action === "populateBooklist"){
    //   sendResponse({"IDs": ids})
    //   ids = [];
    // }
  }
);
