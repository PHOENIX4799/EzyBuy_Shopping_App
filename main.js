let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", function () {
  const slideWrapper = document.querySelector(".slide-wrapper");
  const cards = document.querySelectorAll(".card");
  let currentIndex = 0;
  const totalSlides = cards.length;

  function slideUp() {
      currentIndex = (currentIndex + 1) % totalSlides;
      slideWrapper.style.transform = `translateY(-${currentIndex * 150}px)`;
  }

  setInterval(slideUp, 3000); 
});

