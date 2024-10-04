import template from "./presentation.hbs";

/**
 * Основная функция для рендеринга презентации.
 * Она настраивает все необходимые элементы интерфейса и обрабатывает события касания.
 */
export function renderPresentation() {
  document.querySelector("main").innerHTML = template();

  const slider = document.querySelector(".container__list");
  document.addEventListener("touchstart", down);
  document.addEventListener("touchend", up);

  let pointerdown = 0;
  let pointerup = 0;
  let slide = 0;

  /**
   * Обработчик события касания, который сохраняет начальную позицию касания.
   * @param {TouchEvent} e - Событие касания.
   */
  function down(e) {
    pointerdown = e.changedTouches[0].clientX;
  }

  /**
   * Обработчик события завершения касания, который изменяет положение слайдера
   * в зависимости от направления свайпа.
   * @param {TouchEvent} e - Событие касания.
   */
  function up(e) {
    pointerup = e.changedTouches[0].clientX;

    if (pointerup === pointerdown || Math.abs(pointerdown - pointerup) < 50)
      return;

    const direction = pointerdown - pointerup < 0 ? 1 : -1;
    slide += direction;

    if (slide > 0) slide = 0;
    if (slide < -2) slide = -2;

    slider.style.transform = `translateX(${slide * 100}vw)`;

    if (slide === -1) {
      document.querySelectorAll(".description__background li").forEach((i) => {
        i.style.animation = "none";
        i.offsetHeight;
        i.style.animation = null;
        i.style.animationPlayState = "running";
      });
    }
  }

  document.querySelector(".container__home-button").onclick = () => {
    slider.style.transform = `translateX(0vw)`;
    slide = 0;
  };

  document.querySelector(".button").onclick = () => {
    slider.style.transform = `translateX(-100vw)`;
    slide = -1;
  };

  document.querySelector(".brand__btn").onclick = () => {
    document.querySelector(".brand__name").innerHTML = "преимущества";
    document.querySelector(".brand__bg").style.opacity = "0.702";
    document.querySelector(".brand__desc").style.opacity = "1";
    document.querySelector(".brand__desc").style.zIndex = "3";
  };

  document.querySelector(".brand__close").onclick = () => {
    document.querySelector(".brand__name").innerHTML = "Ключевое сообщение";
    document.querySelector(".brand__bg").style.opacity = "0";
    document.querySelector(".brand__desc").style.opacity = "0";
    document.querySelector(".brand__desc").style.zIndex = "1";
  };

  const items = document.querySelectorAll(".brand__point");

  for (let i = 3; i < 6; i++) {
    items[i].style.position = "absolute";
    items[i].style.opacity = "0";
  }

  /**
   * Функция для переключения видимости элементов на основе заданных индексов.
   * @param {number} showStart - Индекс первого элемента, который будет виден.
   * @param {number} showEnd - Индекс последнего элемента, который будет виден.
   */
  function toggleItems(showStart, showEnd) {
    for (let i = 0; i < items.length; i++) {
      const isVisible = i >= showStart && i <= showEnd;
      items[i].style.position = isVisible ? "static" : "absolute";
      items[i].style.opacity = isVisible ? "1" : "0";
      items[i].style.transition = isVisible ? "opacity 0.4s" : "none";
    }
  }

  document.querySelector(".brand__arrow-left").onclick = () => {
    document.querySelector(".brand__arrow-right").classList.remove("active");
    document.querySelector(".brand__arrow-left").classList.add("active");
    toggleItems(0, 2);
  };

  document.querySelector(".brand__arrow-right").onclick = () => {
    document.querySelector(".brand__arrow-left").classList.remove("active");
    document.querySelector(".brand__arrow-right").classList.add("active");
    toggleItems(3, 5);
  };

  const container = document.querySelector(".description__text");

  let isDragging = false;
  let startY = 0;
  let scrollTop = 0;

  container.addEventListener("touchstart", (e) => {
    if (e.touches[0].clientX > 72 && e.touches[0].clientX < 100) {
      isDragging = true;
      startY = e.touches[0].clientY;
      scrollTop = container.scrollTop;
    }
  });

  container.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const y = e.touches[0].clientY;
    const deltaY = y - startY;
    container.scrollTop = scrollTop + deltaY * 3;
  });

  container.addEventListener("touchend", () => {
    isDragging = false;
  });
}
