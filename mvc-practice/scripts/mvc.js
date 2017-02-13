function BookModel(bookJSON) {
  this.title     = bookJSON.title || 'Untitled';
  this.author    = bookJSON.author || 'Unknown author';
  this.asin      = bookJSON.asin;
  this.thumbnail = bookJSON.thumbnail;
  this.rating    = bookJSON.rating;
  this.review    = bookJSON.review || 'No review.';
  this.url       = 'http://www.amazon.com/gp/product/' + this.asin + '?tag=amazonsimilar-20';
}
function BookCollection(booksJSON) {
  this.items = [];
  for (var i = 0; i < booksJSON.length; i++) {
    this.items.push(new BookModel(booksJSON[i]));
  }
}
BookCollection.prototype.sort = function() {
  this.items.sort(function(bookA, bookB){
    return (bookA.rating - bookB.rating);
  });
};
function BookView(book) {
    // Create a div with a linked image inside it, 
    // and add that to the shelf div
    var bookDiv = $('<div class="book">');
    var bookLink = $('<a>');
    bookLink.attr('href', book.url);
    var bookCover = $('<img>');
    bookCover.attr('src', book.thumbnail);
    bookLink.append(bookCover);
    bookDiv.append(bookLink);
    // On mouseover, pop up the review
    bookDiv.bind('mouseover', function(e) {
        var reviewDiv = $('<div class="book-review">');
        reviewDiv.html('<strong>' + book.rating + ' stars: </strong>' + (book.review || ' No review.'));
        reviewDiv.css({'position': 'absolute', 'top':  e.pageY, 'left': e.pageX});
        $('body').append(reviewDiv);
    });
    bookDiv.bind('mouseout', function() {
      $('.book-review').remove();
    });
    return bookDiv;
}
function BookShelfView(books) {
  var shelfDiv = $('<div>');
  for (var i = 0; i < books.items.length; i++) {
    shelfDiv.append(new BookView(books.items[i]));
  }
  return shelfDiv;
}
function fetchBooks() {
	// Fetch and sort the data
	$.ajax({type: "GET",
	  url: "books.json",
	  dataType: "json",
	  success: function(booksJSON) {
            var books = new BookCollection(booksJSON);
            books.sort();
            var shelf = new BookShelfView(books);
            $('#bookshelf').append(shelf);
	 }
	});
}
$(document).ready(function() {
	fetchBooks();
});