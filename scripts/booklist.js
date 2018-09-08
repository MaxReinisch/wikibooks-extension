
let resultsTray = document.getElementById("resultsTray");
chrome.runtime.sendMessage({"action" : "populateBooklist"}, function(response){

  // For each id, get meta data and append book to list
  populateList(response);

});
function getMetadata(id){

  var xhr=new XMLHttpRequest();
  xhr.responseType = "json";
  var qurl="https://archive.org/metadata/" + id;
  xhr.open("GET",qurl,true);
  xhr.onload=function(){
    addBook(xhr.response.metadata);

  }
  xhr.send();

}


function populateList(response){

  for (let id of response.IDs){
    if(id){
          getMetadata(id);
    }
  }
}

function addBook(metadata){
  let li = document.createElement('li');
  let book = document.createElement('div');
  let details = document.createElement('a');
  let img = document.createElement("img");

  details.setAttribute("href", "https://archive.org/details/" + metadata.identifier);
  img.setAttribute("src", "https://archive.org/services/img/" + metadata.identifier);
  book.setAttribute("class", "book_container");

  details.appendChild(img);
  book.appendChild(document.createTextNode(metadata.title));
  book.appendChild(details);
  li.appendChild(book);

  resultsTray.appendChild(li);
}
