// function findISBNs(body){ // requires further testing
//   var search_result = body.match(/isbn\D{0,3}[-\s\d]{9,16}\d/ig);
//   return search_result;
// }
//
// function isValidISBN(str) {
//   // https://stackoverflow.com/questions/11104439/how-do-i-check-if-an-input-contains-an-isbn-using-javascript
//   var sum,
//   weight,
//   digit,
//   check,
//   i;
//
//   str = str.replace(/[^0-9X]/gi, '');
//
//   if (str.length != 10 && str.length != 13) {
//     return false;
//   }
//
//   if (str.length == 13) {
//     sum = 0;
//     for (i = 0; i < 12; i++) {
//       digit = parseInt(str[i]);
//       if (i % 2 == 1) {
//         sum += 3*digit;
//       } else {
//         sum += digit;
//       }
//     }
//     check = (10 - (sum % 10)) % 10;
//     return (check == str[str.length-1]);
//   }
//
//   if (str.length == 10) {
//     weight = 10;
//     sum = 0;
//     for (i = 0; i < 9; i++) {
//       digit = parseInt(str[i]);
//       sum += weight*digit;
//       weight--;
//     }
//     check = 11 - (sum % 11);
//     if (check == 10) {
//       check = 'X';
//     }
//     return (check == str[str.length-1].toUpperCase());
//   }
// } // Replace this.  Failed a valid ISBN: 0-7141-2504-0
//
// function validationCheck(isbns){
//   console.log("found " + isbns.length + " ISBNs.");
//   validList = isbns.map(isValidISBN);
//   console.log(validList.reduce((x, y) => x+y) + " are valid.");
//   console.log("Printing invalid ISBN(s):");
//   for(let i =0; i < isbns.length; i++){
//     if(!validList[i]){
//       console.log(isbns[i]);
//     }
//   }
// }

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

// parse JSON response for IDs
function getIDsFromResponse(data){
  if(data instanceof Array){
    for(let book of data){
      let id = Object.values(book.responses)[0].identifier;
      ids.push(id);
    }
  }else{
    console.log(data.message);
  }
  return ids;
}

// requests "/context/books/" endpoint
function getIDs(url){
  var xhr=new XMLHttpRequest();
  var new_url="https://archive.org/services/context/books?url=" + url;
  xhr.open("GET",new_url,true);
  xhr.onload=function(){
    let data=JSON.parse(xhr.response);
    ids = getIDsFromResponse(data);
  }
  xhr.send();
}

let ids = []
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){

    // sent from popup requesting that background.js get
    // book identifiers (IDs), and open booklist.html window
    if(request.action === "getIDs"){
      getIDs(request.url);
      let windowOptions = {
        "url": "booklist.html",
        "left":100,
        "top": 100,
        "width": 200,
        "height":800
      }
      chrome.windows.create(windowOptions);
    }
    // sent from booklist.js requesting that backgrond.js get
    // book metadata and send it back as a response
    if(request.action === "populateBooklist"){
      // TODO: request archive.org/metadata here
      sendResponse({'IDs': ids})
    }
  }
);
