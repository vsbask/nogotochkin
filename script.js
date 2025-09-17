// Telegram WebApp
const webApp = window.Telegram.WebApp;
webApp.ready();
webApp.setHeaderColor('#ff69b4');
webApp.setBackgroundColor('#fffaf0');

// Подставить имя пользователя
function setUser() {
  const userName = webApp.initDataUnsafe?.user?.first_name || 'девушка';
  document.getElementById('user-name').textContent = userName;
}
setUser();

// Закрыть приложение
function closeApp() {
  webApp.close();
}

// Переключение вкладок
function showTab(tabName) {
  // Пока просто заглушка — в будущем можно добавить другие экраны
  alert(`Переход на: ${tabName}`);
}

// Действия кнопок
function bookUrgent() {
  webApp.showAlert("⚡ Открываем ближайшие слоты...");
  // Позже: открыть экран с ближайшими датами
}

function bookCalendar() {
  webApp.showAlert("📅 Открываем календарь...");
  // Позже: открыть полный календарь
}

function showPromo() {
  webApp.showAlert("🎁 Акции: 5-й маникюр — скидка 20%!");
}

function showPopular() {
  webApp.showAlert("🔥 Показываем популярные услуги...");
}

function openInstagram() {
  webApp.openLink('https://www.instagram.com/ksenya_beauty_nails');
}

function showContact() {
  webApp.showAlert("📞 Открываем контакты...");
}

// Горизонтальный скролл
let carouselOffset = 0;
const cardWidth = 140; // ширина карточки + gap

function scrollServices(direction) {
  const carousel = document.querySelector('.carousel');
  const cards = carousel.children;
  const maxOffset = (cards.length - 1) * cardWidth;

  carouselOffset += direction * cardWidth;

  if (carouselOffset < 0) carouselOffset = 0;
  if (carouselOffset > maxOffset) carouselOffset = maxOffset;

  carousel.style.transform = `translateX(-${carouselOffset}px)`;
}
