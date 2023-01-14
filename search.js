function search() {
			var searchcontent = document.getElementById('search').value;
			document.write('<input type="search" id="search" Placeholder="поиск"><button onclick="search();" >найти</button>' + '<iframe src="' + searchcontent + '" width="100%" height="100%"></iframe>' );
} 