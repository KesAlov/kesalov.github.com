session_start();//Подключение должно быть на первой строчке в коде, иначе появится ошибка

$db = mysqli_connect("localhost","login","password"); 

mysqli_select_db($db,"chat");

//Заносим данные админа в сессию

$_SESSION['login'] = 'admin';

$_SESSION['password'] = 'admin';

$_SESSION['id'] = 1;

function send($db,$message) {

	if(auth($db,$_SESSION['login'],$_SESSION['password'])) {//Если авторизация удачна		$message = htmlspecialchars($message);//Заменяем символы ‘<’ и ‘>’на ASCII-код

		$message = trim($message); //Удаляем лишние пробелы

		$message = addslashes($message); //Экранируем запрещенные символы

		$result = mysqli_query($db,"INSERT INTO messages (user_id,message) VALUES ('$_SESSION[id]','$message')");//Заносим сообщение в базу данных

	}

	return load($db); //Вызываем функцию загрузки сообщений

}
    
    //Получаем переменные из супермассива $_POST

//Тут же их можно проверить на наличие инъекций

if(isset($_POST['act'])) {$act = $_POST['act'];}

if(isset($_POST['var1'])) {$var1 = $_POST['var1'];}

if(isset($_POST['var2'])) {$var2 = $_POST['var2'];}

switch($_POST['act']) {//В зависимости от значения act вызываем разные функции

	case 'load': 

		$echo = load($db); //Загружаем сообщения

	break;

	

	case 'send': 

		if(isset($var1)) {

			$echo = send($db,$var1); //Отправляем сообщение

		}

	break;

	

	case 'auth': 

		if(isset($var1) && isset($var2)) {//Авторизуемся

			if(auth($db,$var1,$var2)) {

				$echo = load($db);

			}

		}

	break;

}

echo $echo;//Выводим результат работы кода
    
$.post('includes/chat.php',{

	act: act,	var1: var1,

	var2: var2

}).done(function (data) {

	messages__container.innerHTML = data;

	if(data == 'Проблема авторизации') {

		clearInterval(interval); //Если проблема авторизации, отключаем автообновление

		if(login == null && password == null) {

			login = prompt('Введите логин: ');//Запрашиваем логин

			if(login != null) {

				password = prompt('Введите пароль: ');//Запрашиваем пароль

				send_request('auth',login,password); //Отправляем еще один запрос

			}

		}

	} 

	if(act == 'auth') {

		interval = setInterval(update,500); //Заново запускаем автообновление

	}

	if(act == 'send') {

		messageInput.value = '';

	}

});
