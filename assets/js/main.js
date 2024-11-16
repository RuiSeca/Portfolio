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

const swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto", // Makes each slide take up its natural width
  spaceBetween: 20, // Slight gap between slides
  centeredSlides: true, // Keeps the center slide visible in the middle
  slideToClickedSlide: true, // Allows clicking to navigate directly to a slide
  effect: "coverflow", // Adds a 3D stacking effect
  coverflowEffect: {
    rotate: 50, // Degree of rotation
    stretch: 0, // Stretch factor
    depth: 150, // Depth of the 3D effect
    modifier: 1, // Modifier to increase/decrease effect intensity
    slideShadows: true, // Adds shadow to each slide
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: 150, // Allows for dragging the scrollbar
  },
  on: {
    slideChangeTransitionStart: function () {
      // Add a fix for Firefox and Safari when slide changes
      setTimeout(() => {
        swiper.update(); // Update Swiper after slide change
      }, 50);
    },
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
function initializeTheme() {
  const body = document.body;
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "white") {
    body.classList.add("white-mode");
  }
}

// Function to toggle between themes
function toggleMode() {
  const body = document.body;
  body.classList.toggle("white-mode");

  // Store the current preference
  if (body.classList.contains("white-mode")) {
    localStorage.setItem("theme", "white");
  } else {
    localStorage.setItem("theme", "dark");
  }
}

// Initialize theme when page loads
document.addEventListener("DOMContentLoaded", initializeTheme);

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
    <p><strong style="color: white;">This project is my largest undertaking to date, where I developed a fully functional 
    restaurant website with comprehensive features:</strong></p>
    
    <p><strong style="color: white;">Key Features:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li style="color: grey;">Database Integration: Powered by MongoDB Atlas for secure client data storage</li>
      <li style="color: grey;">Backend Architecture: Built with Node.js, enabling robust server-side operations</li>
      <li style="color: grey;">API Development: Created seamless frontend-backend integration with RESTful APIs</li>
      <li style="color: grey;">Payment Processing: Implemented secure transactions using Stripe payment gateway</li>
      <li style="color: grey;">Email Automation: Set up automated order confirmation emails to enhance user experience</li>
    </ul>

    <p><strong style="color: white;">Key Technical Achievements:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li style="color: grey;">Developed comprehensive API endpoints for menu management and order processing</li>
      <li style="color: grey;">Created intuitive routes and data models for efficient information flow</li>
      <li style="color: grey;">Implemented secure user authentication and authorization</li>
      <li style="color: grey;">Integrated real-time order tracking and status updates</li>
      <li style="color: grey;">Implemented robust error handling and validation</li>
      <li style="color: grey;">Optimized codebase for render production deployment</li>
    </ul>

    <p><strong style="color: white;">This project significantly enhanced my expertise in:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li style="color: grey;">Full-stack development practices</li>
      <li style="color: grey;">Database design and management</li>
      <li style="color: grey;">API integration and optimization</li>
      <li style="color: grey;">Payment gateway implementation</li>
      <li style="color: grey;">Email service integration</li>
      <li style="color: grey;">Security best practices</li>
      <li style="color: grey;">Deployment, maintenance & GitHub</li>
      <li style="color: grey;">Environments Production and Development</li>
    </ul>

    <p> <strong style="color: white;">
      The result is a robust, user-friendly platform that delivers a seamless dining experience 
      from browsing to checkout.</strong>
    </p>
  `,
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
    <p><strong style="color: white;">A modern weather forecasting application delivering real-time data through an intuitive interface.</strong><br/><br/></p>

    <p><strong style="color: white;">Key Features:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li style="color: grey;">Real-time weather updates using OpenWeatherMap API integration</li>
      <li style="color: grey;">Dynamic UI that adapts to different weather conditions</li>
      <li style="color: grey;">Daily and weekend forecast presentations</li>
      <li style="color: grey;">Severe weather alerts and notifications</li>
      <li style="color: grey;">Location-based weather tracking</li>
    </ul>

    <p><strong style="color: white;">Technical Highlights:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li style="color: grey;">First-time implementation of external API integration</li>
      <li style="color: grey;">Advanced switch statement logic for weather condition handling</li>
      <li style="color: grey;">Dynamic UI updates based on real-time data</li>
      <li style="color: grey;">Efficient data fetching and caching mechanisms</li>
    </ul>

    <p><strong style="color: white;">Design Philosophy:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li style="color: grey;">Minimalist, user-focused interface</li>
      <li style="color: grey;">Intuitive navigation and information hierarchy</li>
      <li style="color: grey;">Clear visual presentation of weather data</li>
      <li style="color: grey;">Responsive design for all devices</li>
    </ul>

    <p><strong style="color: white;">Learning Outcomes:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li style="color: grey;">Mastered API integration and data handling</li>
      <li style="color: grey;">Improved conditional logic implementation</li>
      <li style="color: grey;">Enhanced UI/UX design skills</li>
      <li style="color: grey;">Developed efficient data management strategies</li>
    </ul>

    <p><strong style="color: white;">The result is a sleek, functional weather application that prioritizes user experience while delivering accurate, timely weather information.</strong><br/><br/></p>
  `,
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

let scrollPosition = 0;

function openProjectModal(projectId) {
  const modal = document.getElementById("projectModal");
  const project = projectData[projectId];

  if (!project) return;

  // Store current scroll position and lock body
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.classList.add("modal-open");

  // Update modal content
  modal.querySelector(".project-modal__title").textContent = project.title;

  const modalBody = modal.querySelector(".project-modal__body");
  modalBody.innerHTML = `
    ${
      project.videoUrl
        ? `
        <div class="project-modal__video">
          <div class="loading-container">
            <div class="spinner">
              <div class="spinnerin"></div>
            </div>
              <p class="loading-message">
                Loading video<span class="dots">
                  <span>.</span><span>.</span><span>.</span>
              </span>
            </p>
          </div>

          <video 
            src="${project.videoUrl}" 
            autoplay 
            muted 
            loop 
            playsinline
            webkit-playsinline
          ></video>
        </div>
      `
        : ""
    }
    <div class="project-modal__description">${project.description}</div>
    <div class="project-modal__tech">
      ${project.technologies
        .map((tech) => `<span class="project-modal__tech-item">${tech}</span>`)
        .join("")}
    </div>
    <div class="project-modal__buttons">
      ${
        project.liveUrl
          ? `
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" 
           class="project-modal__button">
          <i class="ri-global-line"></i>
          <span>Visit Website</span>
        </a>
      `
          : ""
      }
      ${
        project.githubUrl
          ? `
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" 
           class="project-modal__button project-modal__button--outline">
          <i class="ri-github-fill"></i>
          <span>View Source</span>
        </a>
      `
          : ""
      }
    </div>
  `;

  // Handle video loading with spinner
  const video = modalBody.querySelector("video");
  if (video) {
    video.addEventListener("loadeddata", function () {
      requestAnimationFrame(() => {
        video.style.opacity = "1";
        const spinner = modalBody.querySelector(".loading-spinner");
        if (spinner) {
          spinner.style.display = "none";
        }
      });
    });
  }

  // Show modal using CSS classes
  requestAnimationFrame(() => {
    modal.classList.add("active");
  });
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");

  // Remove modal-open class
  document.body.classList.remove("modal-open");

  // Reset body position
  document.body.style.position = "";
  document.body.style.top = "";

  // Restore scroll position
  window.scrollTo(0, scrollPosition);

  // Remove active class to trigger CSS animations
  modal.classList.remove("active");
}

// Add event listener to the fixed action button
const fixedActionBtn = document.querySelector(".fixed-action-btn");
if (fixedActionBtn) {
  fixedActionBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const target = e.currentTarget.getAttribute("data-target");
    if (target === "#projectModal") {
      openProjectModal("savannah-bites");
    } else {
      // Handle other fixed action button functionality
    }
  });
}
