"use strict";

//------------------------------------------------------------------------Меню-Бургер
const burgerMenu = document.querySelector(".header__burger");
const menuBody = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const headerBody = document.querySelector(".header__body");
if (burgerMenu) {
  burgerMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    burgerMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
    logo.classList.toggle("_active");
    headerBody.classList.toggle("_active");
  });
}

let buttons = document.querySelectorAll(".menu__link");

buttons.forEach((elem) => {
  elem.addEventListener("click", () => {
    menuBody.classList.remove("_active");
    burgerMenu.classList.remove("_active");
  });
});


//------------------------------------------------------------------------Слайдер
const swiper = new Swiper(".slider", {
  direction: "horizontal",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  speed: 2000,
});
//------------------------------------------------------------------------Слайдер

//------------------------------------------------------------------------Таймер

//Определяем действующие элементы на странице
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

const currentYear = new Date().getFullYear();
const nextYear = new Date(`April 01 ${currentYear + 1} 03:10:00`);

function updateCounter() {
  const currentTime = new Date();
  const diff = nextYear - currentTime;

  //Перевод в дни
  const daysLeft = Math.floor(diff / 1000 / 60 / 60 / 24);

  //Часов всего, далее остаток от деления на 24 (преобразования в дни), получаем 8 часов
  const hoursLeft = Math.floor(diff / 1000 / 60 / 60) % 24;
  //Минут всего, далее остаток от преобразования в часы, минут осталось
  const minutesLeft = Math.floor(diff / 1000 / 60) % 60;
  //Получаем секунды
  const secondsLeft = Math.floor(diff / 1000) % 60;

  hours.innerText =  hoursLeft < 10 ? "0" + hoursLeft : hoursLeft + ':';
  minutes.innerText = minutesLeft < 10 ? "0" + minutesLeft : minutesLeft + ':';
  seconds.innerText = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
}
updateCounter()

//Запускаем расчет 1 раз в секунду (каждую секунду)
setInterval(updateCounter, 1000);

//------------------------------------------------------------------------Таймер

//------------------------------------------------------------------------popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");


let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    })
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener("click", function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock () {
  setTimeout(function () {
    if(lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
  }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});

//------------------------------------------------------------------------popup

//------------------------------------------------------------------------Accordion
const titles = document.querySelectorAll(".accordion__title");
const contents = document.querySelectorAll(".accordion__content");

titles.forEach((item) =>
  item.addEventListener("click", () => {
    const activeContent = document.querySelector("#" + item.dataset.tab);

    if (activeContent.classList.contains("active")) {
      activeContent.classList.remove("active");
      item.classList.remove("active");
      activeContent.style.maxHeight = 0;
    } else {
      contents.forEach((element) => {
        element.classList.remove("active");
        element.style.maxHeight = 0;
      });
      titles.forEach((element) => element.classList.remove("active"));

      item.classList.add("active");
      activeContent.classList.add("active");
      activeContent.style.maxHeight = activeContent.scrollHeight + "px";
    }
  })
);

//------------------------------------------------------------------------Accordion

