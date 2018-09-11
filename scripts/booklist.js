
let resultsTray = document.getElementById("resultsTray");

//Used to extact the current URL
function getUrlByParameter(name){
    var url=window.location.href;
    var indexOfEnd=url.length;
    var index=url.indexOf(name);
    var length=name.length;
    return url.slice(index+length+1,indexOfEnd);
}


function getBooked(url){
  var xhr=new XMLHttpRequest();
  var new_url="https://archive.org/services/context/books?url=" + url;
  xhr.open("GET",new_url,true);
  xhr.onload=function(){
    let data=JSON.parse(xhr.response);
    if(data instanceof Array){ //checks if any ISBNs found
      for(let book of data){  // Iterate over each book to get data
        let OLID = Object.keys(book.responses)[0];
        let archiveIdentifier = book.responses[OLID]['identifier'];
        if(archiveIdentifier){
          getMetadataFromArchive(archiveIdentifier);
        }else{
          getMetadataFromOpenLibrary(OLID);
        }
      }
    }else{
      resultsTray.appendChild(document.createTextNode(data.message));
    }
  }
  xhr.send();
}

// // parse JSON response for IDs
// function getIDsFromResponse(data){
//   let OLIDs = [];
//   if(data instanceof Array){
//     for(let book of data){
//       let id = Object.keys(book.responses)[0];
//       OLIDs.push(id);
//     }
//   }else{
//     resultsTray.appendChild(document.createTextNode(data.message));
//   }
//   return OLIDs;
// }
//





window.onload = function(){

  var url = getUrlByParameter('url');
  getBooked(url);
  // populateList(response);

};

function getMetadataFromArchive(id){

  var xhr=new XMLHttpRequest();
  xhr.responseType = "json";
  var qurl="https://archive.org/metadata/" + id;
  xhr.open("GET",qurl,true);
  xhr.onload=function(){
    addBookFromArchive(xhr.response.metadata);

  }
  xhr.send();

}

function getMetadataFromOpenLibrary(olid){
  var xhr=new XMLHttpRequest();
  xhr.responseType = "json";
  var qurl= "http://openlibrary.org/works/"+olid+".json";
  console.log(qurl);
  xhr.open("GET",qurl,true);
  xhr.onload=function(){
    addBookFromOpenLibrary(xhr.response);

  }
  xhr.send();
}

function addBookFromArchive(metadata){
  let div = document.createElement('div');
  let book = document.createElement('p');
  let strong = document.createElement('strong');
  let author = document.createElement('p');
  let details = document.createElement('a');
  let img = document.createElement("img");
  let button = document.createElement("a");

  button.setAttribute("class", "btn btn-success resize_fit_center");
  button.setAttribute("href", "https://archive.org/details/" + metadata.identifier);
  details.setAttribute("href", "https://archive.org/details/" + metadata.identifier);
  img.setAttribute("src", "https://archive.org/services/img/" + metadata.identifier);
  // book.setAttribute("class", "book_container");

  details.appendChild(img);
  strong.appendChild(document.createTextNode(metadata.title));
  author.appendChild(document.createTextNode(metadata.creator));
  button.appendChild(document.createTextNode("Read Now"));
  book.appendChild(strong);
  book.appendChild(author)
  book.appendChild(details);
  book.appendChild(button);
  div.appendChild(book);

  resultsTray.appendChild(div);
}

function addBookFromOpenLibrary(metadata){
  let div = document.createElement('div');
  let book = document.createElement('p');
  let strong = document.createElement('strong');
  let author = document.createElement('p');
  let details = document.createElement('a');
  let img = document.createElement("img");
  let button = document.createElement("a");

  button.setAttribute("class", "btn btn-warning resize_fit_center");
  button.setAttribute("href", "#");
  details.setAttribute("href", "http://openlibrary.org" + metadata.key);
  if(metadata.covers){
    img.setAttribute("src", "http://covers.openlibrary.org/w/id/"+metadata.covers[0]+"-M.jpg");
  }else{
    img = document.createElement("p");
    img.appendChild(document.createTextNode("Book details"))
  }

  // book.setAttribute("class", "book_container");

  details.appendChild(img);
  strong.appendChild(document.createTextNode(metadata.title));
  // author.appendChild(document.createTextNode(getAuthorFromOpenLibrary(metadata.authors)));
  button.appendChild(document.createTextNode("Donate"));
  book.appendChild(strong);
  // book.appendChild(author);
  book.appendChild(details);
  book.appendChild(button);
  div.appendChild(book);

  resultsTray.appendChild(div);
}

// function getAuthorFromOpenLibrary(authors){
//   ret = ""
//   for(let i = 0; i < Math.min(2, len(authors)); i++){
//
//   }
// }
