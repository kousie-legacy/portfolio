/**
 * KOUSIELEGACY PORTFOLIO — INTERACTIVE FEATURES
 * 1. Mobile navigation
 * 2. Scroll reveal animations
 * 3. Project category filtering
 * 4. Image fallback handling
 * 5. Contact form delivery via FormSubmit
 */

'use strict';

// Replace this address with your own email before publishing.
const CONTACT_EMAIL = 'azevillacorta@gmail.com';

/** Run the website features after the HTML has loaded. */
document.addEventListener('DOMContentLoaded', function () {
    initializeMobileNavigation();
    initializeRevealAnimations();
    initializeProjectFilters();
    initializeImageFallbacks();
    initializeContactForm();
    initializeFooter();
});

/** Open or close the navigation on small screens. */
function initializeMobileNavigation() {
    const menuButton = document.querySelector('.menu-toggle');
    const navigationLinks = document.querySelector('.nav-links');

    if (!menuButton || !navigationLinks) {
        return;
    }

    menuButton.addEventListener('click', function () {
        const isOpen = navigationLinks.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    navigationLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navigationLinks.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Open menu');
        });
    });
}

/** Animate elements when they enter the viewport. */
function initializeRevealAnimations() {
    const elements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    document.documentElement.classList.add('js-ready');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    elements.forEach(function (element) {
        observer.observe(element);
    });
}

/** Show projects based on the selected category. */
function initializeProjectFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const selectedCategory = button.dataset.filter;

            buttons.forEach(function (otherButton) {
                const isSelected = otherButton === button;
                otherButton.classList.toggle('active', isSelected);
                otherButton.setAttribute('aria-pressed', String(isSelected));
            });

            cards.forEach(function (card) {
                const matchesCategory = selectedCategory === 'all' ||
                    card.dataset.category === selectedCategory;
                card.hidden = !matchesCategory;
            });
        });
    });
}

/** Display a helpful placeholder when a local image is missing. */
function initializeImageFallbacks() {
    const images = document.querySelectorAll('.portrait-image, .project-image');

    images.forEach(function (image) {
        function showPlaceholder() {
            const imageContainer = image.parentElement;
            imageContainer.classList.add('image-missing');
        }

        image.addEventListener('error', showPlaceholder);

        if (image.complete && image.naturalWidth === 0) {
            showPlaceholder();
        }
    });
}

/** Contact form uses standard HTML POST to FormSubmit.
 * Do not prevent the default submission here.
 * The browser validates required fields before sending.
 */
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function () {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton && form.checkValidity()) {
            submitButton.textContent = 'Sending...';
        }
        // Browser submits to the form action; no preventDefault().
    });
}

/** Keep the copyright year current. */
function initializeFooter() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = String(new Date().getFullYear());
    }
}

function initializeBackToTop() {
    const backToTopLink = document.querySelector(".back-top");

    if (!backToTopLink) {
        return;
    }

    backToTopLink.addEventListener("click", function (event) {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    });
}