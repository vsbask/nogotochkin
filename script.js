let selectedService = null;
let selectedDate = null;
let selectedTime = null;

const services = [
  "Маникюр без покрытия",
  "Маникюр с покрытием",
  "Наращивание ногтей",
  "Френч",
  "Втирка",
  "Стразы",
  "Дизайн",
  "Градиент",
  "Снятие покрытия",
  "Поднятие клюющих",
  "Ремонт/зачистка"
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Инициализация Telegram WebApp
const webApp = window.Telegram.WebApp;
webApp.ready();
webApp.setHeaderColor('#ff69b4');
webApp.setBackgroundColor('#fffaf0');

function closeApp() {
  webApp.close();
}

// Выбор услуги
function selectService(id) {
  selectedService = services[id - 1];
  showScreen('screen-calendar');
  renderCalendar();
}

// Рендер календаря
function renderCalendar() {
  const monthYear = document.getElementById('month-year');
  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const calendarGrid = document.getElementById('calendar-grid');
  calendarGrid.innerHTML = '';

  const firstDay = new Date(currentYear, currentMonth, 1).getDay() || 7;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Пустые ячейки до 1-го числа
  for (let i = 1; i < firstDay; i++) {
    calendarGrid.innerHTML += '<div></div>';
  }

  // Дни месяца
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isFuture = new Date(dateStr) >= new Date();
    const isAvailable = isFuture && Math.random() > 0.3; // имитация занятости

    let className = '';
    let text = day;

    if (!isFuture) {
      className = 'unavailable';
    } else if (isAvailable) {
      className = 'available';
    } else {
      className = 'unavailable';
    }

    calendarGrid.innerHTML += `
      <div class="${className}" ${isAvailable ? `onclick="selectDate('${dateStr}')" ` : ''}>
        ${text}
      </div>
    `;
  }
}

function prevMonth() {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
  renderCalendar();
}

function nextMonth() {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  renderCalendar();
}

function selectDate(dateStr) {
  selectedDate = dateStr;
  showScreen('screen-time');
}

function selectTime(timeStr) {
  selectedTime = timeStr;
  document.getElementById('confirm-service').textContent = selectedService;
  document.getElementById('confirm-date').textContent = formatDate(selectedDate);
  document.getElementById('confirm-time').textContent = timeStr;
  showScreen('screen-confirm');
}

function backToTime() {
  showScreen('screen-time');
}

function backToCalendar() {
  showScreen('screen-calendar');
}

function confirmBooking() {
  if (!selectedService || !selectedDate || !selectedTime) {
    alert('Пожалуйста, выберите все данные');
    return;
  }

  const data = JSON.stringify({
    action: 'book',
    service: selectedService,
    date: selectedDate,
    time: selectedTime,
    user: {
      id: webApp.initDataUnsafe?.user?.id,
      name: webApp.initDataUnsafe?.user?.first_name || 'Клиент'
    }
  });

  webApp.sendData(data);
  showScreen('screen-success');
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { day: 'numeric', month: 'long' };
  return date.toLocaleDateString('ru-RU', options);
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// Инициализация

renderCalendar();
