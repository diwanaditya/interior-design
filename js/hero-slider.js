const heroImages = [
  "assets/images/hero/hero1.jpg", // first image (already loaded via CSS)
  "assets/images/hero/hero2.jpg",
  "assets/images/hero/hero3.jpg",
  "assets/images/hero/hero4.jpg",
  "assets/images/hero/hero5.jpg",
];

/* Start from second image to avoid resetting LCP image */
let currentIndex = 1;

const heroBg = document.querySelector(".hero-bg");

/* Safety check */
if (heroBg) {
  setInterval(() => {
    heroBg.style.opacity = 0;

    setTimeout(() => {
      heroBg.style.backgroundImage = `url(${heroImages[currentIndex]})`;
      heroBg.style.opacity = 1;

      currentIndex = (currentIndex + 1) % heroImages.length;
    }, 800);

  }, 5000); // change every 5 seconds
}

const scrollSections = document.querySelectorAll(".scroll-section");

if (scrollSections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.3 }
  );

  scrollSections.forEach(section => {
    observer.observe(section);
  });
}

const slider = document.querySelector(".why-slider");
const cards = document.querySelectorAll(".why-card");
const dotsContainer = document.querySelector(".why-dots");

let index = 0;
let interval;
const visibleCards = window.innerWidth <= 768 ? 1 : 4;
const totalSlides = Math.ceil(cards.length / visibleCards);

/* Create dots */
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".why-dots span");

function updateSlider() {
  slider.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(d => d.classList.remove("active"));
  dots[index].classList.add("active");
}

function goToSlide(i) {
  index = i;
  updateSlider();
}

function startAutoSlide() {
  interval = setInterval(() => {
    index = (index + 1) % totalSlides;
    updateSlider();
  }, 3500);
}

function stopAutoSlide() {
  clearInterval(interval);
}

/* Hover & Touch Pause */
slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);
slider.addEventListener("touchstart", stopAutoSlide);
slider.addEventListener("touchend", startAutoSlide);

/* Init */
startAutoSlide();


