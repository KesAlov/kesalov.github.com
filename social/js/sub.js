var requestURL = 'https://kesalov.github.io/social/databases/json/subs.json';
var request = new XMLHttpRequest();
request.responseType = 'json';
request.send();
request.onload = function() {
  var subs = request.response;
 } 
 
 

function sub(profile) {
	var requestURL = 'https://kesalov.github.io/social/databases/json/subs.json';
var request = new XMLHttpRequest();
request.responseType = 'json';
request.send();
request.onload = function() {
  var subs = request.response;
 } 
 
 
	
	var myJSON = { "name": profile};
myJSON
var myString = JSON.stringify(myJSON);
myString
request.open('GET', requestURL);
request.responseType = 'text'; // now we're getting a string!
request.send();
} 