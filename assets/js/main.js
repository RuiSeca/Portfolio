/*=============== SHOW MENU===============*/
const navMenu = document.getElementById('nav-links'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*=============== MENU SHOW===============*/
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('nav-links')
     })
}

/*=============== MENU HIDDEN===============*/
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('nav-links')
     }) 
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linksAction = () =>{
     const navMenu = document.getElementById('nav-links')
     //When we click on each nav__link, we remove the show-menu(nav-links)
      navMenu.classList.remove('nav-links')
}
navLink.forEach(n => n.addEventListener('click', linksAction))

/*=============== CARD SWIPER ===============*/
 
var swiper = new Swiper(".mySwiper", {
    // Your Swiper options
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 2,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    scrollbar: {
        el: ".swiper-scrollbar",
        dragSize: 150, // Adjust as needed
    },
});

// Sync the scrollbar with Swiper's scroll position
swiper.on("scroll", function () {
    var scrollbarThumb = document.querySelector(".swiper-scrollbar-thumb");
    var scrollbarWidth = document.querySelector(".swiper-scrollbar").offsetWidth;
    var thumbWidth = scrollbarThumb.offsetWidth;
    var swiperWidth = swiper.width;

    var scrollPercentage = swiper.translate / (swiperWidth - swiper.width);
    var scrollThumbPosition = (scrollbarWidth - thumbWidth) * scrollPercentage;

    scrollbarThumb.style.transform = "translateX(" + scrollThumbPosition + "px)";
});



//window.addEventListener('scroll', reveal);



/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    //when the scroll is greater than 50 viewport height, add the scroll-header class to the header tag

    window.scrollY >= 50 ? header.classList.add('blur-header')
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)


/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs.sendForm('service_pi4xy6m', 'template_641cbou', '#contact-form', 'pkfqcCbNu3mq8Ks-J')
    .then(() => {
        contactMessage.textContent = 'Message Sent Successfully 🟢';
        setTimeout(() => {
            contactMessage.textContent = '';
        }, 5000);
        contactForm.reset();
    })
    .catch(() => {
        //Show service error Message
        contactMessage.textContent = 'Message not sent (error) 🔴';
    });
}; 

contactForm.addEventListener('submit', sendEmail);

/*=============== SHOW SCROLL UP BUTTON ===============*/ 
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.onscroll = function() {
    var button = document.getElementById("scrollTopButton");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
};

/*=============== SHOW type text Change===============*/ 

    
/*=============== SHOW SCROLL UP ===============*/ 
// Get the header element
const header = document.querySelector("header");

// Set the distance to scroll before hiding the header
const scrollDistance = 100; // Adjust this value as needed

// Function to handle scroll events
function handleScroll() {
    if (window.scrollY > scrollDistance) {
        header.style.top = `-${header.offsetHeight}px`; // Hide the header
    } else {
        header.style.top = "0"; // Show the header
    }
}

// Attach the scroll event listener
window.addEventListener("scroll", handleScroll);


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin:'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal('.section__title, .about__description')
sr.reveal('.about__image', {origin:'bottom'})


sr.reveal('.header__skills, .skills__box, .skills__name, .skills__icon')

sr.reveal('.services__card, .services__description')

sr.reveal('.project__container')

/*=============== Typer ===============*/

new TypeIt("#auto-type", {
    strings: [
      "Back-End Developer",
      "Programmer",
      "Freelancer",
      "Back-End Developer"
    ],
    speed: 75,
    deleteSpeed: 40,
    breakLines: false,
    loop: false,
    waitUntilVisible: false,
    cursor: false,
    
  }).go();



