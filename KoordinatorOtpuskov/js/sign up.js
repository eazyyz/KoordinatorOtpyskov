 // Получаем элементы
 const employeeCard = document.getElementById('employee-card');
 const managerCard = document.getElementById('manager-card');
 const employeeForm = document.getElementById('employee-form');
 const managerForm = document.getElementById('manager-form');
 const selectionScreen = document.getElementById('selection-screen');

 // Функции для показа форм
 function showEmployeeForm() {
     selectionScreen.classList.add('hidden'); // Скрываем экран выбора
     employeeForm.classList.add('active');   // Показываем форму сотрудника
 }

 function showManagerForm() {
     selectionScreen.classList.add('hidden'); // Скрываем экран выбора
     managerForm.classList.add('active');    // Показываем форму руководителя
 }

 // Добавляем обработчики событий для карточек
 employeeCard.addEventListener('click', showEmployeeForm);
 managerCard.addEventListener('click', showManagerForm);

 // Функция для возврата к выбору
 function goBack() {
     employeeForm.classList.remove('active');
     managerForm.classList.remove('active');
     selectionScreen.classList.remove('hidden'); // Показываем экран выбора
 }