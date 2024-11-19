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

sr.reveal(".piano__container", {
  origin: "right",
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

const toggleButton = document.getElementById("white-mode-toggle");
if (toggleButton) {
  toggleButton.addEventListener("click", toggleMode);
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
    <p><strong class="title-text">Savannah Bites</strong> is my largest project to date, where I developed a fully functional restaurant website with various features to enhance user experience and streamline restaurant operations.</p>

    <p><strong class="title-text">Key Features:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">Database Integration: Powered by MongoDB Atlas for secure client data storage</li>
      <li class="description-text">Backend Architecture: Built with Node.js, enabling robust server-side operations</li>
      <li class="description-text">API Development: Seamless frontend-backend integration using RESTful APIs</li>
      <li class="description-text">Payment Processing: Secure transactions via Stripe payment gateway</li>
      <li class="description-text">Email Automation: Automated order confirmation emails for a smooth user experience</li>
    </ul>

    <p><strong class="title-text">Key Technical Achievements:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">Developed API endpoints for menu management and order processing</li>
      <li class="description-text">Created intuitive routes and models for smooth information flow</li>
      <li class="description-text">Implemented secure user authentication and authorization</li>
      <li class="description-text">Integrated real-time order tracking and status updates</li>
      <li class="description-text">Enhanced error handling and validation for robust performance</li>
      <li class="description-text">Optimized codebase for production deployment on Render</li>
    </ul>

    <p><strong class="title-text">This project significantly enhanced my expertise in:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">Full-stack development</li>
      <li class="description-text">Database management and design</li>
      <li class="description-text">API integration and optimization</li>
      <li class="description-text">Payment gateway implementation</li>
      <li class="description-text">Email service integration</li>
      <li class="description-text">Security best practices</li>
      <li class="description-text">Deployment and GitHub workflows</li>
      <li class="description-text">Managing production and development environments</li>
    </ul>

    <p><strong class="title-text">The result is a user-friendly, robust platform that ensures a seamless dining experience, from browsing the menu to completing the checkout process.</strong></p>
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
    <p><strong class="title-text">A modern weather forecasting application delivering real-time data through an intuitive interface.</strong><br/><br/></p>

    <p><strong class="title-text">Key Features:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">Real-time weather updates using OpenWeatherMap API integration</li>
      <li class="description-text">Dynamic UI that adapts to different weather conditions</li>
      <li class="description-text">Daily and weekend forecast presentations</li>
      <li class="description-text">Severe weather alerts and notifications</li>
      <li class="description-text">Location-based weather tracking</li>
    </ul>

    <p><strong class="title-text">Technical Highlights:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">First-time implementation of external API integration</li>
      <li class="description-text">Advanced switch statement logic for weather condition handling</li>
      <li class="description-text">Dynamic UI updates based on real-time data</li>
      <li class="description-text">Efficient data fetching and caching mechanisms</li>
    </ul>

    <p><strong class="title-text">Design Philosophy:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">Minimalist, user-focused interface</li>
      <li class="description-text">Intuitive navigation and information hierarchy</li>
      <li class="description-text">Clear visual presentation of weather data</li>
      <li class="description-text">Responsive design for all devices</li>
    </ul>

    <p><strong class="title-text">Learning Outcomes:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">Mastered API integration and data handling</li>
      <li class="description-text">Improved conditional logic implementation</li>
      <li class="description-text">Enhanced UI/UX design skills</li>
      <li class="description-text">Developed efficient data management strategies</li>
    </ul>

    <p><strong class="title-text">The result is a sleek, functional weather application that prioritizes user experience while delivering accurate, timely weather information.</strong><br/><br/></p>
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
  const isWhiteMode = document.body.classList.contains("white-mode");

  if (!project) return;

  // Store current scroll position and lock body
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.classList.add("modal-open");

  // Update modal content
  modal.querySelector(".project-modal__title").textContent = project.title;

  const modalBody = modal.querySelector(".project-modal__body");

  // Modify the description HTML to use CSS classes instead of inline styles
  const formattedDescription = project.description.replace(
    /style="color: (white|grey);"/g,
    `class="${isWhiteMode ? "text-black" : "text-white"} ${
      isWhiteMode ? "text-black-secondary" : "text-gray"
    }""`
  );

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
    <div class="project-modal__description">${formattedDescription}</div>
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

/*=============== Project Piano  ===============*/
document.addEventListener("DOMContentLoaded", () => {
  const careerStages = [
    {
      note: "C",
      year: "2020",
      title: "Beginning",
      description: "Started Journey",
      color: "bg-amber-100",
      type: "white",
    },
    {
      note: "C#",
      year: "2020",
      title: "First Steps",
      description: "Learning Basics",
      color: "bg-amber-200",
      type: "black",
    },
    {
      note: "D",
      year: "2020",
      title: "Development",
      description: "Growing Skills",
      color: "bg-amber-300",
      type: "white",
    },
    {
      note: "D#",
      year: "2021",
      title: "Direction",
      description: "Finding Path",
      color: "bg-amber-400",
      type: "black",
    },
    {
      note: "E",
      year: "2021",
      title: "Evolution",
      description: "Career Growth",
      color: "bg-amber-500",
      type: "white",
    },
    {
      note: "F",
      year: "2021",
      title: "Focus",
      description: "Specializing",
      color: "bg-amber-600",
      type: "white",
    },
    {
      note: "F#",
      year: "2022",
      title: "Forward",
      description: "Leading Projects",
      color: "bg-amber-700",
      type: "black",
    },
    {
      note: "G",
      year: "2022",
      title: "Growth",
      description: "Team Leading",
      color: "bg-amber-800",
      type: "white",
    },
    {
      note: "G#",
      year: "2022",
      title: "Guidance",
      description: "Mentoring Others",
      color: "bg-amber-900",
      type: "black",
    },
    {
      note: "A",
      year: "2023",
      title: "Achievement",
      description: "Project Success",
      color: "bg-orange-400",
      type: "white",
    },
    {
      note: "A#",
      year: "2023",
      title: "Advancement",
      description: "Career Progress",
      color: "bg-orange-500",
      type: "black",
    },
    {
      note: "B",
      year: "2023",
      title: "Building",
      description: "Building Teams",
      color: "bg-orange-600",
      type: "white",
    },
    {
      note: "C2",
      year: "2024",
      title: "Completion",
      description: "Major Milestone",
      color: "bg-orange-700",
      type: "white",
    },

    {
      note: "D2",
      year: "2024",
      title: "Direction",
      description: "Future Goals",
      color: "bg-orange-900",
      type: "white",
    },
  ];

  let isPlaying = false;
  let isMuted = false; // Start unmuted
  const mainAudio = new Audio("/assets/audio/wonder.mp3");
  mainAudio.volume = 0.5;

  // Create main container
  const container = document.createElement("div");
  container.className = "max-w-6xl mx-auto p-8 relative";
  document.getElementById("piano-container").appendChild(container);

  // Create piano container
  const pianoContainer = document.createElement("div");
  pianoContainer.className = "piano-container";
  container.appendChild(pianoContainer);

  // Create keys container
  const keysContainer = document.createElement("div");
  keysContainer.className = "keys-container";
  pianoContainer.appendChild(keysContainer);

  // Create sound control button
  const soundControl = document.createElement("button");
  soundControl.className = "sound-control";
  soundControl.innerHTML =
    '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
  pianoContainer.appendChild(soundControl);

  // Enhanced magic trail creation
  const createEnhancedMagicTrail = (x, y, isCard = false) => {
    const trail = document.createElement("div");
    trail.className = "magic-trail";
    trail.style.position = "absolute";
    trail.style.zIndex = "9999";
    trail.style.pointerEvents = "none";
    trail.style.width = "100%";
    trail.style.height = "100%";
    trail.style.overflow = "hidden";

    const colors = [
      "rgba(255, 215, 0, 0.8)", // Gold
      "rgba(255, 223, 0, 0.8)", // Bright gold
      "rgba(255, 198, 0, 0.8)", // Yellow gold
      "rgba(255, 185, 15, 0.8)", // Golden yellow
      "rgba(255, 236, 139, 0.8)", // Light gold
    ];

    // Screen size detection
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;

    // Adjust parameters based on screen size and element type
    const particleCount = isCard ? (isMobile ? 20 : 40) : isMobile ? 15 : 30;
    const spreadRadius = isCard
      ? isSmallMobile
        ? 50
        : isMobile
        ? 75
        : 100
      : isSmallMobile
      ? 25
      : isMobile
      ? 35
      : 50;
    const baseVelocity = isCard ? (isMobile ? 1.5 : 2) : isMobile ? 0.75 : 1;

    // Get correct container based on element type
    const container = isCard
      ? document.querySelector(".journey-container")
      : document.querySelector(".piano-container");
    const containerRect = container.getBoundingClientRect();

    // Scale factor for piano based on screen size
    const pianoScale = isSmallMobile ? 0.6 : isMobile ? 0.8 : 1;

    // Adjust coordinates based on container position and piano scaling
    const relativeX = isCard
      ? x - containerRect.left
      : (x - containerRect.left) * (1 / pianoScale);
    const relativeY = isCard
      ? y - containerRect.top
      : (y - containerRect.top) * (1 / pianoScale);

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      const size =
        Math.random() *
          (isCard ? (isSmallMobile ? 6 : 8) : isSmallMobile ? 4 : 6) +
        (isSmallMobile ? 2 : 4);

      const color = colors[Math.floor(Math.random() * colors.length)];

      const side = Math.random() > 0.5 ? -1 : 1;
      const startX = relativeX + side * spreadRadius * (isMobile ? 0.75 : 1);
      const startY = relativeY;

      const endX = relativeX + -side * spreadRadius * (isMobile ? 0.75 : 1);
      const endY =
        relativeY +
        (Math.random() * (isMobile ? 20 : 40) - (isMobile ? 10 : 20));

      particle.className = "absolute rounded-full";
      particle.style.position = "absolute";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.filter = `blur(${isMobile ? 0.5 : 1}px)`;
      particle.style.boxShadow = `0 0 ${
        size * (isMobile ? 1.5 : 2)
      }px ${color}`;
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.zIndex = "9999";
      particle.style.transform = isCard
        ? "translate(-50%, -50%) scale(0)"
        : `translate(-50%, -50%) scale(0) scale(${1 / pianoScale})`;
      particle.style.opacity = "0";

      const lifetime =
        Math.random() * (isMobile ? 800 : 1000) + (isMobile ? 800 : 1000);
      const velocity = (Math.random() * 0.5 + 0.75) * baseVelocity;

      requestAnimationFrame(() => {
        particle.style.transition = `
          all ${lifetime}ms cubic-bezier(0.4, 0, 0.2, 1),
          opacity ${lifetime * 0.8}ms ease-in-out
        `;

        const horizontalSpread = isCard
          ? spreadRadius * (isMobile ? 1.2 : 1.5)
          : spreadRadius;
        const verticalSpread = isCard
          ? isMobile
            ? 20
            : 40
          : isMobile
          ? 10
          : 20;

        const scale = isCard
          ? Math.random() * (isMobile ? 0.3 : 0.5) + (isMobile ? 0.3 : 0.5)
          : (Math.random() * (isMobile ? 0.3 : 0.5) + (isMobile ? 0.3 : 0.5)) *
            (1 / pianoScale);

        particle.style.transform = `
          translate(
            ${(endX - startX) * velocity}px,
            ${(endY - startY) * velocity - verticalSpread}px
          ) 
          scale(${scale})
          rotate(${Math.random() * (isMobile ? 180 : 360)}deg)
        `;

        particle.style.opacity =
          Math.random() * (isMobile ? 0.5 : 0.7) + (isMobile ? 0.2 : 0.3);

        setTimeout(() => {
          particle.style.opacity = "0";
          particle.style.transform += " scale(0)";
        }, lifetime * 0.8);
      });

      trail.appendChild(particle);
      setTimeout(() => particle.remove(), lifetime);
    }

    container.appendChild(trail);
    setTimeout(() => trail.remove(), isMobile ? 1500 : 2000);
  };

  // Function to create piano key
  const createPianoKey = (stage, index) => {
    const key = document.createElement("button");
    const isBlack = stage.type === "black";

    key.className = `piano-key ${isBlack ? "black" : "white"}`;

    // Position calculation for black keys
    if (isBlack) {
      const blackKeyPositions = {
        "C#": 0.7,
        "D#": 2.2,
        "F#": 4.2,
        "G#": 5.7,
        "A#": 7.2,
        "C#2": 9.2,
        "D#2": 10.7,
      };
      const noteBase = stage.note.includes("2") ? stage.note : stage.note;
      const offset = blackKeyPositions[noteBase] * 3.5;
      key.style.left = `${offset}rem`;
    } else {
      const whiteKeyIndex = careerStages
        .filter((s) => s.type === "white")
        .findIndex((s) => s.note === stage.note);
      key.style.left = `${whiteKeyIndex * 3.5}rem`;
    }

    key.addEventListener("click", () => {
      document.querySelectorAll(".piano-key").forEach((k) => {
        k.classList.remove("active");
        k.querySelector(".glow-effect")?.remove();
      });

      key.classList.add("active");

      const glowEffect = document.createElement("div");
      glowEffect.className = "glow-effect";
      key.appendChild(glowEffect);

      if (!isMuted && !isPlaying) {
        mainAudio.currentTime = 0;
        mainAudio.play();
        isPlaying = true;
      }

      const keyRect = key.getBoundingClientRect();
      createEnhancedMagicTrail(
        keyRect.left + keyRect.width / 2,
        keyRect.top + keyRect.height,
        false
      );

      updateJourneyCard(stage);

      setTimeout(() => {
        key.classList.remove("active");
        glowEffect.remove();
      }, 300);
    });

    return key;
  };

  // Create white keys first
  careerStages
    .filter((stage) => stage.type === "white")
    .forEach((stage) => {
      keysContainer.appendChild(createPianoKey(stage));
    });

  // Then create black keys on top
  careerStages
    .filter((stage) => stage.type === "black")
    .forEach((stage) => {
      keysContainer.appendChild(createPianoKey(stage));
    });

  // Create journey container
  const journeyContainer = document.createElement("div");
  journeyContainer.className = "journey-container";
  container.appendChild(journeyContainer);

  // Sound control functionality
  soundControl.addEventListener("click", () => {
    isMuted = !isMuted;
    soundControl.innerHTML = isMuted
      ? '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3l-12 12M11 5L6 9H2v6h4l5 4M14 9.5c.5.7.8 1.6.8 2.5s-.3 1.8-.8 2.5M17 7c1.2 1.3 2 3.1 2 5s-.8 3.7-2 5"/></svg>'
      : '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';

    if (isMuted && isPlaying) {
      mainAudio.pause();
      isPlaying = false;
    }
  });

  // Update journey card function
  const updateJourneyCard = (activeStage) => {
    const journeyContainer = document.querySelector(".journey-container");
    const isMobile = window.innerWidth <= 768;

    // Remove existing cards
    journeyContainer
      .querySelectorAll(".journey-card")
      .forEach((card) => card.remove());

    if (isMobile) {
      // Mobile: Create single card for active stage
      const card = document.createElement("div");
      card.className = `journey-card ${activeStage.color}`;
      card.style.transform = "translateX(-50%) translateY(20px)";
      card.style.opacity = "0";

      card.innerHTML = `
        <div class="text-gray-800 relative z-10">
          <div class="font-bold font-serif">${activeStage.year}</div>
          <div class="text-lg font-semibold font-serif">${activeStage.title}</div>
          <div class="text-sm font-serif">${activeStage.description}</div>
        </div>
      `;

      journeyContainer.appendChild(card);

      // Trigger animation after a small delay
      setTimeout(() => {
        card.style.transform = "translateX(-50%) translateY(0)";
        card.style.opacity = "1";
      }, 50);
    } else {
      // Desktop: Create all cards with position based on index
      careerStages.forEach((stage, index) => {
        const card = document.createElement("div");
        card.className = `journey-card ${stage.color}`;

        const percentage = (index / (careerStages.length - 1)) * 100;
        card.style.left = `${percentage}%`;

        // Set initial state
        card.style.opacity = stage.note === activeStage.note ? "1" : "0";
        card.style.transform =
          stage.note === activeStage.note
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(20px)";

        card.innerHTML = `
          <div class="text-gray-800 relative z-10">
            <div class="font-bold font-serif">${stage.year}</div>
            <div class="text-lg font-semibold font-serif">${stage.title}</div>
            <div class="text-sm font-serif">${stage.description}</div>
          </div>
        `;

        journeyContainer.appendChild(card);
      });
    }
  };

  // Add window resize listener to handle layout changes
  window.addEventListener("resize", () => {
    const activeCard = document.querySelector(
      '.journey-card[style*="opacity: 1"]'
    );
    if (activeCard) {
      const activeStage = careerStages.find(
        (stage) =>
          stage.title === activeCard.querySelector(".text-lg").textContent
      );
      if (activeStage) {
        updateJourneyCard(activeStage);
      }
    }
  });

  // Add audio ended event listener
  mainAudio.addEventListener("ended", () => {
    isPlaying = false;
  });
});
