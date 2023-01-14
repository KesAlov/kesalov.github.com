function search() {
			var searchcontent = document.getElementById('search').value;
			document.write('<link rel="stylesheet" href="https://kesalov.github.io/search.css"><script src="https://kesalov.github.io/search.js"></script><input type="search" id="search" Placeholder="поиск"><button onclick="search();" >найти</button>' + '<iframe src="' + searchcontent + '" width="100%" height="100%"></iframe>' );
} 