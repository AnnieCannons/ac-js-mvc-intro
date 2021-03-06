function addBookToShelf(book) {
   var shelfDiv = $('#bookshelf');

   // Create a div with a linked image inside it, 
   // and add that to the shelf div
   var bookDiv = $('<div class="book">');
   var bookLink = $('<a>');
   var bookAmazonURL = 'http://www.amazon.com/gp/product/' + book.asin + '?tag=amazonsimilar-20';
   bookLink.attr('href', bookAmazonURL);
   var bookCover = $('<img>');
   bookCover.attr('src', book.thumbnail);
   bookLink.append(bookCover);
   bookDiv.append(bookLink);

   shelfDiv.append(bookDiv);

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
}

function sortByRating(bookA, bookB){
	return (bookA.rating - bookB.rating);
}


function fetchBooks() {
	// Fetch and sort the data
	$.ajax({type: "GET",
	  url: "books.json",
	  dataType: "json",
	  success: function(books) { 
	  	books.sort(sortByRating);
	    for (var i = 0; i < books.length; i++) {
	      addBookToShelf(books[i]);
	    }
	 }
	});
}

$(document).ready(function() {
	fetchBooks();
});
