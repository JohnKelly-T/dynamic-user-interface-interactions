import { setupDropdown } from "@johnkelly-t/dropdown-menu";
import "./styles/reset.css";
import "./styles/global.css";
import beachImage from "./images/beach.jpg";
import fieldImage from "./images/field.jpg";
import forestImage from "./images/forest.jpg";
import mountainImage from "./images/mountain.jpg";
import waterfallImage from "./images/waterfall.jpg";

let imageSources = [
    mountainImage,
    fieldImage,
    waterfallImage,
    forestImage,
    beachImage,
]


let dropdowns = document.querySelectorAll('.dropdown-trigger');

setupDropdown(dropdowns[0], "hover");
setupDropdown(dropdowns[1], "hover", "center");
setupDropdown(dropdowns[2], "hover", "right");

let carouselNavContainer = document.querySelector(".carousel-nav-container");
let imageCarousel = document.querySelector(".image-carousel");
let nextButton = document.querySelector("#next-btn");
let backButton = document.querySelector("#back-btn");

let activeImage = 0;
let imageCount = imageSources.length;
let duration = 700;

// slide duration
document.documentElement.style.setProperty('--duration', `${duration}ms`);

// variables for image positions
let center = "50%";
let left = "calc(50% + calc(var(--image-width) * -1))";
let leftHidden = "calc(50% + calc(var(--image-width) * -2))";
let right = "calc(50% + calc(var(--image-width) * 1))";
let rightHidden = "calc(50% + calc(var(--image-width) * 2))";

// array for image elements
let images = [];

// load images
for (let i = 0; i < imageCount; i++) {
    let img = document.createElement("img");
    img.classList.add("carousel-image");

    if (i === 0) {
        img.style.left = center;
        img.style.transform = "translate(-50%, -50%)"; // make center image larger by removing scale(80%)
    } else if (i === 1) {
        img.style.left = right;
    } else if (i === 2) {
        img.style.left = rightHidden;
    } else if (i === imageCount - 1) {
        img.style.left = left;
    } else if (i === imageCount - 2) {
        img.style.left = leftHidden;
    } 

    // add image source
    img.src = imageSources[i];

    imageCarousel.appendChild(img);
    images.push(img);
}

// add image nav buttons dynamically
for (let i = 0; i < images.length; i++) {
    let carouselNav = document.createElement("div");
    carouselNav.classList.add("carousel-nav");

    // add active to first element
    if (i === 0) {
        carouselNav.classList.add("active-nav");
    }

    carouselNavContainer.appendChild(carouselNav);
}

function moveSlide(direction) {

    if (direction === "left") {
        // decrement active image index
        activeImage--;
        if (activeImage < 0) {
            activeImage = images.length - 1;
        }
    } else if (direction === "right") {
        activeImage++;
        if (activeImage === images.length) {
            activeImage = 0;
        }
    }

    updateActiveNav();

    // temporarily disable buttons
    nextButton.disabled = true;
    backButton.disabled = true;

    // enable buttons after timeout
    setTimeout(() => {
        nextButton.disabled = false;
        backButton.disabled = false;
    }, duration);

    // reset transform attributes of elements
    for (let img of images) {
        img.style.transform = "translate(-50%, -50%) scale(80%)";
    }

    // change element style based on active image index and getting relative positions with modulo
    images[(((activeImage - 2) % images.length) + images.length) % images.length].style.left = leftHidden;
    images[(((activeImage - 1) % images.length) + images.length) % images.length].style.left = left;
    images[activeImage].style.left = center;
    images[activeImage].style.transform = "translate(-50%, -50%)"; // make center image larger by removing scale(80%)
    images[(activeImage + 1) % images.length].style.left = right;
    images[(activeImage + 2) % images.length].style.left = rightHidden;

    // temporarily remove element that will move to opposite side so it doesn't activate transition
    let teleportingElement;

    if (direction === "left") {
        teleportingElement = images[(((activeImage - 2) % images.length) + images.length) % images.length];
    } else if (direction === "right") {
        teleportingElement = images[(activeImage + 2) % images.length];
    }
    
    teleportingElement.remove();
    // add element back to DOM
    imageCarousel.append(teleportingElement);
}

function jumpToSlide(index) {
    let carouselNavs = document.querySelectorAll(".carousel-nav");

    activeImage = index;

    updateActiveNav();

    // reset transform attributes of elements
    for (let img of images) {
        img.style.transform = "translate(-50%, -50%) scale(80%)";
        img.remove();
    }

    images[(((activeImage - 2) % images.length) + images.length) % images.length].style.left = leftHidden;
    images[(((activeImage - 1) % images.length) + images.length) % images.length].style.left = left;
    images[activeImage].style.left = center;
    images[activeImage].style.transform = "translate(-50%, -50%)"; // make center image larger by removing scale(80%)
    images[(activeImage + 1) % images.length].style.left = right;
    images[(activeImage + 2) % images.length].style.left = rightHidden;

    for (let img of images) {
        imageCarousel.append(img);
    }   
}

function updateActiveNav() {
    // remove active-nav class
    carouselNavs.forEach(nav => {
        nav.classList.remove("active-nav");
    })

    carouselNavs[activeImage].classList.add("active-nav");

}

nextButton.addEventListener("click", () => moveSlide("right"));
backButton.addEventListener("click", () => moveSlide("left"));

let carouselNavs = document.querySelectorAll(".carousel-nav");

carouselNavs.forEach((nav, index) => {
    nav.addEventListener("click", () => {
        jumpToSlide(index);
    });
})