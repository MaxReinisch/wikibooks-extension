let isbns = []
let ISBNlist = document.getElementById("ISBNlist");
chrome.runtime.sendMessage({"action" : "populateBooklist"}, function(response){
  populateList(response.IDs);

});


function populateList(list_of_strings){


  for (let string of list_of_strings){
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(string));
    ISBNlist.appendChild(li);
  }
}
