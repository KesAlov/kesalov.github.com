
function login() {
	var uid = document.getElementById('uid');
if ( uid == '0000-0000-0000-0000') {
		setCookie("username", "testaccount");
		}
		
if ( uid == "****-****-****-****") {
	
	setCookie("username", "Кесов Ставрос");
	setCookie("email", "kesovstavros0@gmail.com");
	alert ("Добро пожаловать, Кесов Ставрос");
	} 
	
	setCookie("uid", uid);

		
	} 