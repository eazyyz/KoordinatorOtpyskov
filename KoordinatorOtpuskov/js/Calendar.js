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
  













    /*попытка кастомной подсказки
    const b = document.getElementById('b');
    const tooltip = document.getElementById('tooltip');

    b.addEventListener('mouseenter', (event) => {
        const rect = b.getBoundingClientRect();
        tooltip.style.left = `${rect.right}px`;
        tooltip.style.top = `${rect.top}px`;
        tooltip.style.display = 'block';
    });

    b.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
*/








    /*Начало работы календаря*/













    const currentMonthElement = document.getElementById('currentMonth');
    const datesElement = document.getElementById('dates');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');

    let currentDate = new Date();
    let selectedDates = new Set();
    let isSelecting = false;
    let startDate = null;
    let endDate = null;

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Скорректировать понедельник как первый день
        const lastDate = new Date(year, month + 1, 0).getDate();

        currentMonthElement.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        datesElement.innerHTML = '';

        // Добавляет пустые дни перед первым днём месяца
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('date', 'empty');
            datesElement.appendChild(emptyDay);
        }

        // Добавление дней месяца
        for (let date = 1; date <= lastDate; date++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('date');
            dateElement.textContent = date;
            dateElement.dataset.date = new Date(year, month, date).toISOString().split('T')[0];

            dateElement.addEventListener('mousedown', startSelect);
            dateElement.addEventListener('mouseover', selectDate);
            dateElement.addEventListener('mouseup', endSelect);

            datesElement.appendChild(dateElement);
        }
    }

    function startSelect(event) {
        isSelecting = true;
        selectedDates.clear();
        startDate = event.target.dataset.date;
        endDate = startDate; // Инициализация конца выделения даты в начале
        updateSelectedDates();
        window.addEventListener('mouseup', endSelect);
    }

    function selectDate(event) {
        if (isSelecting) {
            endDate = event.target.dataset.date;
            updateSelectedDates();
        }
    }

    function endSelect() {
        isSelecting = false;
        window.removeEventListener('mouseup', endSelect);
    }

    function updateSelectedDates() {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            selectedDates.clear();

            let current = new Date(start);
            const increment = start <= end ? 1 : -1;

            while ((increment === 1 && current <= end) || (increment === -1 && current >= end)) {
                selectedDates.add(current.toISOString().split('T')[0]);
                current.setDate(current.getDate() + increment);
            }
        }

        const dateElements = document.querySelectorAll('.date:not(.empty)');
        dateElements.forEach(dateElement => {
            if (selectedDates.has(dateElement.dataset.date)) {
                dateElement.classList.add('selected');
            } else {
                dateElement.classList.remove('selected');
            }
        });
    }

    function clearSelection(event) {
        if (!event.target.closest('.date') && !event.target.closest('.header') && !event.target.closest('.calendar')) {
            selectedDates.clear();
            const dateElements = document.querySelectorAll('.date:not(.empty)');
            dateElements.forEach(dateElement => {
                dateElement.classList.remove('selected');
            });
        }
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    document.addEventListener('click', clearSelection);

    renderCalendar();
  


















    /*Конец работы календаря*/
/*______________________________Конец действий при загрузке страницы______________________________*/
});



