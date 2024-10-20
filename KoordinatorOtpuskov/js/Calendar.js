function setHeight(){
  /*Высота экрана (видимая внутренняя часть браузера) пользователя*/
  const window_h = window.innerHeight;

  /*Размер всей боковой панели*/
  const sideplate = document.getElementById('sideplate');
  sideplate.style.height = window_h + 'px';

  /*Размер боковой панели департаментов*/
  const sidebar = document.getElementById('sidebar');
  sidebar.style.height = window_h - 144 - 133 + 'px';


  /*Верхний отступ у модульных окон*/
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.style.marginTop = window_h * 0.125 + 'px';
  });

}
/*Автоматическое изменение при загрузке страницы / изменении высоты экрана)*/
window.addEventListener('load', setHeight);
window.addEventListener('resize', setHeight);





/*Действия при загрузки страницы*/

document.addEventListener('DOMContentLoaded', () => {
/*______________________________Начало действий при загрузке страницы______________________________*/
    

  /*Чтобы по нажатию на фон закрывалось модальное окно*/
  const handleModalClick = ({ currentTarget, target }) => {
    const isClickedOnBackdrop = target === currentTarget;
  
    if (isClickedOnBackdrop) {
      currentTarget.close();
    }
  };

  /*Выбираем все модальные окна*/
  const modals = document.querySelectorAll(".modal");

  /*Перебираем все найденные модальные окна и добавляем обработчик событий каждому модальному окну*/
  modals.forEach(modal => {
    modal.addEventListener("click", handleModalClick);
  });



  /*Закрытие любого модального окна на кнопку X справа сверху окна*/
  const ModalCloseButtons = document.querySelectorAll(".modal__close-button");
  ModalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      modal.close();
    });
  });




  /*Открытие модального окна "Новый отпуск" по нажатию на кнопку*/
  const Modal__NewHolidays = document.querySelector(".modal__newholidays");
  const Button__NewHolidays = document.querySelector(".side__bottom-newholidays-button");
  Button__NewHolidays.addEventListener("click", () => {
    Modal__NewHolidays.showModal();
  });



  /*Открытие модального окна "Настройки" по нажатию на кнопку*/
  const Modal_Department_Settings = document.querySelector(".modal__department-settings")
  const Buttons_Department_Settings = document.querySelectorAll(".sidebar__department-settings-button");
  Buttons_Department_Settings.forEach(button => {
    button.addEventListener('click', () => {
        Modal_Department_Settings.showModal();
      });
    });
  





/*______________________________Конец действий при загрузке страницы______________________________*/
});



