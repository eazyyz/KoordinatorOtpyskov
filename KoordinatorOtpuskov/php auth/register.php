<?php 
    // Проверяем, были ли отправлены данные через POST и задаём переменные
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Регистрация</title>
    <link rel="stylesheet" href="../css/Sign up.css">
</head>

<body>
    <div class="container">
        <!-- Первая часть -->
        <div id="selection-screen">
            <div class="logo">
                <img src="../img/Logo.svg" alt="Logo">
            </div>

            <h2>Регистрация</h2>
            <h3>Кто вы?</h3>
            <div class="card-container">
                <div class="card" id="employee-card">
                    <h4>Сотрудник</h4>
                    <img src="../img/employee-icon.png" alt="Сотрудник">
                </div>
                <div class="card" id="manager-card">
                    <h4>Руководитель</h4>
                    <img src="../img/manager-icon.png" alt="Руководитель">
                </div>
            </div>
            <div class="register-link">
                <p class="noAcc-text">Есть аккаунт? <a href="login.php">Войдите</a>.</p>
                <p class="mainPage-text">Вернуться на <a href="../index.html">главную</a>.</p>
            </div>
        </div>

        <!-- Форма для сотрудника -->
        <div class="form-container" id="employee-form">
            <img src="../img/Logo.svg" alt="Logo">
            <h2>Регистрация</h2>
            <form method="post" action="server.php">
                <input type="hidden" name="user_type" value="0">
                <input type="text" placeholder="Имя" class="input-field" name="username" value="<?php echo $username; ?>">
                <input type="email" placeholder="Почта" class="input-field" name="email" value="<?php echo $email; ?>">
                <input type="password" placeholder="Пароль" class="input-field" name="password">
                <button type="submit" class="submit-btn" name="reg_user">Войти</button>
            </form>
            <div class="back-button" onclick="goBack()">Назад</div>
        </div>

        <!-- Форма для руководителя -->
        <div class="form-container" id="manager-form">
            <img src="../img/Logo.svg" alt="Logo">
            <h2>Регистрация</h2>
            <p class="attention_text">Вы можете создать аккаунт предварительно
                <br>или дождаться ссылки от руководителя.
            </p>
            <form method="post" action="server.php">
                <input type="hidden" name="user_type" value="1"> <!-- Скрытое поле -->
                <input type="text" placeholder="Имя" class="input-field" name="username" value="<?php echo htmlspecialchars($username); ?>">
                <input type="email" placeholder="Почта" class="input-field" name="email" value="<?php echo htmlspecialchars($email); ?>">
                <input type="password" placeholder="Пароль" class="input-field" name="password">
                <button type="submit" class="submit-btn" name="reg_user">Войти</button>
            </form>
            <div class="back-button" onclick="goBack()">Назад</div>
        </div>
    </div>
    <script src="../js/sign up.js"></script>
</body>

</html>
