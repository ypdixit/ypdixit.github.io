const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const navLinks = document.querySelectorAll(".navigation a");
const scrollTopButton = document.querySelector("#scroll-top");
const currentYear = document.querySelector("#current-year");
const dialog = document.querySelector("#project-dialog");
const dialogClose = document.querySelector("#dialog-close");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogPoints = document.querySelector("#dialog-points");

currentYear.textContent = new Date().getFullYear();

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("show");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("show");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("main section[id]");

const updateActiveNavigation = () => {
  let current = "home";
  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });

  scrollTopButton.classList.toggle("visible", window.scrollY > 500);
};

window.addEventListener("scroll", updateActiveNavigation);
updateActiveNavigation();

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const projectDetails = {
  transformation: {
    title: "Data Transformation & Automation Concept",
    description:
      "This project explores how a business can move from fragmented information toward a clearer and more reliable workflow. The focus is not automation for its own sake. The goal is to identify where transformation creates useful business value.",
    points: [
      "Mapped the movement from raw information to cleaned and decision-ready data.",
      "Identified repetitive steps that could be standardized or automated.",
      "Considered adoption barriers such as trust, training, data quality, and process ownership.",
      "Presented recommendations in business language rather than only technical language."
    ]
  },
  dashboard: {
    title: "Financial Performance Dashboard",
    description:
      "This portfolio demonstration applies finance knowledge to information design. The dashboard concept prioritizes a small number of decision-relevant measures and presents them in a format that can be scanned quickly.",
    points: [
      "Grouped financial measures into clear performance categories.",
      "Used trend and comparison visuals to make changes easier to interpret.",
      "Designed the page around management questions instead of raw spreadsheet structure.",
      "Focused on readability, hierarchy, and concise communication."
    ]
  },
  customer: {
    title: "Customer Service Process Improvement",
    description:
      "This case uses customer-facing banking experience as the starting point for a practical workflow redesign. It examines where unnecessary repetition can create friction and where human judgment should remain central.",
    points: [
      "Mapped the stages of a typical customer request from intake to follow-up.",
      "Identified moments where repeated questions or unclear handoffs may slow service.",
      "Proposed a simpler information flow while preserving privacy and professional judgment.",
      "Connected process efficiency with the quality of the customer experience."
    ]
  }
};

document.querySelectorAll(".project-details-button").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectDetails[button.dataset.project];
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;
    dialogPoints.innerHTML = project.points.map((point) => `<div>${point}</div>`).join("");
    dialog.showModal();
  });
});

dialogClose.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (clickedOutside) dialog.close();
});
