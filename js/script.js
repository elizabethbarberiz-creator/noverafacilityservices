/* =========================================
   NOVERA FACILITY SERVICES
   Website Interactions
   ========================================= */

const mobileMenuButton = document.getElementById("mobileMenuButton");
const navMenu = document.getElementById("navMenu");

/* Mobile navigation */
if (mobileMenuButton && navMenu) {
    mobileMenuButton.addEventListener("click", () => {
        const menuIsOpen = navMenu.classList.toggle("open");

        mobileMenuButton.textContent = menuIsOpen ? "✕" : "☰";

        mobileMenuButton.setAttribute(
            "aria-expanded",
            menuIsOpen ? "true" : "false"
        );

        mobileMenuButton.setAttribute(
            "aria-label",
            menuIsOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            mobileMenuButton.textContent = "☰";
            mobileMenuButton.setAttribute("aria-expanded", "false");
            mobileMenuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });
}

/* Header appearance when scrolling */
const siteHeader = document.querySelector(".site-header");

function updateHeader() {
    if (!siteHeader) return;

    if (window.scrollY > 30) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }
}

updateHeader();
window.addEventListener("scroll", updateHeader);

/* Scroll reveal animations */
const revealElements = document.querySelectorAll(
    ".reveal, .card, .feature-card, .process-card, " +
    ".testimonial-card, .contact-card, " +
    ".industry-detail-card, .assessment-benefit"
);

revealElements.forEach((element) => {
    element.classList.add("reveal-item");
});

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("revealed");
    });
}

/* Close the mobile menu when clicking outside it */
document.addEventListener("click", (event) => {
    if (!mobileMenuButton || !navMenu) return;

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedMenuButton = mobileMenuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
        navMenu.classList.remove("open");
        mobileMenuButton.textContent = "☰";
        mobileMenuButton.setAttribute("aria-expanded", "false");
    }
});