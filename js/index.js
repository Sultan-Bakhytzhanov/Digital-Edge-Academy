window.addEventListener("scroll", function () {
  let nav = document.querySelector("nav");
  nav.classList.toggle("sticky", window.scrollY > 0);
});

function animateNumbers(element) {
  const target = +element.dataset.target;
  const increment = target / 100;
  let current = 0;

  const updateNumber = () => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
    } else {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateNumber);
    }
  };
  updateNumber();
}

const statsSection = document.getElementById("about");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statsSection.classList.add("visible");
        document.querySelectorAll(".stat-value").forEach(animateNumbers);
        observer.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(statsSection);
