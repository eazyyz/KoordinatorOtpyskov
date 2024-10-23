<?php include('server.php') ?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/Login.css">
</head>

<body>
    <main>
        <div class="container">
            <div class="logo">
                <img src="../img/logo.svg" alt="Logo">
            </div>
            <h2>Авторизация</h2>
            <form method="post" action="login.php">
                <?php include('errors.php'); ?>
                <input type="text" name="username" placeholder="Логин" class="input-field">
                <input type="password" name="password" placeholder="Пароль" class="input-field">
                <button type="submit" class="submit-btn" name="login_user" >Войти</button>
            </form>
            <div class="register-link">
                <p class="noAcc-text">Нет аккаунта? <a href="register.php">Зарегистрируйтесь.</a></p>
                <p class="mainPage-text">Вернуться на <a href="../index.html">главную</a>.</p>
            </div>
        </div>
    </main>
    <footer class="footer">
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
</body>

</html>