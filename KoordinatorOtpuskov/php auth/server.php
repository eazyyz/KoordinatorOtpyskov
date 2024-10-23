<?php
session_start();

// initializing variables
$username = "";
$email    = "";
$errors = array(); 

// connect to the database
$db = mysqli_connect('localhost', 'root', 'root', 'registration');

// REGISTER USER
if (isset($_POST['reg_user'])) {
  // receive all input values from the form
  $username = mysqli_real_escape_string($db, $_POST['username']);
  $email = mysqli_real_escape_string($db, $_POST['email']);
  $password = mysqli_real_escape_string($db, $_POST['password']);
  $user_type = mysqli_real_escape_string($db, $_POST['user_type']);

  // form validation: ensure that the form is correctly filled ...
  if ((empty($username)) || (empty($email)) || (empty($password))) { array_push($errors, "Введите все поля"); }


  // Check if user already exists
  $user_check_query = "SELECT * FROM users WHERE username='$username' OR email='$email' LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);
  
  if ($user) { // if user exists
    if ($user['username'] === $username) {
      array_push($errors, "Username already exists");
    }
    if ($user['email'] === $email) {
      array_push($errors, "Email already exists");
    }
  }

  // Register user if no errors
  if (count($errors) == 0) {
        $password = md5($password); // encrypt password

        $query = "INSERT INTO users (username, email, password, user_type)
                          VALUES('$username', '$email', '$password', '$user_type')";
        mysqli_query($db, $query);
        $_SESSION['username'] = $username;
        $_SESSION['success'] = "You are now logged in";

        // Redirect based on user type
        if ($user_type == '1') {
            header('location: ../html/Profile Boss.html'); 
        } else {
            header('location: ../html/Profile Employee.html');
        }
  }
}

// LOGIN USER
if (isset($_POST['login_user'])) {
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $password = mysqli_real_escape_string($db, $_POST['password']);
  
    if ((empty($username)) || (empty($password))) { array_push($errors, "Введите все поля"); }
  
    if (count($errors) == 0) {
          $password = md5($password);
          $query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
          $results = mysqli_query($db, $query);
          
          if (mysqli_num_rows($results) == 1) {
            $user = mysqli_fetch_assoc($results);
            $_SESSION['username'] = $username;
            $_SESSION['success'] = "You are now logged in";

            if ($user['user_type'] == '1') { 
                header('location: ../html/Profile Boss.html');
            } else {
                header('location: ../html/Profile Employee.html');
            }
          } else {
              array_push($errors, "Неправильный логин или пароль");
          }
    }
}
?>
<!-- код взят отсюда https://codewithawa.com/posts/complete-user-registration-system-using-php-and-mysql-database -->