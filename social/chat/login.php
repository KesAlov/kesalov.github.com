<?php

session_start();

 

if(isset($_POST['enter'])){

    if($_POST['name'] != ""){

        $_SESSION['name'] = stripslashes(htmlspecialchars($_POST['name']));

    }

    else{

        echo '<span class="error">Please type in a name</span>';

    }

}

 

function loginForm(){

    echo'

    <div id="loginform">

      <p>Please enter your name to continue!</p>

      <form action="index.php" method="post">

        <label for="name">Name &mdash;</label>

        <input type="text" name="name" id="name" />

        <input type="submit" name="enter" id="enter" value="Enter" />

      </form>

    </div>

    ';

}

?> 
