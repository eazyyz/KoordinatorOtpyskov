<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/info_cards.css">
    <title>Vacation Planner</title>
</head>
<body>
    <div class="wrapper">
        <header>
            <div class="container">
                <div class="header__body">
                    <img src="../img/logo.svg" alt="">
                    <nav>
                        <a href="./Calendar.html">Графики отпусков</a>
                        <a href="#">Сотрудники</a>
                        <a href="./Profile Boss.html">Профиль</a>
                    </nav>
                </div>
            </div>
        </header>

        <main>
            <div class="container">
                <div class="info__cards">
                    <div class="info__cards_items">
                        <form action="" method="get" class="staff__form">
                            <input type="text" name="name" id="name" placeholder="Поиск по имени..." required />
                            <button type="submit">Поиск</button>
                        </form>
                        <div class="info__cards_items_list">
                            <?php
                            // Подключение к базе данных
                            $db = new mysqli('localhost', 'root', 'root', 'registration');

                            // Проверка подключения
                            if ($db->connect_error) {
                                die("Connection failed: " . $db->connect_error);
                            }

                            // Получение данных из формы
                            $searchName = isset($_GET['name']) ? $_GET['name'] : '';

                            // Запрос для получения данных пользователей
                            $query = "SELECT username, profession, color FROM users";
                            if (!empty($searchName)) {
                                $query .= " WHERE username LIKE ?";
                            }
                            $query .= " ORDER BY username";

                            $stmt = $db->prepare($query);
                            if (!empty($searchName)) {
                                $searchName = '%' . $searchName . '%';
                                $stmt->bind_param("s", $searchName);
                            }
                            $stmt->execute();
                            $result = $stmt->get_result();

                            // Проверка наличия данных
                            if ($result->num_rows > 0) {
                                // Вывод данных каждого пользователя
                                while($row = $result->fetch_assoc()) {
                                    echo '<div class="info__cards_items_list_item staff">';
                                    echo '<div class="staff__color_block" style="background-color: ' . $row['color'] . ';"></div>';
                                    echo '<p>' . $row['username'] . ',</p>';
                                    echo '<p>' . $row['profession'] . '</p>';
                                    echo '</div>';
                                }
                            } else {
                                echo "No users found.";
                            }

                            // Закрытие соединения
                            $stmt->close();
                            $db->close();
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer>
            <p>© Copyright КоординаторОтпусков.ру</p>
        </footer>

    </div>
</body>
</html>
