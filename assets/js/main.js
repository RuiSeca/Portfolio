/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-links"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*=============== MENU SHOW ===============*/
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("nav__open"); // Add class to show the menu
  });
}

/*=============== MENU HIDDEN ===============*/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("nav__open"); // Remove class to hide the menu
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linksAction = () => {
  navMenu.classList.remove("nav__open"); // Hide menu on link click
};

// Add event listener to each nav link
navLink.forEach((n) => n.addEventListener("click", linksAction));

/*=============== CLOSE MENU ON SCROLL ===============*/
window.addEventListener("scroll", () => {
  if (navMenu.classList.contains("nav__open")) {
    navMenu.classList.remove("nav__open"); // Close the menu when scrolling
  }
});

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
// Redirect to another website via card
function redirectToAnotherWebsite(url) {
  window.location.href = url;
}
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

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () => {
  const header = document.getElementById("header");
  //when the scroll is greater than 50 viewport height, add the scroll-header class to the header tag

  window.scrollY >= 50
    ? header.classList.add("blur-header")
    : header.classList.remove("blur-header");
};
window.addEventListener("scroll", blurHeader);

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form"),
  contactMessage = document.getElementById("contact-message"),
  loaderWrapper = document.querySelector(".wrapper"); // Assuming you have a wrapper for the loading animation

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendEmail = async (e) => {
  e.preventDefault();

  // Show loading animation
  loaderWrapper.style.visibility = "visible";

  try {
    await emailjs.sendForm(
      "service_pi4xy6m",
      "template_641cbou",
      "#contact-form",
      "pkfqcCbNu3mq8Ks-J"
    );

    // Introduce a longer delay
    await delay(6000);

    // Hide loading animation on success
    loaderWrapper.style.visibility = "hidden";

    contactMessage.textContent = "Message Sent Successfully 🟢";
    setTimeout(() => {
      contactMessage.textContent = "";
    }, 5000);
    contactForm.reset();
  } catch (error) {
    // Hide loading animation on error
    loaderWrapper.style.visibility = "hidden";

    // Show service error Message
    contactMessage.textContent = "Message not sent (error) 🔴";
  }
};

contactForm.addEventListener("submit", sendEmail);

/*=============== SHOW SCROLL UP BUTTON ===============*/
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
window.onscroll = function () {
  var button = document.getElementById("scrollTopButton");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
};

/*=============== SHOW SCROLL UP ===============*/
// Get the header element
const scrollTopButton = document.getElementById("scrollTopButton");
const scrollDistance = 100; // Adjust this value as needed
let lastScrollY = window.scrollY; // Store the last scroll position

// Function to handle scroll events
function handleScroll() {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > scrollDistance) {
    // Scrolling down, show the scroll button with zoom-in effect
    scrollTopButton.classList.add("scroll-show");
    scrollTopButton.classList.remove("scroll-hide");
  } else if (currentScrollY < lastScrollY) {
    // Scrolling up, hide the scroll button with zoom-out effect
    scrollTopButton.classList.add("scroll-hide");
    scrollTopButton.classList.remove("scroll-show");
  }

  lastScrollY = currentScrollY; // Update the last scroll position
}

// Attach the scroll event listener
window.addEventListener("scroll", handleScroll);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  distance: "60px",
  duration: 2500,
  delay: 400,
  scale: 0.85, // Add scale for the zoom effect
});

// Reveal for titles and descriptions with zoom
sr.reveal(".section__title, .about__description", { scale: 0.85 });

// Specific reveal for the image with origin bottom and zoom
sr.reveal(".about__image", { origin: "bottom", scale: 0.85 });

// Skills with zoom effect and staggered delay
sr.reveal(".header__skills, .skills__box, .skills__name, .skills__icon", {
  scale: 0.85,
  interval: 75,
});

// Services section with zoom
sr.reveal(".services__card, .services__description", {
  duration: 2000,
  distance: "80px",
  scale: 0.85,
});

// Project container with zoom and different origin
sr.reveal(".project__container", {
  origin: "left",
  distance: "100px",
  scale: 0.85,
});

/*=============== Typer ===============*/

new TypeIt("#auto-type", {
  strings: [
    "Back-End Developer",
    "Programmer",
    "Freelancer",
    "Back-End Developer",
  ],
  speed: 75,
  deleteSpeed: 40,
  breakLines: false,
  loop: false,
  waitUntilVisible: false,
  cursor: false,
}).go();

/*=============== LIVE CHAT  ===============*/
document.addEventListener("DOMContentLoaded", function () {
  // Paste Drift code snippet here
  // Ensure any variables or functions referenced in the Drift code are defined or available here

  !(function () {
    var t = (window.driftt = window.drift = window.driftt || []);
    if (!t.init) {
      if (t.invoked)
        return void (
          window.console &&
          console.error &&
          console.error("Drift snippet included twice.")
        );
      (t.invoked = !0),
        (t.methods = [
          "identify",
          "config",
          "track",
          "reset",
          "debug",
          "show",
          "ping",
          "page",
          "hide",
          "off",
          "on",
        ]),
        (t.factory = function (e) {
          return function () {
            var n = Array.prototype.slice.call(arguments);
            return n.unshift(e), t.push(n), t;
          };
        }),
        t.methods.forEach(function (e) {
          t[e] = t.factory(e);
        }),
        (t.load = function (t) {
          var e = 3e5,
            n = Math.ceil(new Date() / e) * e,
            o = document.createElement("script");
          (o.type = "text/javascript"),
            (o.async = !0),
            (o.crossorigin = "anonymous"),
            (o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js");
          var i = document.getElementsByTagName("script")[0];
          i.parentNode.insertBefore(o, i);
        });
    }
  })();

  drift.SNIPPET_VERSION = "0.3.1";

  // Hide Drift button by default
  drift.config({
    showWelcomeMessage: false, // Optional: Set to false if you don't want to show the welcome message
    enableWelcomeMessage: false, // Optional: Set to false if you don't want to enable the welcome message
    showGeneratedMarkup: false, // Hide the button initially
  });

  drift.load("7ixnh64c3k5t");

  // Show Drift button after home section is loaded
  var homeSection = document.getElementById("home-section");
  if (homeSection) {
    homeSection.addEventListener("load", function () {
      drift.showChat();
    });
  }
});

/*=============== TOGGLE_DARK&WHITE_MODE  ===============*/
function toggleMode() {
  const body = document.body;
  body.classList.toggle("white-mode");
}

/*=============== DOWNLOAD  ===============*/
async function handleDownload() {
  try {
    const label = document.getElementById("download-label");

    // Add active class to trigger animations
    label.classList.add("active");

    // Trigger download
    const link = document.createElement("a");
    link.href = "/assets/docs/CV-Rui_Seca.pdf";
    link.download = "CV-Rui_Seca.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Remove active class after animation completes
    setTimeout(() => label.classList.remove("active"), 4000); // Adjust time to match animations
  } catch (error) {
    console.error("Download failed:", error);
    alert("Download failed. Please try again later.");
  }
}

/*=============== PROJECT MODAL  ===============*/

// Project Modal functionality
const projectData = {
  "savannah-bites": {
    title: "Savannah Bites",
    description: `
            This project is my largest undertaking to date, where I developed a fully functional 
            restaurant website with comprehensive features:

            • Database Integration: Powered by MongoDB Atlas for secure client data storage
            • Backend Architecture: Built with Node.js, enabling robust server-side operations
            • API Development: Created seamless frontend-backend integration with RESTful APIs
            • Payment Processing: Implemented secure transactions using Stripe payment gateway
            • Email Automation: Set up automated order confirmation emails to enhance user experience
            
            Key Technical Achievements:
            • Developed comprehensive API endpoints for menu management and order processing
            • Created intuitive routes and data models for efficient information flow
            • Implemented secure user authentication and authorization
            • Integrated real-time order tracking and status updates
            
            This project significantly enhanced my expertise in:
            • Full-stack development practices
            • Database design and management
            • API integration and optimization
            • Payment gateway implementation
            • Email service integration
            • Security best practices
            
            The result is a robust, user-friendly platform that delivers a seamless 
            dining experience from browsing to checkout.`,
    videoUrl: "/assets/videos/savannah-preview.mp4",
    liveUrl: "https://savannah-bites.onrender.com/",
    githubUrl: "https://github.com/RuiSeca/savannah-bites",
    technologies: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Stripe API",
      "JWT Auth",
      "Nodemailer",
      "RESTful API",
    ],
  },
  "weather-cast": {
    title: "Weather Cast",
    description: `
            A modern weather forecasting application delivering real-time data through 
            an intuitive interface.

            Key Features:
            • Real-time weather updates using OpenWeatherMap API integration
            • Dynamic UI that adapts to different weather conditions
            • Daily and weekend forecast presentations
            • Severe weather alerts and notifications
            • Location-based weather tracking
            
            Technical Highlights:
            • First-time implementation of external API integration
            • Advanced switch statement logic for weather condition handling
            • Dynamic UI updates based on real-time data
            • Efficient data fetching and caching mechanisms
            
            Design Philosophy:
            • Minimalist, user-focused interface
            • Intuitive navigation and information hierarchy
            • Clear visual presentation of weather data
            • Responsive design for all devices
            
            Learning Outcomes:
            • Mastered API integration and data handling
            • Improved conditional logic implementation
            • Enhanced UI/UX design skills
            • Developed efficient data management strategies
            
            The result is a sleek, functional weather application that prioritizes 
            user experience while delivering accurate, timely weather information.`,
    videoUrl: "/assets/videos/weather-preview.mp4",
    liveUrl: "https://weather-cast-show.netlify.app/",
    githubUrl: "https://github.com/RuiSeca/weatherApp",
    technologies: [
      "OpenWeatherMap API",
      "JavaScript",
      "HTML5",
      "CSS3",
      "REST API",
      "Local Storage",
      "Dynamic UI",
    ],
  },
  "project-3": {
    title: "Project 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Detailed description of project 3 goes here...",
    videoUrl: "/assets/videos/project3-preview.mp4",
    liveUrl: "https://example3.com",
    githubUrl: "https://github.com/yourusername/project3",
    technologies: ["React", "Node.js", "MongoDB"],
  },
  "project-4": {
    title: "Project 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Detailed description of project 4 goes here...",
    videoUrl: "/assets/videos/project4-preview.mp4",
    liveUrl: "https://example4.com",
    githubUrl: "https://github.com/yourusername/project4",
    technologies: ["Vue.js", "Firebase", "Sass"],
  },
  "project-5": {
    title: "Project 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Detailed description of project 5 goes here...",
    videoUrl: "/assets/videos/project5-preview.mp4",
    liveUrl: "https://example5.com",
    githubUrl: "https://github.com/yourusername/project5",
    technologies: ["Angular", "TypeScript", "AWS"],
  },
};

function openProjectModal(projectId) {
  const modal = document.getElementById("projectModal");
  const project = projectData[projectId];

  if (!project) return;

  // Populate modal content
  modal.querySelector(".project-modal__title").textContent = project.title;

  const modalBody = modal.querySelector(".project-modal__body");
  modalBody.innerHTML = `
      ${
        project.videoUrl
          ? `
          <div class="project-modal__video">
              <video src="${project.videoUrl}" autoplay muted loop playsinline></video>
          </div>
      `
          : ""
      }
      <div class="project-modal__description">${project.description}</div>
      <div class="project-modal__tech">
          ${project.technologies
            .map(
              (tech) => `
              <span class="project-modal__tech-item">${tech}</span>
          `
            )
            .join("")}
      </div>
      <div class="project-modal__buttons">
          <a href="${
            project.liveUrl
          }" target="_blank" rel="noopener noreferrer" class="project-modal__button">
              Visit Website
          </a>
          <a href="${
            project.githubUrl
          }" target="_blank" rel="noopener noreferrer" class="project-modal__button project-modal__button--outline">
              View Source
          </a>
      </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Close modal when clicking outside
document.getElementById("projectModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeProjectModal();
  }
});

// Close modal on escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeProjectModal();
  }
});
