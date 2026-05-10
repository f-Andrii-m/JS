
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});



const slides = document.getElementById("slides");

const dots = document.querySelectorAll(".dot");

const prev = document.getElementById("prev");
const next = document.getElementById("next");

let index = 0;

const totalSlides = dots.length;



function updateCarousel() {

    slides.style.transform =
        `translateX(-${index * 100}%)`;

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    dots[index].classList.add("active");
}



function nextSlide() {

    index++;

    if(index >= totalSlides) {
        index = 0;
    }

    updateCarousel();
}



function prevSlide() {

    index--;

    if(index < 0) {
        index = totalSlides - 1;
    }

    updateCarousel();
}



next.addEventListener("click", nextSlide);

prev.addEventListener("click", prevSlide);



dots.forEach(dot => {

    dot.addEventListener("click", () => {

        index = parseInt(dot.dataset.index);

        updateCarousel();
    });
});



setInterval(nextSlide, 3000);
