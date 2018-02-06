// Change background image when page refreshes
			
	var images = ['background-image.jpg', 'background-image2.jpg', 'background-image3.jpg'];
	$('body').css({'background-image': 'url(img/' + images[Math.floor(Math.random() * images.length)] + ')'});
	


// Listen for form submit
	document.getElementById('myForm').addEventListener('submit', saveBookmark);

	// Save Bookmark
	function saveBookmark(e) {
		// Get form values
		var siteName = document.getElementById('siteName').value;
		var siteUrl = document.getElementById('siteUrl').value;

 
		if(!validateForm(siteName, siteUrl)) {
			return false;
		}


		var bookmark = {
			name: siteName,
			url: siteUrl
		}

		// Local Storage Test
		/*
		localStorage.setItem('test', 'Hello World!');
		console.log(localStorage.getItem('test'));
		localStorage.removeItem('test');
		console.log(localStorage.getItem('test'));
		*/

		// Test if bookmarks is null		
		if(localStorage.getItem('bookmarks') === null) {
			// Init array
			var bookmarks = [];
			// add to array
			bookmarks.push(bookmark);
			// set tp localStorage
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		} else {
			// fetch it from localStorage
			var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
			// Add bookmarks to array
			bookmarks.push(bookmark);
			// Reset it back to localStorage
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		}

		// Clear form
		document.getElementById('myForm').reset();


		//Refetch Bookmarks
		fetchBookmarks();

		// Prevent form from submitting
		e.preventDefault();
	}

	// Delete Bookmark
	function deleteBookmark(url){
		// Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Loop through bookmarks
		for (var i = 0; i < bookmarks.length; i++) {
			if (bookmarks[i].url == url){
				//Remove from array
				bookmarks.splice(i, 1);
			}
		}
		// Reset it back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

		//Refetch Bookmarks
		fetchBookmarks();
	}


	// Fetch bookmarks
	function fetchBookmarks(){
		// fetch it from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		// Get Output id
		var bookmarksResults = document.getElementById('bookmarksResults');

		//Build Output
		bookmarksResults.innerHTML = '';
		for (i = 0; i < bookmarks.length; i++) {
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;

			bookmarksResults.innerHTML += '<div class="well">' +
											'<h3>' +name+
											' <a class="btn btn-success btn-sm" target="_blank" href="'+url+'">Visit Bookmark</a>' + 
											' <a onclick="deleteBookmark(\''+url+'\');" class="btn btn-danger btn-sm" href="#/">Delete Bookmark</a>'
											'</h3>'+
											'</div>';
		};
	}

	// Validate form

	function validateForm(siteName, siteUrl) {
		if(!siteName || !siteUrl) {
			alert('Please fill in the site name and site url');
			return false;
		}

		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);

		if (!siteUrl.match(regex)) {
			alert('Please use a valid url');
			return false;
		}

		return true;
	}


	



	