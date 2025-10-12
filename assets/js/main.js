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

  // Show header when user scrolls (after piano key interaction)
  const header = document.getElementById("header");
  if (header && header.style.transform === "translateY(-100%)") {
    header.style.transform = "translateY(0)";
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

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form"),
  contactMessage = document.getElementById("contact-message"),
  loaderWrapper = document.querySelector(".wrapper"); // Assuming you have a wrapper for the loading animation

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendEmail = async (e) => {
  e.preventDefault();

  // Show loading animation
  loaderWrapper.style.visibility = "visible";
  loaderWrapper.style.opacity = "1";

  try {
    await emailjs.sendForm(
      "service_pi4xy6m",
      "template_641cbou",
      "#contact-form",
      "pkfqcCbNu3mq8Ks-J"
    );

    // Introduce a longer delay
    await delay(2000);

    // Hide loading animation on success
    loaderWrapper.style.opacity = "0";
    setTimeout(() => {
      loaderWrapper.style.visibility = "hidden";
    }, 300);

    contactMessage.textContent = "Message Sent Successfully 🟢";
    setTimeout(() => {
      contactMessage.textContent = "";
    }, 5000);
    contactForm.reset();
  } catch (error) {
    // Hide loading animation on error
    loaderWrapper.style.opacity = "0";
    setTimeout(() => {
      loaderWrapper.style.visibility = "hidden";
    }, 300);

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

// Logo loop / Technologies section
sr.reveal(".logo-loop-section", {
  origin: "bottom",
  distance: "80px",
  scale: 0.85,
  duration: 2000,
});

// Career section (My Journey)
sr.reveal(".career .section__subtitle-piano, .career .section__title-keys", {
  origin: "top",
  distance: "60px",
  scale: 0.85,
  interval: 100,
});

sr.reveal(".hologram-wrapper", {
  origin: "left",
  distance: "100px",
  scale: 0.85,
  duration: 2500,
});

// Card swap services section
sr.reveal(
  ".card-swap-section .section__subtitle, .card-swap-section .section__title",
  {
    origin: "top",
    distance: "60px",
    scale: 0.85,
    interval: 100,
  }
);

sr.reveal(".card-swap-text", {
  origin: "left",
  distance: "100px",
  scale: 0.85,
  duration: 2500,
});

sr.reveal(".card-swap-wrapper", {
  origin: "right",
  distance: "100px",
  scale: 0.85,
  duration: 2500,
});

// Contact section
sr.reveal(".contact .section__subtitle, .contact .section__title", {
  origin: "top",
  distance: "60px",
  scale: 0.85,
  interval: 100,
});

sr.reveal(".contact__form", {
  origin: "left",
  distance: "100px",
  scale: 0.85,
  duration: 2500,
});

sr.reveal(".contact .wrapper", {
  origin: "right",
  distance: "100px",
  scale: 0.85,
  duration: 2500,
});

/*=============== Typer ===============*/

let typed = new Typed("#typed", {
  strings: [
    "Back-End Developer",
    "Programmer",
    "Freelancer",
    "Back-End Developer",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 1000,
  startDelay: 500,
  smartBackspace: true,
  showCursor: false,
  autoInsertCss: true,
});

/*=============== LIVE CHAT  ===============*/
document.addEventListener("DOMContentLoaded", function () {
  // Drift initialization
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

  // Configure Drift settings
  drift.config({
    showWelcomeMessage: false,
    enableWelcomeMessage: false,
    showGeneratedMarkup: false,
  });

  // Load Drift with your ID
  drift.load("7ixnh64c3k5t");

  // Function to check if any modal is open
  function isAnyModalOpen() {
    const storyModal = document.getElementById("story-modal");
    const projectModals = document.querySelectorAll(".modal");

    const isStoryModalOpen =
      storyModal && !storyModal.classList.contains("hidden");
    const isAnyProjectModalOpen = Array.from(projectModals).some(
      (modal) => modal.style.display === "block"
    );

    return isStoryModalOpen || isAnyProjectModalOpen;
  }

  // Function to toggle Drift visibility
  function toggleDrift() {
    if (isAnyModalOpen()) {
      drift.hide();
    } else {
      drift.show();
    }
  }

  // Show Drift initially if no modals are open
  if (!isAnyModalOpen()) {
    drift.show();
  }

  // Observe story modal
  const storyModal = document.getElementById("story-modal");
  if (storyModal) {
    new MutationObserver(toggleDrift).observe(storyModal, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  // Observe project modals
  const projectModals = document.querySelectorAll(".modal");
  projectModals.forEach((modal) => {
    new MutationObserver(toggleDrift).observe(modal, {
      attributes: true,
      attributeFilter: ["style"],
    });
  });

  // Patch the existing openProjectModal function
  const originalOpenProjectModal = window.openProjectModal;
  window.openProjectModal = function (projectId) {
    if (originalOpenProjectModal) {
      originalOpenProjectModal(projectId);
    }
    toggleDrift();
  };

  // Patch the existing closeProjectModal function
  const originalCloseProjectModal = window.closeProjectModal;
  window.closeProjectModal = function (event, modalId) {
    if (originalCloseProjectModal) {
      originalCloseProjectModal(event, modalId);
    }
    toggleDrift();
  };

  // Close modal and show drift on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      toggleDrift();
    }
  });
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
  const themeButton = document.getElementById("theme-button");
  const themeButtonMobile = document.getElementById("theme-button-mobile");

  body.classList.toggle("white-mode");

  // Change icon based on current theme for both buttons
  if (body.classList.contains("white-mode")) {
    localStorage.setItem("theme", "white");
    if (themeButton) {
      themeButton.classList.remove("ri-moon-line");
      themeButton.classList.add("ri-sun-line");
    }
    if (themeButtonMobile) {
      themeButtonMobile.classList.remove("ri-moon-line");
      themeButtonMobile.classList.add("ri-sun-line");
    }
  } else {
    localStorage.setItem("theme", "dark");
    if (themeButton) {
      themeButton.classList.remove("ri-sun-line");
      themeButton.classList.add("ri-moon-line");
    }
    if (themeButtonMobile) {
      themeButtonMobile.classList.remove("ri-sun-line");
      themeButtonMobile.classList.add("ri-moon-line");
    }
  }
}

// Initialize theme when page loads
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();

  // Update icon on initial load for both buttons
  const body = document.body;
  const themeButton = document.getElementById("theme-button");
  const themeButtonMobile = document.getElementById("theme-button-mobile");

  if (body.classList.contains("white-mode")) {
    if (themeButton) {
      themeButton.classList.remove("ri-moon-line");
      themeButton.classList.add("ri-sun-line");
    }
    if (themeButtonMobile) {
      themeButtonMobile.classList.remove("ri-moon-line");
      themeButtonMobile.classList.add("ri-sun-line");
    }
  }
});

// Add click listeners to both theme buttons
const themeButton = document.getElementById("theme-button");
const themeButtonMobile = document.getElementById("theme-button-mobile");

if (themeButton) {
  themeButton.addEventListener("click", toggleMode);
}
if (themeButtonMobile) {
  themeButtonMobile.addEventListener("click", toggleMode);
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
  solarvita: {
    title: "SolarVita",
    badge: "Still in development - Last Update - 03/10/2025",
    description: `
    <p><strong class="title-text">SolarVita</strong> is a comprehensive Flutter + Firebase app that blends fitness tracking with sustainability.</p>

    <p><strong class="title-text">Key Features:</strong></p>
    <ul>
      <li class="description-text"><strong>AI coaching</strong> (Google Gemini 1.5) for workouts, meals, and eco tips</li>
      <li class="description-text"><strong>Health + Sustainability</strong>: workouts, nutrition, CO₂ saved, and eco score</li>
      <li class="description-text"><strong>Discovery & Tracking</strong>: ExerciseDB, Nutritionix, and Google Vision food recognition</li>
      <li class="description-text"><strong>Community</strong>: supporters system, challenges, and tribes with real‑time chat</li>
      <li class="description-text"><strong>Privacy‑first</strong> controls and <strong>11‑language</strong> localization</li>
    </ul>

    <p><strong class="title-text">Technical Highlights:</strong></p>
    <ul>
      <li class="description-text">Flutter 3.6+, Firebase (Auth, Firestore, Cloud Functions, Realtime Database)</li>
      <li class="description-text">State management with Provider + Riverpod; theming (light/dark)</li>
      <li class="description-text">Caching and offline storage (SharedPreferences); response caching for AI</li>
      <li class="description-text">Charts/analytics for progress; performance optimizations</li>
      <li class="description-text">Robust API integration, error handling, and structured logging</li>
    </ul>

    <p><strong class="title-text">Result:</strong> a fast, privacy‑respecting fitness platform that motivates healthier habits while reducing environmental impact.</p>

    <p><strong class="title-text">This project significantly enhanced my expertise in:</strong></p>
    <ul>
      <li class="description-text">Flutter & Dart development</li>
      <li class="description-text">Provider & Riverpod state management</li>
      <li class="description-text">API design, integration, and error handling</li>
      <li class="description-text">Internationalization (11 languages)</li>
      <li class="description-text">Design systems: theming, accessibility, and UX</li>
      <li class="description-text">Caching, offline storage, and async patterns</li>
      <li class="description-text">Cross‑platform performance optimization</li>
    </ul>
  `,
    videoUrl:
      "https://drive.google.com/uc?export=download&id=1airIEh5Sh6EGtV8fu8v9IUbjxnNnlumj", // Hosted externally
    liveUrl:
      "https://appetize.io/app/b_rxogvdttof7mtfketikb3um234?device=pixel7&osVersion=13.0",
    githubUrl: "https://github.com/RuiSeca/SolarVita",
    technologies: [
      "Flutter 3.6+",
      "Dart",
      "Firebase Auth",
      "Cloud Firestore",
      "Cloud Functions",
      "Realtime Database",
      "Provider",
      "Riverpod",
      "SharedPreferences",
      "Google Gemini",
      "Nutritionix API",
      "ExerciseDB API",
      "Google Vision API",
      "i18n (11 languages)",
    ],
  },
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
    videoUrl:
      "https://drive.google.com/uc?export=download&id=1SKRz450XEn_5nyob9TL8j6XQ_miP8MPA",
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
  "youtube-shorts-automation": {
    title: "YouTube Shorts Automation System",
    description: `
    <p><strong class="title-text">YouTube Shorts Automation System</strong> is a comprehensive platform I developed to streamline the entire YouTube Shorts creation workflow, from content ideation to analytics tracking, enabling consistent content delivery with minimal manual effort.</p>

    <p><strong class="title-text">Key Features:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">Dynamic Content Generation: AI-powered content ideas optimized for short-form engagement</li>
      <li class="description-text">Script Generation: Automatic creation of concise, attention-grabbing scripts</li>
      <li class="description-text">Voice Synthesis: Integration with ElevenLabs API for natural-sounding narration</li>
      <li class="description-text">Video Assembly: Automated compilation of vertical videos with stock footage</li>
      <li class="description-text">YouTube Integration: Seamless uploads with proper metadata and thumbnails</li>
      <li class="description-text">Analytics Dashboard: Performance tracking with YouTube Analytics API integration</li>
    </ul>

    <p><strong class="title-text">Key Technical Achievements:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">Built a responsive web interface with Flask for managing the automation workflow</li>
      <li class="description-text">Integrated OpenAI API for content generation with fallback mechanisms</li>
      <li class="description-text">Implemented YouTube API OAuth authentication for secure account access</li>
      <li class="description-text">Created a modular video processing pipeline with FFmpeg for vertical format videos</li>
      <li class="description-text">Developed a real-time job monitoring system with progress tracking</li>
      <li class="description-text">Built a comprehensive analytics dashboard with dynamic data visualization</li>
      <li class="description-text">Implemented error handling and recovery at each stage of the automation process</li>
    </ul>

    <p><strong class="title-text">This project significantly enhanced my expertise in:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">AI integration and prompt engineering</li>
      <li class="description-text">API design and third-party service integration</li>
      <li class="description-text">OAuth authentication flows</li>
      <li class="description-text">Media processing and FFmpeg utilization</li>
      <li class="description-text">Asynchronous job processing</li>
      <li class="description-text">Data visualization with Chart.js</li>
      <li class="description-text">YouTube API ecosystem</li>
      <li class="description-text">Python backend development with Flask</li>
      <li class="description-text">Modern JavaScript for interactive dashboards</li>
    </ul>

    <p><strong class="title-text">The result is a powerful automation tool that dramatically reduces the time and effort required to create and publish engaging YouTube Shorts content, empowering creators to maintain a consistent publishing schedule with high-quality short-form videos.</strong></p>
  `,
    videoUrl:
      "https://drive.google.com/uc?export=download&id=17Q3gGfb5s-9Zpori3g9oG_b07AkArErO",
    githubUrl: "https://github.com/RuiSeca/youtube-automation",
    technologies: [
      "Python",
      "Flask",
      "JavaScript",
      "Chart.js",
      "FFmpeg",
      "OpenAI API",
      "ElevenLabs API",
      "YouTube API",
      "OAuth 2.0",
      "REST APIs",
    ],
  },
  "CSRF Attack Demonstrator": {
    title: "CSRF Attack Demonstrator",
    description: `
    <p><strong class="title-text">An educational web application applied for one of modules of my masters degree at Surrey University demonstrating Cross-Site Request Forgery (CSRF) vulnerabilities and protection mechanisms through practical examples.</strong><br/><br/></p>

    <p><strong class="title-text">Key Features:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">Dual transfer systems: vulnerable and secure implementations</li>
      <li class="description-text">Real-time balance tracking and transaction history</li>
      <li class="description-text">Automatic detection and reversal of unauthorized transfers</li>
      <li class="description-text">Interactive CSRF attack simulation</li>
      <li class="description-text">Multiple test user accounts for comprehensive testing</li>
    </ul>

    <p><strong class="title-text">Technical Highlights:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">Implementation of CSRF token protection mechanism</li>
      <li class="description-text">Secure session management and user authentication</li>
      <li class="description-text">Transaction monitoring and automatic reversal system</li>
      <li class="description-text">MySQL database with foreign key constraints</li>
      <li class="description-text">PDO and MySQLi database interfaces</li>
    </ul>

    <p><strong class="title-text">Security Features:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">Secure vs. regular balance separation</li>
      <li class="description-text">CSRF token validation and regeneration</li>
      <li class="description-text">Prepared statements for SQL injection prevention</li>
      <li class="description-text">Session security measures</li>
      <li class="description-text">Input validation and sanitization</li>
    </ul>

    <p><strong class="title-text">Educational Components:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">Step-by-step attack demonstration</li>
      <li class="description-text">Visual comparison of secure vs. vulnerable implementations</li>
      <li class="description-text">Clear security status indicators</li>
      <li class="description-text">Comprehensive transaction tracking</li>
      <li class="description-text">Detailed error and success messages</li>
    </ul>

    <p><strong class="title-text">Learning Outcomes:</strong></p>
    <ul style="list-style-type: circle; padding-left: 20px;">
      <li class="description-text">Understanding of CSRF vulnerabilities and prevention</li>
      <li class="description-text">Implementation of secure coding practices</li>
      <li class="description-text">Database transaction management</li>
      <li class="description-text">User authentication and session handling</li>
      <li class="description-text">Real-time security monitoring and response</li>
    </ul>

    <p><strong class="title-text">The result is a comprehensive security demonstration platform that effectively illustrates CSRF vulnerabilities and protection mechanisms through hands-on experience.</strong><br/><br/></p>
    `,
    videoUrl:
      "https://drive.google.com/uc?export=download&id=1Rklwqh1eXskFd-SWbPnYlC25uVv0r0s8",
    liveUrl: "http://csrf.infinityfreeapp.com/public/index.php",
    githubUrl: "https://github.com/RuiSeca/CSRF-attack",
    technologies: [
      "PHP",
      "MySQL",
      "JavaScript",
      "HTML5",
      "CSS3",
      "PDO",
      "MySQLi",
      "Session Management",
      "CSRF Protection",
      "Transaction Management",
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
    videoUrl:
      "https://drive.google.com/uc?export=download&id=1QroicLv2vzWFRleqsg3E6ku3zhLGl-BP",
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
};

let scrollPosition = 0;

function openProjectModal(projectId) {
  const modal = document.getElementById("projectModal");
  const project = projectData[projectId];
  const isWhiteMode = document.body.classList.contains("white-mode");

  console.log("Opening project:", projectId);

  if (!project) {
    console.error("Project not found:", projectId);
    return;
  }

  // Store current scroll position and lock body
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.classList.add("modal-open");

  // Build a Google Drive preview URL (no autoplay) when the source is Drive
  let driveEmbedUrl = null;
  if (project.videoUrl && project.videoUrl.includes("drive.google.com")) {
    try {
      const urlObj = new URL(project.videoUrl);
      const idFromParam = urlObj.searchParams.get("id");
      const idFromPreview =
        project.videoUrl.match(/\/file\/d\/([^/]+)/)?.[1] || null;
      const fileId = idFromParam || idFromPreview;
      if (fileId) {
        driveEmbedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      }
    } catch (_) {}
  }

  // Update modal content (title + optional badge in header)
  const titleEl = modal.querySelector(".project-modal__title");
  if (titleEl) {
    const titleHtml = `<span class=\"project-modal__title-text\">${project.title}</span>`;
    const badgeHtml = project.badge
      ? ` <span class=\"project-badge project-badge--header\" aria-label=\"Project status\">${project.badge}</span>`
      : "";
    // Ensure badge sits immediately after the title text
    titleEl.innerHTML = titleHtml + badgeHtml;
  }

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

          ${
            driveEmbedUrl
              ? `<iframe class="project-iframe" src="${driveEmbedUrl}" title="${project.title} preview" allow="encrypted-media" loading="lazy"></iframe>`
              : `<video src="${project.videoUrl}" controls playsinline webkit-playsinline></video>`
          }
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

  // Hide loader on native video load
  const video = modalBody.querySelector("video");
  if (video) {
    video.addEventListener("loadeddata", function () {
      requestAnimationFrame(() => {
        const spinner = modalBody.querySelector(".spinner");
        if (spinner) spinner.style.display = "none";
      });
    });
    video.addEventListener("error", function () {
      const spinner = modalBody.querySelector(".spinner");
      if (spinner) spinner.style.display = "none";
    });
  }

  // Hide loader when Drive iframe loads
  const iframe = modalBody.querySelector(".project-iframe");
  if (iframe) {
    iframe.addEventListener("load", function () {
      const spinner = modalBody.querySelector(".spinner");
      if (spinner) spinner.style.display = "none";
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
// Add event listener to the fixed action button
const fixedActionBtn = document.querySelector(".fixed-action-btn");
if (fixedActionBtn) {
  fixedActionBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const target = e.currentTarget.getAttribute("data-target");
    const projectId = e.currentTarget.getAttribute("data-project-id");

    if (target === "#projectModal") {
      // Use the project ID from the button attribute, or fallback to current story project
      if (projectId) {
        openProjectModal(projectId);
      } else if (window.currentStoryProject) {
        // Use the current project from story viewer if available
        openProjectModal(window.currentStoryProject);
      } else {
        // Fallback to default project if needed
        openProjectModal("savannah-bites");
      }
    } else {
      // Handle other fixed action button functionality
    }
  });
}

/*=============== STORY MODAL  ===============*/
// Define the StoryViewer class
function StoryViewer(projects, swiper) {
  // Initialize properties
  this.projects = projects;
  this.swiper = swiper;
  this.currentIndex = 0;
  this.lastIndex = 0;
  this.isPlaying = true;
  this.progress = 0;
  this.animationFrameId = null;
  this.lastTimestamp = null;
  this.menuOpen = false;

  // Touch tracking
  this.touchStartX = null;
  this.touchStartY = null;
  this.minSwipeDistance = 50;
  this.isMoving = false;

  // Dead zone dimensions
  this.deadZoneWidth = 100;
  this.deadZoneHeight = 100;

  // Get DOM elements
  this.modal = document.getElementById("story-modal");
  this.modalContent = this.modal.querySelector(".story-modal-content");
  this.video = document.getElementById("modal-video");
  this.progressContainer = document.getElementById("progress-container");
  this.progressBarFill = document.querySelector(".progress-bar-fill");
  this.playPauseIndicator = document.querySelector(".play-pause-indicator");
  this.menu = this.modal.querySelector(".story-menu");

  // Initialize
  this.initializeEventListeners();
  this.initializeMenu();
}

StoryViewer.prototype.initializeEventListeners = function () {
  var self = this;

  // Close button
  this.modal
    .querySelector(".close-btn")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      self.close();
    });

  // Menu button
  this.modal.querySelector(".menu-btn").addEventListener("click", function (e) {
    e.stopPropagation();
    self.toggleMenu(e);
  });

  // Video events
  this.video.addEventListener("loadedmetadata", function () {
    self.startProgressAnimation();
  });

  this.video.addEventListener("ended", function () {
    self.handleVideoEnd();
  });

  this.video.addEventListener("error", function (e) {
    console.log("Video error:", e);
  });

  // Touch/Mouse events
  this.modalContent.addEventListener("mousedown", function (e) {
    self.handleStart(e);
  });

  this.modalContent.addEventListener("mousemove", function (e) {
    self.handleMove(e);
  });

  this.modalContent.addEventListener("mouseup", function (e) {
    self.handleEnd(e);
  });

  this.modalContent.addEventListener("touchstart", function (e) {
    self.handleStart(e);
  });

  this.modalContent.addEventListener("touchmove", function (e) {
    self.handleMove(e);
  });

  this.modalContent.addEventListener("touchend", function (e) {
    self.handleEnd(e);
  });

  // Close menu when clicking outside
  this.modal.addEventListener("click", function (e) {
    if (
      self.menuOpen &&
      !self.menu.contains(e.target) &&
      !e.target.classList.contains("menu-btn")
    ) {
      self.closeMenu();
    }
  });

  // Prevent right-click menu
  this.modal.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // Cleanup mouse events when leaving modal
  this.modalContent.addEventListener("mouseleave", function (e) {
    if (self.touchStartX !== null) {
      self.handleEnd(e);
    }
  });
};

StoryViewer.prototype.initializeMenu = function () {
  var self = this;

  this.menu.addEventListener("click", function (e) {
    e.stopPropagation();
    var menuItem = e.target.closest(".story-menu-item");
    if (menuItem) {
      var action = menuItem.dataset.action;
      if (action) {
        self.handleMenuAction(action);
      }
    }
  });
};

StoryViewer.prototype.handleStart = function (e) {
  // Get coordinates
  var x = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  var y = e.type.includes("mouse") ? e.clientY : e.touches[0].clientY;

  // Get modal position
  var rect = this.modalContent.getBoundingClientRect();

  // Check if in dead zone
  var isInDeadZone =
    x - rect.left < this.deadZoneWidth && y - rect.top < this.deadZoneHeight;
  var isInDeadZone =
    x - rect.right < this.deadZoneWidth && y - rect.top < this.deadZoneHeight;

  // If in dead zone, don't process the interaction
  if (isInDeadZone) {
    return;
  }

  // Handle menu state
  if (this.menuOpen) {
    if (!this.menu.contains(e.target)) {
      this.closeMenu();
    }
    return;
  }

  this.touchStartX = x;
  this.touchStartY = y;
  this.isMoving = false;
  this.video.style.pointerEvents = "none";
};

StoryViewer.prototype.handleMove = function (e) {
  if (this.touchStartX === null || this.menuOpen) return;

  var currentX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  var currentY = e.type.includes("mouse") ? e.clientY : e.touches[0].clientY;
  var deltaX = currentX - this.touchStartX;
  var deltaY = currentY - this.touchStartY;

  if (Math.abs(deltaY) > Math.abs(deltaX)) return;

  e.preventDefault();
  this.isMoving = true;

  var rotate = deltaX * 0.1;
  this.modalContent.style.transform = `translate3d(${deltaX}px, 0, 0) rotateY(${rotate}deg)`;
  this.modalContent.style.opacity = 1 - Math.abs(deltaX) / 1000;
};

StoryViewer.prototype.handleEnd = function (e) {
  if (this.touchStartX === null || this.menuOpen) return;

  var endX = e.type.includes("mouse") ? e.clientX : e.changedTouches[0].clientX;
  var deltaX = endX - this.touchStartX;

  this.modalContent.style.transform = "";
  this.modalContent.style.opacity = "";
  this.video.style.pointerEvents = "auto";

  if (Math.abs(deltaX) > this.minSwipeDistance) {
    if (deltaX > 0 && this.currentIndex > 0) {
      this.currentIndex--;
      this.swiper.slideTo(this.currentIndex, 300, true);
      this.loadVideo();
    } else if (deltaX < 0 && this.currentIndex < this.projects.length - 1) {
      this.currentIndex++;
      this.swiper.slideTo(this.currentIndex, 300, true);
      this.loadVideo();
    } else if (deltaX < 0 && this.currentIndex === this.projects.length - 1) {
      this.close();
    }
  } else if (!this.isMoving) {
    var rect = this.modalContent.getBoundingClientRect();
    var x = endX - rect.left;
    var width = rect.width;

    if (x < width / 3) {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.swiper.slideTo(this.currentIndex, 300, true);
        this.loadVideo();
      }
    } else if (x > (width * 2) / 3) {
      if (this.currentIndex < this.projects.length - 1) {
        this.currentIndex++;
        this.swiper.slideTo(this.currentIndex, 300, true);
        this.loadVideo();
      } else {
        this.close();
      }
    } else {
      this.togglePlayPause();
    }
  }

  this.touchStartX = null;
  this.touchStartY = null;
  this.isMoving = false;
};

StoryViewer.prototype.handleMenuAction = function (action) {
  var currentProject = this.projects[this.currentIndex];

  // Set current project ID globally so it can be accessed by other functions
  window.currentStoryProject = currentProject.modalId;

  switch (action) {
    case "view-project":
      this.close();
      setTimeout(function () {
        // Directly pass the modalId to ensure correct project opens
        openProjectModal(currentProject.modalId);
      }, 300);
      break;

    case "github":
      if (currentProject.githubUrl) {
        window.open(currentProject.githubUrl, "_blank");
      }
      break;

    case "live-demo":
      if (currentProject.liveUrl) {
        window.open(currentProject.liveUrl, "_blank");
      }
      break;
  }

  this.closeMenu();
};
StoryViewer.prototype.toggleMenu = function () {
  if (this.menuOpen) {
    this.closeMenu();
  } else {
    this.openMenu();
  }
};

StoryViewer.prototype.openMenu = function () {
  this.menu.classList.add("active");
  this.menuOpen = true;
};

StoryViewer.prototype.closeMenu = function () {
  this.menu.classList.remove("active");
  this.menuOpen = false;
};

StoryViewer.prototype.startProgressAnimation = function () {
  var self = this;

  function animate(timestamp) {
    if (!self.lastTimestamp) self.lastTimestamp = timestamp;

    if (self.isPlaying && !self.video.paused && self.video.duration) {
      var progress = (self.video.currentTime / self.video.duration) * 100;
      self.progressBarFill.style.width = progress + "%";
    }

    self.lastTimestamp = timestamp;
    self.animationFrameId = requestAnimationFrame(animate);
  }

  if (this.animationFrameId) {
    cancelAnimationFrame(this.animationFrameId);
  }

  this.animationFrameId = requestAnimationFrame(animate);
};

StoryViewer.prototype.togglePlayPause = function () {
  this.isPlaying = !this.isPlaying;
  if (this.isPlaying) {
    this.video.play();
    this.playPauseIndicator.classList.add("hidden");
  } else {
    this.video.pause();
    this.playPauseIndicator.classList.remove("hidden");
  }
};

StoryViewer.prototype.handleVideoEnd = function () {
  if (this.currentIndex < this.projects.length - 1) {
    this.currentIndex++;
    this.swiper.slideTo(this.currentIndex, 300, true);
    this.loadVideo();
  } else {
    this.close();
  }
};

StoryViewer.prototype.loadVideo = function () {
  var self = this;

  if (this.animationFrameId) {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
  }

  var slideDirection = this.lastIndex < this.currentIndex ? "left" : "right";
  this.modalContent.classList.add("sliding-" + slideDirection);

  this.progressBarFill.style.transition = "none";
  this.progressBarFill.style.width = "0%";

  void this.progressBarFill.offsetWidth;

  this.progressBarFill.style.transition = "width linear";

  // Update the current project ID
  var currentProject = this.projects[this.currentIndex];
  window.currentStoryProject = currentProject.modalId;

  // Update any UI elements that need to reflect the current project
  var projectTitle = document.querySelector(".story-project-title");
  if (projectTitle && currentProject) {
    // Find the full project data from projectData
    var fullProjectData = projectData[currentProject.modalId];
    if (fullProjectData) {
      projectTitle.textContent = fullProjectData.title;
    }
  }

  setTimeout(function () {
    self.modalContent.classList.remove("sliding-left", "sliding-right");
    // Revert to non-autoplay story, keep inline playback and show no controls overlay
    let url = self.projects[self.currentIndex].videoUrl;
    // For Drive sources, prefer preview URL for reliability
    if (url && url.includes("drive.google.com")) {
      try {
        const previewMatch = url.match(/\/file\/d\/([^/]+)/);
        const idFromPreview = previewMatch ? previewMatch[1] : null;
        const idFromQuery = (() => {
          try {
            const u = new URL(url);
            return u.searchParams.get("id");
          } catch (_) {
            return null;
          }
        })();
        const fileId = idFromPreview || idFromQuery;
        if (fileId) {
          url = `https://drive.google.com/file/d/${fileId}/preview`;
        }
      } catch (_) {}
    }
    self.video.removeAttribute("controls");
    self.video.removeAttribute("autoplay");
    self.video.muted = true;
    self.video.setAttribute("playsinline", "");
    self.video.setAttribute("webkit-playsinline", "");
    self.video.setAttribute("preload", "metadata");
    self.video.src = url;
    self.lastTimestamp = null;

    // Do not force autoplay; respect user gesture
  }, 300);

  this.lastIndex = this.currentIndex;
  this.closeMenu();
};

StoryViewer.prototype.open = function (startIndex) {
  this.currentIndex = startIndex || 0;
  this.lastIndex = this.currentIndex;
  this.modal.classList.remove("hidden");
  this.swiper.slideTo(this.currentIndex, 300, true);
  this.loadVideo();
};

StoryViewer.prototype.close = function () {
  if (this.animationFrameId) {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
  }
  this.modal.classList.add("hidden");
  this.video.pause();
  this.video.src = "";
  this.progressBarFill.style.width = "0%";
  this.closeMenu();
};

// Add this code to the end of your main.js file

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the story viewer with project data and swiper instance
  const storyViewer = new StoryViewer(projectsData, swiper);
  window.storyViewer = storyViewer; // Make it globally accessible

  // Initialize viewed stories tracking
  const viewedStories = JSON.parse(
    localStorage.getItem("viewedStories") || "{}"
  );

  // Function to mark a story as viewed
  const markStoryAsViewed = (index) => {
    const projectId = projectsData[index]?.modalId;
    if (projectId) {
      viewedStories[projectId] = true;
      localStorage.setItem("viewedStories", JSON.stringify(viewedStories));

      // Update all cards that might show this project
      updateViewedStateForAllCards();
    }
  };

  // Function to update the viewed state for all cards
  const updateViewedStateForAllCards = () => {
    const projectCards = document.querySelectorAll(".card");
    projectCards.forEach((card, index) => {
      const projectId = projectsData[index]?.modalId;
      const cardImage = card.querySelector(".card__image");

      if (cardImage && projectId && viewedStories[projectId]) {
        // Add viewed styling - just a subtle gray overlay
        cardImage.style.position = "relative";

        // Check if overlay already exists
        let overlay = cardImage.querySelector(".story-viewed-overlay");
        if (!overlay) {
          overlay = document.createElement("div");
          overlay.className = "story-viewed-overlay";
          overlay.style.position = "absolute";
          overlay.style.top = "0";
          overlay.style.left = "0";
          overlay.style.width = "100%";
          overlay.style.height = "100%";
          overlay.style.background = "rgba(0, 0, 0, 0.2)"; // Very subtle gray
          overlay.style.pointerEvents = "none";
          overlay.style.zIndex = "2";
          cardImage.appendChild(overlay);
        }
      }
    });
  };

  // Enhance StoryViewer with onStoryView callback
  StoryViewer.prototype.onStoryView = function (index) {
    // This will be overridden to track viewed stories
  };

  // Modify loadVideo to call onStoryView
  const originalLoadVideo = StoryViewer.prototype.loadVideo;
  StoryViewer.prototype.loadVideo = function () {
    // Call the original function
    originalLoadVideo.apply(this, arguments);

    // Call the onStoryView callback with the current index
    if (typeof this.onStoryView === "function") {
      this.onStoryView(this.currentIndex);
    }
  };

  // Listen for story close event to mark stories as viewed
  storyViewer.onStoryView = (index) => {
    markStoryAsViewed(index);
  };

  // Add click handlers to each project card
  const projectCards = document.querySelectorAll(".card");
  projectCards.forEach((card, index) => {
    // Find the card image container
    const cardImage = card.querySelector(".card__image");
    if (cardImage) {
      // Make the image container relative positioning
      cardImage.style.position = "relative";

      // Make the whole image clickable to open the story viewer
      cardImage.style.cursor = "pointer";
      cardImage.addEventListener("click", function (e) {
        storyViewer.open(index);
      });
    }
  });

  // Add keyboard shortcuts for story navigation
  document.addEventListener("keydown", function (e) {
    if (document.getElementById("story-modal").classList.contains("hidden")) {
      return; // Don't process keystrokes when modal is hidden
    }

    switch (e.key) {
      case "Escape":
        storyViewer.close();
        break;
      case "ArrowLeft":
        if (storyViewer.currentIndex > 0) {
          storyViewer.currentIndex--;
          storyViewer.swiper.slideTo(storyViewer.currentIndex, 300, true);
          storyViewer.loadVideo();
        }
        break;
      case "ArrowRight":
        if (storyViewer.currentIndex < storyViewer.projects.length - 1) {
          storyViewer.currentIndex++;
          storyViewer.swiper.slideTo(storyViewer.currentIndex, 300, true);
          storyViewer.loadVideo();
        } else {
          storyViewer.close();
        }
        break;
      case " ": // Space bar
        storyViewer.togglePlayPause();
        break;
    }
  });

  console.log("Story viewer initialized with", projectsData.length, "projects");

  // Update viewed states on load
  setTimeout(() => {
    const viewedStories = JSON.parse(
      localStorage.getItem("viewedStories") || "{}"
    );
    if (Object.keys(viewedStories).length > 0) {
      updateViewedStateForAllCards();
    }
  }, 500);
});

// Add a CSS style for mobile responsiveness
const styleElement = document.createElement("style");
styleElement.textContent = `
  .card__image {
    transition: transform 0.2s ease;
  }
  
  .card__image:hover {
    transform: scale(1.02);
  }
  
  .card__image:active {
    transform: scale(0.98);
  }
  
  .story-viewed-overlay {
    transition: opacity 0.3s ease;
  }
`;
document.head.appendChild(styleElement);

// Project data
const projectsData = [
  {
    videoUrl:
      "https://drive.google.com/file/d/1DUXyvZCe8zWXwdp5XbIZT2Y6217N1F6B/preview",
    detailUrl: "#solarvita",
    githubUrl: "https://github.com/RuiSeca/SolarVita",
    liveUrl:
      "https://appetize.io/app/b_rxogvdttof7mtfketikb3um234?device=pixel7&osVersion=13.0",
    modalId: "solarvita",
  },
  {
    videoUrl:
      "https://drive.google.com/file/d/1SKRz450XEn_5nyob9TL8j6XQ_miP8MPA/preview",
    detailUrl: "#savannah-bites",
    githubUrl: "https://github.com/RuiSeca/savannah-bites",
    liveUrl: "https://savannah-bites.onrender.com/",
    modalId: "savannah-bites",
  },
  {
    videoUrl:
      "https://drive.google.com/file/d/17Q3gGfb5s-9Zpori3g9oG_b07AkArErO/preview",
    detailUrl: "#youtube-shorts-automation",
    githubUrl: "https://github.com/RuiSeca/youtube-automation",
    modalId: "youtube-shorts-automation",
  },
  {
    videoUrl:
      "https://drive.google.com/file/d/1Rklwqh1eXskFd-SWbPnYlC25uVv0r0s8/preview",
    detailUrl: "#csrf-attack",
    githubUrl: "https://github.com/RuiSeca/CSRF-attack",
    liveUrl: "http://crfs.infinityfreeapp.com/public/index.php",
    modalId: "CSRF Attack Demonstrator",
  },
  {
    videoUrl:
      "https://drive.google.com/file/d/1QroicLv2vzWFRleqsg3E6ku3zhLGl-BP/preview",
    detailUrl: "#weather-cast",
    githubUrl: "https://github.com/RuiSeca/weatherApp",
    liveUrl: "https://weather-cast-show.netlify.app/",
    modalId: "weather-cast",
  },
];

/*=============== Project Piano & Hologram Integration ===============*/
document.addEventListener("DOMContentLoaded", () => {
  // Initialize global variables and preload audio
  window.mainAudio = new Audio("/assets/audio/wonder.mp3");
  window.mainAudio.volume = 0.5;
  window.isPlaying = false;

  // Preload audio to ensure it's ready to play immediately
  setTimeout(() => {
    // Force audio to be ready for immediate playback
    if (window.mainAudio) {
      // Create a short silent audio buffer
      const silentAudio = new Audio(
        "data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
      );
      silentAudio
        .play()
        .then(() => {
          // Now preload the actual audio file
          window.mainAudio.load();
          console.log("Audio preloaded and ready for playback");
        })
        .catch((err) => {
          console.log("Silent audio failed, trying alternative approach", err);
          // Alternative approach
          window.mainAudio.load();
        });

      // Ensure audio context is created and ready
      if (
        typeof AudioContext !== "undefined" ||
        typeof webkitAudioContext !== "undefined"
      ) {
        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;
        window.preInitializedAudioContext = new AudioContextClass();
      }
    }
  }, 500);

  const careerStages = [
    {
      note: "C",
      year: "2020",
      title: "Beginning - Cambridge",
      description: "Started Journey BSc of CS at Anglia Ruskin University",
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
      description: "Skills Growth",
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
      description: "Developing Projects",
      color: "bg-amber-700",
      type: "black",
    },
    {
      note: "G",
      year: "2022",
      title: "Growth",
      description: "Learning New Things",
      color: "bg-amber-800",
      type: "white",
    },
    {
      note: "G#",
      year: "2022",
      title: "Guidance",
      description: "Finding Guidance",
      color: "bg-amber-900",
      type: "black",
    },
    {
      note: "A",
      year: "2023",
      title: "Achievement",
      description: "University Final Project Success",
      color: "bg-orange-400",
      type: "white",
    },
    {
      note: "A#",
      year: "2023",
      title: "Advancement",
      description: "Enhancing Progress",
      color: "bg-orange-500",
      type: "black",
    },
    {
      note: "B",
      year: "2023",
      title: "Building",
      description: "Building Robust Codebase",
      color: "bg-orange-600",
      type: "white",
    },
    {
      note: "C2",
      year: "2024",
      title: "New Chapter - Guilford",
      description:
        "Milestone Started MSc of Cyber Security at Surrey University",
      color: "bg-orange-700",
      type: "white",
    },
    {
      note: "D2",
      year: "2025",
      title: "Direction",
      description: "Future Goals",
      color: "bg-orange-900",
      type: "white",
    },
  ];

  // Piano state variables
  let cardFadeTimeout = null;
  let isMuted = false;

  // Create main container
  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";
  container.style.position = "relative";
  const pianoContainer = document.getElementById("piano-container");

  if (pianoContainer) {
    pianoContainer.appendChild(container);
  } else {
    console.error("Piano container not found!");
    return;
  }

  // Create piano container
  const pianoCabinetContainer = document.createElement("div");
  pianoCabinetContainer.className = "piano-container";
  container.appendChild(pianoCabinetContainer);

  // Create keys container
  const keysContainer = document.createElement("div");
  keysContainer.className = "keys-container";
  pianoCabinetContainer.appendChild(keysContainer);

  // Create sound control element
  const soundControl = document.createElement("button");
  soundControl.className = "sound-control";
  soundControl.innerHTML = `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>`;
  pianoCabinetContainer.appendChild(soundControl);

  // Create status dot (red dot)
  const statusDot = document.createElement("div");
  statusDot.className = "status-dot";
  statusDot.style.position = "absolute";
  statusDot.style.top = "15px";
  statusDot.style.left = "15px";
  statusDot.style.width = "10px";
  statusDot.style.height = "10px";
  statusDot.style.borderRadius = "50%";
  statusDot.style.background = "#ff3b30";
  statusDot.style.opacity = "0.5";
  statusDot.style.transition = "all 0.3s ease";
  pianoCabinetContainer.appendChild(statusDot);

  /*=================== PIANO FUNCTIONS ===================*/

  // Card fade timer function - simplified, no transform
  const startCardFadeTimer = () => {
    if (cardFadeTimeout) {
      clearTimeout(cardFadeTimeout);
    }

    cardFadeTimeout = setTimeout(() => {
      const cards = document.querySelectorAll(".career-journey-card");
      cards.forEach((card) => {
        card.style.transition = "opacity 0.4s ease-out";
        card.style.opacity = "0";
      });
    }, 6000); // 6 seconds
  };

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

    // Get current theme colors dynamically
    const themeColors = window.getPianoThemeColors
      ? window.getPianoThemeColors()
      : { r: 215, g: 119, b: 6 };
    const colors = [
      `rgba(${themeColors.r}, ${themeColors.g}, ${themeColors.b}, 0.9)`,
      `rgba(${Math.min(themeColors.r + 20, 255)}, ${Math.min(
        themeColors.g + 20,
        255
      )}, ${Math.min(themeColors.b + 20, 255)}, 0.85)`,
      `rgba(${Math.max(themeColors.r - 20, 0)}, ${Math.max(
        themeColors.g - 20,
        0
      )}, ${Math.max(themeColors.b - 20, 0)}, 0.8)`,
      `rgba(${themeColors.r}, ${themeColors.g}, ${themeColors.b}, 0.75)`,
      `rgba(${Math.min(themeColors.r + 40, 255)}, ${Math.min(
        themeColors.g + 40,
        255
      )}, ${Math.min(themeColors.b + 40, 255)}, 0.7)`,
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
    const targetContainer = isCard
      ? document.querySelector(".journey-container")
      : document.querySelector(".piano-container");

    if (!targetContainer) {
      console.error("Container not found for magic trail");
      return;
    }

    const containerRect = targetContainer.getBoundingClientRect();

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

    targetContainer.appendChild(trail);
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
      // Hide header when piano key is pressed
      const header = document.getElementById("header");
      if (header) {
        header.style.transform = "translateY(-100%)";
        header.style.transition = "transform 0.3s ease";
      }

      // Clear active state from all keys
      document.querySelectorAll(".piano-key").forEach((k) => {
        k.classList.remove("active");
        if (k.querySelector(".glow-effect")) {
          k.querySelector(".glow-effect").remove();
        }
      });

      // Add active class to current key
      key.classList.add("active");
      const glowEffect = document.createElement("div");
      glowEffect.className = "glow-effect";
      key.appendChild(glowEffect);

      // Play sound if not muted
      if (!isMuted) {
        if (window.mainAudio) {
          // IMPORTANT: This logic needs to be more robust
          const isCurrentlyPlaying = !window.mainAudio.paused;

          if (!isCurrentlyPlaying) {
            // Force audio context to resume if suspended - use same context as play button
            const audioCtx = window.getAudioContext
              ? window.getAudioContext()
              : null;
            if (audioCtx && audioCtx.state === "suspended") {
              console.log("Resuming audio context from piano key");
              audioCtx.resume();
            }

            console.log("Starting audio from piano key click");
            window.mainAudio.currentTime = 0;

            // Set our global playing flag BEFORE attempting to play
            // This helps work around browser audio timing issues
            window.isPlaying = true;

            // Update hologram UI immediately, don't wait for promise
            const playBtn = document.querySelector(".play-btn");
            if (playBtn) {
              playBtn.classList.add("playing");

              // Toggle Remix icons visibility immediately
              const playIcon = playBtn.querySelector(".ri-play-fill");
              const pauseIcon = playBtn.querySelector(".ri-pause-fill");
              if (playIcon && pauseIcon) {
                playIcon.style.display = "none";
                pauseIcon.style.display = "block";
              }
            }

            // Update piano UI immediately - WHITE dot when playing
            soundControl.classList.add("playing");
            statusDot.classList.add("playing");
            statusDot.style.opacity = "1";

            // Start visualizer immediately
            window.visualizerActive = true;
            if (
              window.hologramFunctions &&
              window.hologramFunctions.drawVisualizer
            ) {
              window.hologramFunctions.drawVisualizer();
            }

            // Now attempt to play the audio with better error handling
            const playPromise = window.mainAudio.play();

            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                console.error("Play failed:", error);

                // Retry once before giving up
                setTimeout(() => {
                  window.mainAudio.play().catch((e) => {
                    console.error("Retry failed too:", e);

                    // Now we can reset the UI since both attempts failed
                    window.isPlaying = false;

                    // Reset hologram UI
                    if (playBtn) {
                      playBtn.classList.remove("playing");
                      const playIcon = playBtn.querySelector(".ri-play-fill");
                      const pauseIcon = playBtn.querySelector(".ri-pause-fill");
                      if (playIcon && pauseIcon) {
                        playIcon.style.display = "block";
                        pauseIcon.style.display = "none";
                      }
                    }

                    // Reset piano UI - RED dot when not playing
                    soundControl.classList.remove("playing");
                    statusDot.classList.remove("playing");
                    statusDot.style.opacity = "0.5";

                    // Stop visualizer
                    window.visualizerActive = false;
                  });
                }, 100);
              });
            }
          } else {
            // Audio already playing - just ensure UI is consistent
            console.log("Audio already playing, ensuring UI is consistent");
            window.isPlaying = true;

            // Update hologram state
            const playBtn = document.querySelector(".play-btn");
            if (playBtn) {
              playBtn.classList.add("playing");

              // Toggle Remix icons visibility
              const playIcon = playBtn.querySelector(".ri-play-fill");
              const pauseIcon = playBtn.querySelector(".ri-pause-fill");

              if (playIcon && pauseIcon) {
                playIcon.style.display = "none";
                pauseIcon.style.display = "block";
              }
            }

            // Ensure visualizer is running
            window.visualizerActive = true;
            if (
              window.hologramFunctions &&
              window.hologramFunctions.drawVisualizer
            ) {
              window.hologramFunctions.drawVisualizer();
            }

            // Pulse the hologram to provide visual feedback even if already playing
            if (
              window.hologramFunctions &&
              window.hologramFunctions.pulseHologram
            ) {
              window.hologramFunctions.pulseHologram();
            }

            // Ensure piano UI shows playing state
            soundControl.classList.add("playing");
            statusDot.classList.add("playing");
            statusDot.style.opacity = "1";
          }
        }
      }

      // Create visual effects
      const keyRect = key.getBoundingClientRect();
      const isBlack = stage.type === "black";
      createEnhancedMagicTrail(
        keyRect.left + keyRect.width / 2,
        keyRect.top + (isBlack ? keyRect.height * 0.7 : keyRect.height * 0.9)
      );

      // Smooth scroll to show both piano and cards
      const pianoCabinetContainer = document.querySelector(".piano-container");
      const viewportHeight = window.innerHeight;
      const pianoRect = pianoCabinetContainer.getBoundingClientRect();
      const targetPosition =
        window.scrollY + pianoRect.top - viewportHeight * 0.2;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Update journey card
      updateJourneyCard(stage);

      // Remove active class after animation completes
      setTimeout(() => {
        key.classList.remove("active");
        if (key.querySelector(".glow-effect")) {
          key.querySelector(".glow-effect").remove();
        }
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
    soundControl.classList.toggle("muted", isMuted);

    soundControl.innerHTML = isMuted
      ? `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M23 3l-12 12M11 5L6 9H2v6h4l5 4M14 9.5c.5.7.8 1.6.8 2.5s-.3 1.8-.8 2.5M17 7c1.2 1.3 2 3.1 2 5s-.8 3.7-2 5"/>
        </svg>`
      : `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>`;

    if (isMuted && window.mainAudio && !window.mainAudio.paused) {
      window.mainAudio.pause();
      window.isPlaying = false;
      soundControl.classList.remove("playing");
      statusDot.classList.remove("playing");
      statusDot.style.opacity = "0.5";

      // Update hologram if available
      if (window.visualizerActive !== undefined) {
        window.visualizerActive = false;
      }
      const playBtn = document.querySelector(".play-btn");
      if (playBtn) {
        playBtn.classList.remove("playing");

        // Toggle Remix icons
        const playIcon = playBtn.querySelector(".ri-play-fill");
        const pauseIcon = playBtn.querySelector(".ri-pause-fill");

        if (playIcon && pauseIcon) {
          playIcon.style.display = "block";
          pauseIcon.style.display = "none";
        }
      }
    }
  });

  // Update journey card function
  const updateJourneyCard = (activeStage) => {
    const journeyContainer = document.querySelector(".journey-container");
    const isMobile = window.innerWidth <= 768;

    if (cardFadeTimeout) {
      clearTimeout(cardFadeTimeout);
    }

    // Remove existing cards
    journeyContainer
      .querySelectorAll(".career-journey-card")
      .forEach((card) => card.remove());

    // Center all cards - no movement or transforms
    const card = document.createElement("div");
    card.className = `career-journey-card ${activeStage.color}`;
    card.style.opacity = "0";

    card.innerHTML = `
      <div class="text-gray-800 relative z-10">
        <div class="font-bold font-serif">${activeStage.year}</div>
        <div class="text-lg font-semibold font-serif">${activeStage.title}</div>
        <div class="text-sm font-serif">${activeStage.description}</div>
      </div>
    `;

    journeyContainer.appendChild(card);

    // Show card instantly with light ray animation
    card.style.opacity = "1";
    card.classList.add("light-ray-active");

    // Remove animation class after it completes
    setTimeout(() => {
      card.classList.remove("light-ray-active");
    }, 800);

    startCardFadeTimer();
  };

  // Add window resize listener to handle layout changes
  window.addEventListener("resize", () => {
    const activeCard = document.querySelector(
      '.career-journey-card[style*="opacity: 1"]'
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
  window.mainAudio.addEventListener("ended", () => {
    window.isPlaying = false;
    soundControl.classList.remove("playing");
    statusDot.classList.remove("playing");
    statusDot.style.opacity = "0.5";

    // Update hologram if available
    if (window.visualizerActive !== undefined) {
      window.visualizerActive = false;
    }
    const playBtn = document.querySelector(".play-btn");
    if (playBtn) {
      playBtn.classList.remove("playing");

      // Toggle Remix icons
      const playIcon = playBtn.querySelector(".ri-play-fill");
      const pauseIcon = playBtn.querySelector(".ri-pause-fill");

      if (playIcon && pauseIcon) {
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
      }
    }
  });

  // Add global listener for the hologram play button
  document.addEventListener("click", function (e) {
    if (
      e.target.closest(".play-btn") ||
      e.target.closest(".prev-btn") ||
      e.target.closest(".next-btn")
    ) {
      console.log(
        "Hologram control clicked:",
        e.target.closest("button").className
      );

      // Synchronize piano state with hologram state after a short delay
      setTimeout(() => {
        const isAudioPlaying = window.mainAudio && !window.mainAudio.paused;
        window.isPlaying = isAudioPlaying;

        // Update hologram UI
        const playBtn = document.querySelector(".play-btn");
        if (playBtn) {
          if (isAudioPlaying) {
            playBtn.classList.add("playing");

            // Toggle Remix icons
            const playIcon = playBtn.querySelector(".ri-play-fill");
            const pauseIcon = playBtn.querySelector(".ri-pause-fill");

            if (playIcon && pauseIcon) {
              playIcon.style.display = "none";
              pauseIcon.style.display = "block";
            }
          } else {
            playBtn.classList.remove("playing");

            // Toggle Remix icons
            const playIcon = playBtn.querySelector(".ri-play-fill");
            const pauseIcon = playBtn.querySelector(".ri-pause-fill");

            if (playIcon && pauseIcon) {
              playIcon.style.display = "block";
              pauseIcon.style.display = "none";
            }
          }
        }

        // Update piano UI
        if (isAudioPlaying) {
          soundControl.classList.add("playing");
          statusDot.classList.add("playing");
          statusDot.style.opacity = "1";
        } else {
          soundControl.classList.remove("playing");
          statusDot.classList.remove("playing");
          statusDot.style.opacity = "0.5";
        }

        // Update visualizer state
        window.visualizerActive = isAudioPlaying;
        if (
          isAudioPlaying &&
          window.hologramFunctions &&
          window.hologramFunctions.drawVisualizer
        ) {
          window.hologramFunctions.drawVisualizer();
        }
      }, 100);
    }
  });

  /*=============== PIANO HOLOGRAM FEATURE ===============*/
  // Initialize the hologram after the piano is loaded
  console.log("DOM loaded, scheduling hologram initialization");
  setTimeout(() => {
    console.log("Initializing hologram after delay");
    initializeHologram();

    // Ensure hologram is visible
    const hologramContainer = document.querySelector(".hologram-container");
    if (hologramContainer) {
      hologramContainer.classList.add("hologram-active");
      console.log("Hologram container activated");
    } else {
      console.warn("Hologram container not found after initialization");
    }
  }, 1200);

  // Global variables for the hologram
  let audioContext = null;
  let audioSource = null;
  let analyzer = null;

  // Make audioContext globally accessible for piano keys
  window.getAudioContext = () => audioContext;
  window.visualizerActive = false;
  let hologramActive = true;
  let currentSongIndex = 0;

  // Song library - add more songs as needed
  const songLibrary = [
    {
      title: "Wonder",
      artist: "Tony Ann",
      file: "/assets/audio/wonder.mp3", // Current default song
      color: "#d97706", // Amber-600 color to match journey cards
      visualizer: "bars", // wave, bars, circle
    },
    {
      title: "Divenire",
      artist: "Ludovico Einaudi",
      file: "/assets/audio/divenire.mp3",
      color: "#b45309", // Amber-800 color
      visualizer: "bars",
    },
  ];

  function initializeHologram() {
    console.log("Initializing hologram...");

    // Wait to make sure window.mainAudio is available
    if (!window.mainAudio) {
      console.log("Waiting for mainAudio to be ready...");
      setTimeout(initializeHologram, 500);
      return;
    }

    // Find the existing hologram UI
    createHologramUI();

    // Make the hologram visible and active
    const hologramContainer = document.querySelector(".hologram-container");
    if (hologramContainer) {
      hologramContainer.classList.add("hologram-active");
    }

    // Update initial song info
    updateSongInfo();

    // Initialize Web Audio API
    setupAudio();

    // Add event listeners
    setupEventListeners();

    // Make functions available to piano
    window.hologramFunctions = {
      togglePlay,
      playNextSong,
      playPreviousSong,
      pulseHologram,
      drawVisualizer,
      toggleHologram,
    };

    // Check if music is already playing from piano keys and update UI
    if (window.mainAudio && !window.mainAudio.paused) {
      const playBtn = document.querySelector(".play-btn");
      if (playBtn) {
        playBtn.classList.add("playing");

        // Toggle Remix icons
        const playIcon = playBtn.querySelector(".ri-play-fill");
        const pauseIcon = playBtn.querySelector(".ri-pause-fill");

        if (playIcon && pauseIcon) {
          playIcon.style.display = "none";
          pauseIcon.style.display = "block";
        }
      }
      window.visualizerActive = true;
      drawVisualizer();
    }
  }

  function createHologramUI() {
    // Find existing hologram components in the HTML
    const hologramContainer = document.querySelector(".hologram-container");

    // If the hologram already exists in the HTML, just use it
    if (hologramContainer) {
      console.log("Using existing hologram from HTML");

      // Update song info
      const songTitle = hologramContainer.querySelector(".song-title");
      const songArtist = hologramContainer.querySelector(".song-artist");

      if (songTitle && songArtist) {
        songTitle.textContent = songLibrary[currentSongIndex].title;
        songArtist.textContent = songLibrary[currentSongIndex].artist;
      }

      // Ensure we have a canvas for the visualizer
      let canvas = hologramContainer.querySelector("#visualizer-canvas");
      if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "visualizer-canvas";
        const hologramContent =
          hologramContainer.querySelector(".hologram-content");
        if (hologramContent) {
          hologramContent.prepend(canvas);
        }
      }

      // Add hand indicator if it doesn't exist
      if (
        !hologramContainer.querySelector(".hand-indicator") &&
        !localStorage.getItem("hologramHandShown")
      ) {
        const handIndicator = document.createElement("div");
        handIndicator.className = "hand-indicator";
        handIndicator.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
            <line x1="16" y1="8" x2="2" y2="22"></line>
            <line x1="17.5" y1="15" x2="9" y2="15"></line>
          </svg>
          <div class="pulse-ring"></div>
        `;

        const hologramProjection = hologramContainer.querySelector(
          ".hologram-projection"
        );
        if (hologramProjection) {
          hologramProjection.appendChild(handIndicator);
        }

        // Set up event listener to remove hand indicator after first interaction
        const playBtn = hologramContainer.querySelector(".play-btn");
        const prevBtn = hologramContainer.querySelector(".prev-btn");
        const nextBtn = hologramContainer.querySelector(".next-btn");

        const removeHandIndicator = () => {
          handIndicator.classList.add("fadeout");
          setTimeout(() => {
            if (handIndicator.parentNode) {
              handIndicator.parentNode.removeChild(handIndicator);
            }
          }, 1000);

          // Clean up event listeners
          if (playBtn)
            playBtn.removeEventListener("click", removeHandIndicator);
          if (prevBtn)
            prevBtn.removeEventListener("click", removeHandIndicator);
          if (nextBtn)
            nextBtn.removeEventListener("click", removeHandIndicator);

          // Store in localStorage that user has seen the indicator
          localStorage.setItem("hologramHandShown", "true");
        };

        // Add event listeners to the buttons
        if (playBtn) playBtn.addEventListener("click", removeHandIndicator);
        if (prevBtn) prevBtn.addEventListener("click", removeHandIndicator);
        if (nextBtn) nextBtn.addEventListener("click", removeHandIndicator);
      }

      return;
    }

    // If we get here, the hologram doesn't exist in the HTML, so we'll print a message
    console.warn(
      "Hologram container not found in HTML. Add it to your HTML for proper functionality."
    );
  }

  function setupAudio() {
    try {
      // Initialize Audio Context
      audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Connect to analyzer
      try {
        // Create analyzer for visualization
        analyzer = audioContext.createAnalyser();
        analyzer.fftSize = 256;

        // We use the analyzer for visualization only
        const tempSource = audioContext.createMediaElementSource(
          window.mainAudio
        );
        tempSource.connect(analyzer);
        tempSource.connect(audioContext.destination);

        // Store the source for later reference
        audioSource = tempSource;
      } catch (err) {
        console.log("Could not connect analyzer:", err);
        // Fallback: just create analyzer without connecting
        analyzer = audioContext.createAnalyser();
        analyzer.fftSize = 256;
      }
    } catch (error) {
      console.error("Audio setup failed:", error);
    }
  }

  function setupEventListeners() {
    const playBtn = document.querySelector(".play-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const hologramProjection = document.querySelector(".hologram-projection");

    if (playBtn) {
      // Remove existing event listeners to prevent duplicates
      playBtn.removeEventListener("click", togglePlay);
      // Add new event listener
      playBtn.addEventListener("click", togglePlay);
      console.log("Play button event listener attached");
    } else {
      console.warn("Play button not found in the DOM");
    }

    if (prevBtn) {
      prevBtn.removeEventListener("click", playPreviousSong);
      prevBtn.addEventListener("click", playPreviousSong);
      console.log("Previous button event listener attached");
    } else {
      console.warn("Previous button not found in the DOM");
    }

    if (nextBtn) {
      nextBtn.removeEventListener("click", playNextSong);
      nextBtn.addEventListener("click", playNextSong);
      console.log("Next button event listener attached");
    } else {
      console.warn("Next button not found in the DOM");
    }

    if (hologramProjection) {
      hologramProjection.addEventListener("click", function (e) {
        // Only trigger pulse effect if user clicks outside buttons
        if (!e.target.closest(".hologram-btn")) {
          pulseHologram();
        }
      });
    }

    // Add window resize handler for canvas
    window.addEventListener("resize", resizeCanvas);

    // Initial canvas setup
    resizeCanvas();

    // Find play/pause icons and ensure they're properly configured
    const playIcon = playBtn?.querySelector(".ri-play-fill");
    const pauseIcon = playBtn?.querySelector(".ri-pause-fill");

    if (playIcon && pauseIcon) {
      // Make sure the correct icon is showing based on play state
      if (window.mainAudio && !window.mainAudio.paused) {
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
        playBtn.classList.add("playing");
      } else {
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
        playBtn.classList.remove("playing");
      }
    }
  }

  // 1. First, modify the togglePlay function in the hologram code:
  function togglePlay() {
    const playBtn = document.querySelector(".play-btn");
    const soundControl = document.querySelector(".sound-control");
    const isMuted = soundControl && soundControl.classList.contains("muted");
    const statusDot = document.querySelector(".status-dot");

    if (!window.mainAudio) {
      console.error("Audio element not found");
      return;
    }

    // Force audio context to resume if suspended
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume();
    }

    // THIS IS CRUCIAL: Sometimes window.mainAudio.paused can be misleading
    // due to promise-based play operations still resolving
    // So check BOTH the paused property AND our global state variable
    const isAudioActuallyPlaying = !window.mainAudio.paused || window.isPlaying;

    console.log("Toggle play - Current state:", {
      audioPaused: window.mainAudio.paused,
      windowIsPlaying: window.isPlaying,
      isAudioActuallyPlaying,
    });

    if (!isAudioActuallyPlaying) {
      // Audio is NOT playing, so let's play it
      if (isMuted) {
        alert("Please unmute the piano to play audio");
        return;
      }

      // Play with better error handling
      window.mainAudio
        .play()
        .then(() => {
          console.log("Audio playback started from hologram");
          window.isPlaying = true;

          // Update UI elements
          if (playBtn) {
            playBtn.classList.add("playing");
            const playIcon = playBtn.querySelector(".ri-play-fill");
            const pauseIcon = playBtn.querySelector(".ri-pause-fill");
            if (playIcon && pauseIcon) {
              playIcon.style.display = "none";
              pauseIcon.style.display = "block";
            }
          }

          // Update piano UI
          if (soundControl) soundControl.classList.add("playing");
          if (statusDot) {
            statusDot.classList.add("playing");
            statusDot.style.opacity = "1";
          }

          // Start visualizer
          window.visualizerActive = true;
          drawVisualizer();
        })
        .catch((error) => {
          console.error("Play failed:", error);
          // Reset state on failure
          window.isPlaying = false;

          // Try again once more
          setTimeout(() => {
            window.mainAudio
              .play()
              .catch((e) => console.error("Retry failed:", e));
          }, 100);
        });
    } else {
      // Audio IS playing, so let's pause it
      window.mainAudio.pause();
      window.isPlaying = false;
      console.log("Audio playback paused from hologram");

      // Show header when music is paused
      const header = document.getElementById("header");
      if (header) {
        header.style.transform = "translateY(0)";
      }

      // Update UI elements
      if (playBtn) {
        playBtn.classList.remove("playing");
        const playIcon = playBtn.querySelector(".ri-play-fill");
        const pauseIcon = playBtn.querySelector(".ri-pause-fill");
        if (playIcon && pauseIcon) {
          playIcon.style.display = "block";
          pauseIcon.style.display = "none";
        }
      }

      // Update piano UI
      if (soundControl) soundControl.classList.remove("playing");
      if (statusDot) {
        statusDot.classList.remove("playing");
        statusDot.style.opacity = "0.5";
      }

      window.visualizerActive = false;
    }
  }

  function playPreviousSong() {
    currentSongIndex =
      (currentSongIndex - 1 + songLibrary.length) % songLibrary.length;
    changeSong();
  }

  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songLibrary.length;
    changeSong();
  }

  function changeSong() {
    if (!window.mainAudio) return;

    const wasPlaying = !window.mainAudio.paused;

    // Update audio source
    window.mainAudio.src = songLibrary[currentSongIndex].file;

    // Reset to beginning of new song
    window.mainAudio.currentTime = 0;

    // Update UI
    updateSongInfo();
    pulseHologram();

    // If it was playing, continue playing the new song from the beginning
    if (wasPlaying) {
      window.mainAudio
        .play()
        .then(() => {
          // Update visualizer for new song style
          if (window.visualizerActive) {
            drawVisualizer();
          }
        })
        .catch((error) => {
          console.error("Song change failed:", error);
        });
    }
  }

  function updateSongInfo() {
    const songTitle = document.querySelector(".song-title");
    const songArtist = document.querySelector(".song-artist");

    if (songTitle && songArtist) {
      // Add changing class for animation
      const songInfo = document.querySelector(".song-info");
      if (songInfo) songInfo.classList.add("changing");

      setTimeout(() => {
        songTitle.textContent = songLibrary[currentSongIndex].title;
        songArtist.textContent = songLibrary[currentSongIndex].artist;
        if (songInfo) songInfo.classList.remove("changing");
      }, 250);
    }
  }

  function toggleHologram() {
    hologramActive = !hologramActive;
    const hologramContainer = document.querySelector(".hologram-container");

    if (hologramContainer) {
      hologramContainer.classList.toggle("hologram-active", hologramActive);

      // Add pulse effect instead of position change
      if (hologramActive) {
        pulseHologram();
      } else {
        // Just animate opacity without changing position
        hologramContainer.style.opacity = "0.7";
        setTimeout(() => {
          if (hologramContainer) {
            hologramContainer.style.opacity = "";
          }
        }, 300);
      }
    }
  }

  function activateHologram() {
    hologramActive = true;
    const hologramContainer = document.querySelector(".hologram-container");

    if (hologramContainer) {
      hologramContainer.classList.add("hologram-active");
    }
  }

  function pulseHologram() {
    const hologramProjection = document.querySelector(".hologram-projection");

    if (hologramProjection) {
      // Use dynamic theme color
      const themeColors = window.getPianoThemeColors
        ? window.getPianoThemeColors()
        : { r: 215, g: 119, b: 6 };
      hologramProjection.style.boxShadow = `0 0 60px rgba(${themeColors.r}, ${themeColors.g}, ${themeColors.b}, 0.8)`;

      setTimeout(() => {
        hologramProjection.style.boxShadow = "";
      }, 300);
    }
  }

  function resizeCanvas() {
    const canvas = document.getElementById("visualizer-canvas");
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }

  function drawVisualizer() {
    if (!window.visualizerActive) {
      console.log("Visualizer not active, skipping draw");
      return;
    }

    if (!analyzer) {
      console.warn("Audio analyzer not available");
      return;
    }

    const canvas = document.getElementById("visualizer-canvas");
    if (!canvas) {
      console.warn("Visualizer canvas not found");
      return;
    }

    console.log("Starting visualizer on canvas:", canvas.id);

    // Make sure canvas dimensions are set correctly
    resizeCanvas();

    const ctx = canvas.getContext("2d");
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    function animate() {
      if (!window.visualizerActive) {
        console.log("Visualizer stopped");
        return; // Stop animation when not active
      }

      requestAnimationFrame(animate);

      try {
        analyzer.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        // Choose visualization based on current song
        const visType = songLibrary[currentSongIndex].visualizer;
        // Use dynamic theme color instead of hardcoded song color
        const themeColors = window.getPianoThemeColors
          ? window.getPianoThemeColors()
          : { r: 215, g: 119, b: 6 };
        const color = `rgb(${themeColors.r}, ${themeColors.g}, ${themeColors.b})`;

        if (visType === "bars") {
          drawBars(dataArray, bufferLength, WIDTH, HEIGHT, ctx, color);
        } else if (visType === "circle") {
          drawCircle(dataArray, bufferLength, WIDTH, HEIGHT, ctx, color);
        } else {
          // Default to wave
          drawWave(dataArray, bufferLength, WIDTH, HEIGHT, ctx, color);
        }
      } catch (error) {
        console.error("Error in visualizer animation:", error);
      }
    }

    // Start the animation
    animate();
    console.log("Visualizer animation started");
  }

  function drawWave(dataArray, bufferLength, WIDTH, HEIGHT, ctx, color) {
    const sliceWidth = WIDTH / bufferLength;
    let x = 0;

    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, HEIGHT / 2);

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * HEIGHT) / 2;

      ctx.lineTo(x, y);
      x += sliceWidth;
    }

    ctx.lineTo(WIDTH, HEIGHT / 2);
    ctx.stroke();

    // Mirror the wave
    ctx.beginPath();
    ctx.moveTo(0, HEIGHT / 2);
    x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = HEIGHT - (v * HEIGHT) / 2;

      ctx.lineTo(x, y);
      x += sliceWidth;
    }

    ctx.lineTo(WIDTH, HEIGHT / 2);
    ctx.stroke();
  }

  function drawBars(dataArray, bufferLength, WIDTH, HEIGHT, ctx, color) {
    const barWidth = (WIDTH / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * HEIGHT;

      // Create gradient for each bar
      const gradient = ctx.createLinearGradient(
        0,
        HEIGHT,
        0,
        HEIGHT - barHeight
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.1)");
      gradient.addColorStop(1, color);

      ctx.fillStyle = gradient;
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
      if (x > WIDTH) break;
    }
  }

  function drawCircle(dataArray, bufferLength, WIDTH, HEIGHT, ctx, color) {
    const centerX = WIDTH / 2;
    const centerY = HEIGHT / 2;
    const radius = Math.min(WIDTH, HEIGHT) / 4;

    // Draw base circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = `${color}40`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw frequency paths
    const step = (Math.PI * 2) / (bufferLength / 4);
    let angle = 0;

    for (let i = 0; i < bufferLength; i += 4) {
      const value = dataArray[i] / 255;
      const outerRadius = radius + value * radius;

      const x = centerX + Math.cos(angle) * outerRadius;
      const y = centerY + Math.sin(angle) * outerRadius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);

      const alpha = 0.3 + value * 0.7;
      ctx.strokeStyle = `${color}${Math.floor(alpha * 255)
        .toString(16)
        .padStart(2, "0")}`;
      ctx.lineWidth = 2;
      ctx.stroke();

      angle += step;
    }
  }

  // Make functions available globally for external access
  window.hologramFunctions = {
    togglePlay,
    playNextSong,
    playPreviousSong,
    pulseHologram,
    drawVisualizer,
    toggleHologram,
  };

  // Auto-start visualizer if audio is already playing
  if (window.mainAudio && !window.mainAudio.paused) {
    window.visualizerActive = true;
    setTimeout(drawVisualizer, 100);
  }
});

/*=============== LOGO LOOP INFINITE SCROLL (robust) ===============*/
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("logo-track");
  const container = document.querySelector(".logo-loop-container");

  if (!track || !container) return;

  // Ensure the element has the class your CSS expects
  if (!track.classList.contains("logo-loop-track")) {
    track.classList.add("logo-loop-track");
  }

  // Helper: wait for all images inside the track to finish loading
  const waitForImages = () => {
    const imgs = Array.from(track.querySelectorAll("img"));
    if (imgs.length === 0) return Promise.resolve();
    return Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((res) =>
              img.addEventListener("load", res, { once: true })
            )
      )
    );
  };

  // Duplicate/cloning logic (safer than innerHTML duplication)
  const ensureDuplicated = () => {
    if (track.dataset.duplicated === "true") return;

    const originalChildren = Array.from(track.children);

    // Clone children ONCE to create seamless loop
    // This makes the track exactly 200% of original width
    // Animation will translate -50% which is exactly one set
    originalChildren.forEach((child) => {
      track.appendChild(child.cloneNode(true));
    });

    track.dataset.duplicated = "true";
  };

  // Compute animation duration based on pixel speed
  const setScrollDuration = (speed = 150) => {
    // track.scrollWidth is total width (two sets after duplication)
    const oneSetWidth = track.scrollWidth / 2;
    // guard for extremely small widths
    const duration = Math.max(4, oneSetWidth / speed);

    // Set CSS custom properties for pixel-perfect animation
    track.style.setProperty("--track-width", `-${oneSetWidth}px`);
    track.style.animationDuration = `${duration}s`;
  };

  // Initialize after images ready
  waitForImages().then(() => {
    ensureDuplicated();
    // Allow layout to settle (usually not necessary but safe)
    requestAnimationFrame(() => setScrollDuration(150));
  });

  // Recalculate on resize (throttle)
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Recalculate animation with new dimensions
      setScrollDuration(150);
    }, 120);
  });

  // Initialize spotlight & interaction handlers AFTER duplication so listeners attach to visible items
  // (initLogoSpotlight will query container/track for items)
  // but we must call it AFTER duplication is done above. If duplication hasn't finished yet,
  // it's fine because initLogoSpotlight is called inside it below — see the fallback:
  // If duplication was already done earlier, we still call initLogoSpotlight now.
  initLogoSpotlight();
});

/*=============== LOGO SPOTLIGHT EFFECT (improved) ===============*/
function initLogoSpotlight() {
  const container = document.querySelector(".logo-loop-container");
  const track = document.getElementById("logo-track");
  if (!container || !track) return;

  // Detect hover-capable devices: true => has hover (desktop)
  const hasHover = window.matchMedia("(hover: hover)").matches;

  // Avoid attaching listeners multiple times
  if (container.dataset.spotlightInit === "true") return;
  container.dataset.spotlightInit = "true";

  // Pointer-based click/tap handling (prevents double touch+click)
  let highlightedLogo = null;

  const onPointerUp = (e) => {
    // Only handle primary pointer (avoid right-clicks)
    if (e.button && e.button !== 0) return;

    const item = e.target.closest(".logo-item");
    if (!item) return;

    // Toggle highlight
    if (highlightedLogo === item) {
      item.classList.remove("highlighted");
      track.classList.remove("paused");
      highlightedLogo = null;
    } else {
      if (highlightedLogo) highlightedLogo.classList.remove("highlighted");
      item.classList.add("highlighted");
      track.classList.add("paused");
      highlightedLogo = item;
    }
  };

  // Use pointerup on container to capture both mouse and touch consistently
  container.addEventListener("pointerup", onPointerUp);

  // Desktop-only: global spotlight and card-level mouse move
  if (!hasHover) {
    // touch device — do no further spotlight things
    return;
  }

  // create overlays only once
  if (!container.querySelector(".logo-spotlight-overlay")) {
    const spotlightOverlay = document.createElement("div");
    spotlightOverlay.className = "logo-spotlight-overlay";
    container.appendChild(spotlightOverlay);

    const spotlightFade = document.createElement("div");
    spotlightFade.className = "logo-spotlight-fade";
    container.appendChild(spotlightFade);
  }

  const spotlightFade = container.querySelector(".logo-spotlight-fade");

  // Smoothly set CSS variables
  const moveTo = (x, y) => {
    container.style.setProperty("--x", `${x}px`);
    container.style.setProperty("--y", `${y}px`);
  };

  const handleMove = (e) => {
    const rect = container.getBoundingClientRect();
    moveTo(e.clientX - rect.left, e.clientY - rect.top);
    if (spotlightFade) spotlightFade.style.opacity = "0";
  };
  const handleLeave = () => {
    if (spotlightFade) spotlightFade.style.opacity = "1";
  };

  container.addEventListener("pointermove", handleMove);
  container.addEventListener("pointerleave", handleLeave);

  // Card-level mousemove to update per-card radial spotlight
  const logoItems = Array.from(container.querySelectorAll(".logo-item"));
  logoItems.forEach((item) => {
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.setProperty("--mouse-x", `${x}px`);
      item.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // initialize position
  const rect = container.getBoundingClientRect();
  moveTo(rect.width / 2, rect.height / 2);
}

/*=============== MODERN HEADER SCROLL EFFECT ===============*/
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY >= 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Active link on scroll
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");
    const navLink = document.querySelector(
      ".nav__link[href*=" + sectionId + "]"
    );

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active");
      } else {
        navLink.classList.remove("active");
      }
    }
  });
}

window.addEventListener("scroll", scrollActive);
