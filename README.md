# Wikipedia book finder
## A google chrome extension for finding books through wikipedia ISBN numbers and The Internet Archive
by Max Reinisch


There are two cases when scraping a wikipedia page's ISBNs:
* The archive has the book and can display the data/read now
* The archive does not have the book
  * The openLibrary has data on the books
    * returns this response: {"responses": {"OL8010117W": {"error_message": "not found", "status": "error"}},"success": true}
  * The openLibrary does not have any data on the book
    * what is this response?

Here are a list of isbn numbers from the [Easter Island Page](https://en.wikipedia.org/wiki/Easter_Island):

* 9780307787057
* 9780306474941
* 9781861892829
* 1-4391-5031-1
* 9780520261143
* 0-521-84829-6
* 0-8160-7109-8
* 0-8020-9888-6
* 0-14-303655-6
* 0-19-823710-3
* 0-404-14231-1
* 978-0-226-77142-7
* 9781588390110
* 0-917956-74-5
* 978-1-899833-22-1
* 9569337001
* 0-7141-2504-0

Compare to [API response](https://archive.org/services/context/books?url=https://en.wikipedia.org/wiki/Easter_Island)
