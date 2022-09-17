<?php

//getdata
$txt = $_POST['txt']; 
$apk = $_POST['apk']; 


// send

if (mail("kesovstavros0@gmail.com",
    "Новая программа должна пройти модерацию" ,
    "Текст:" .$txt."/n". 
    "фаил:".$apk."/n"., 
    "from: kesalov@kesalov.org /r/n"
    
    )


?>
