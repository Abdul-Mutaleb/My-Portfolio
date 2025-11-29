// ===========================
// Testimonials Data
// ===========================
const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        title: "CEO, Tech Startup",
        company: "TechFlow Solutions",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        content: "Working with this developer was a game-changer for our project. The attention to detail and commitment to excellence is unmatched. Highly recommended!",
        rating: 5
    },
    {
        id: 2,
        name: "Marcus Chen",
        title: "Product Manager, Digital Agency",
        company: "Creative Digital Co",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
        content: "Exceptional skills and professionalism. Delivered the project on time and exceeded our expectations. A true professional to work with.",
        rating: 5
    },
    {
        id: 3,
        name: "Emma Williams",
        title: "Founder, E-commerce Platform",
        company: "ShopHub Online",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        content: "Transformed our ideas into a stunning web application. The communication was clear and the results were outstanding. Would definitely hire again!",
        rating: 5
    },
    {
        id: 4,
        name: "David Rodriguez",
        title: "CTO, Financial Services",
        company: "FinanceCore Systems",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        content: "The developer's technical expertise and problem-solving abilities are impressive. Delivered a robust and scalable solution for our needs.",
        rating: 5
    },
    {
        id: 5,
        name: "Lisa Anderson",
        title: "Marketing Director, SaaS",
        company: "CloudBase Analytics",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
        content: "Best investment we made for our platform. The code quality and performance improvements were remarkable. Truly talented!",
        rating: 5
    }
];

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Navbar Active Link
// ===========================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}
updateActiveNavLink();

// ===========================
// Testimonials Carousel
// ===========================
class TestimonialsCarousel {
    constructor(testimonials) {
        this.testimonials = testimonials;
        this.currentIndex = 0;
        this.isAutoPlay = true;
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        this.renderTestimonial();
        this.renderDotsAndGrid();
        this.attachEventListeners();
        this.startAutoPlay();
    }

    renderTestimonial() {
        const testimonial = this.testimonials[this.currentIndex];
        const card = document.getElementById('testimonialCard');

        const starsHTML = Array.from({ length: testimonial.rating }, () =>
            '<i class="fas fa-star"></i>'
        ).join('');

        card.innerHTML = `
            <div class="stars mb-4">
                ${starsHTML}
            </div>
            <p class="testimonial-text">"${testimonial.content}"</p>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="${testimonial.name}" class="author-image">
                <div class="author-info">
                    <h5>${testimonial.name}</h5>
                    <p>${testimonial.title}</p>
                    <p>${testimonial.company}</p>
                </div>
            </div>
        `;

        this.updateActiveDot();
        this.updateGridSelection();
    }

    renderDotsAndGrid() {
        const dotsContainer = document.getElementById('dotsContainer');
        const gridContainer = document.getElementById('testimonialsGrid');

        // Dots
        dotsContainer.innerHTML = this.testimonials.map((_, idx) =>
            `<button class="dot ${idx === this.currentIndex ? 'active' : ''}" data-index="${idx}"></button>`
        ).join('');

        // Grid
        gridContainer.innerHTML = this.testimonials.map((t, idx) => `
            <div class="col-lg-4 col-md-6">
                <div class="testimonial-item ${idx === this.currentIndex ? 'active' : ''}" data-index="${idx}">
                    <div class="testimonial-item-header">
                        <img src="${t.image}" alt="${t.name}" class="testimonial-item-img">
                        <div>
                            <p class="testimonial-item-name">${t.name}</p>
                            <p class="testimonial-item-company">${t.company}</p>
                        </div>
                    </div>
                    <div class="stars">
                        ${Array.from({ length: t.rating }, () => '<i class="fas fa-star"></i>').join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    attachEventListeners() {
        // Dots click
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', () => {
                this.currentIndex = parseInt(dot.dataset.index);
                this.isAutoPlay = false;
                this.stopAutoPlay();
                this.renderTestimonial();
            });
        });

        // Grid click
        document.querySelectorAll('.testimonial-item').forEach(item => {
            item.addEventListener('click', () => {
                this.currentIndex = parseInt(item.dataset.index);
                this.isAutoPlay = false;
                this.stopAutoPlay();
                this.renderTestimonial();
            });
        });

        // Prev/Next buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
        if (nextBtn) nextBtn.addEventListener('click', () => this.next());

        // Pause on hover
        const nav = document.querySelector('.carousel-nav');
        if (nav) {
            nav.addEventListener('mouseenter', () => this.stopAutoPlay());
            nav.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }

    updateActiveDot() {
        document.querySelectorAll('.dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === this.currentIndex);
        });
    }

    updateGridSelection() {
        document.querySelectorAll('.testimonial-item').forEach((item, idx) => {
            item.classList.toggle('active', idx === this.currentIndex);
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.renderTestimonial();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.renderTestimonial();
    }

    startAutoPlay() {
        this.isAutoPlay = true;
        if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = setInterval(() => {
            if (this.isAutoPlay) this.next();
        }, 5000);
    }

    stopAutoPlay() {
        this.isAutoPlay = false;
        if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsCarousel(testimonials);
});

// Resume autoplay on mouse leave
document.querySelector('.carousel-nav').addEventListener('mouseenter', () => {
    carousel.isAutoPlay = false;
});

document.querySelector('.carousel-nav').addEventListener('mouseleave', () => {
    carousel.isAutoPlay = true;
});

// ===========================
// Contact Form Handling
// ===========================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulate form submission
    console.log('Form submitted:', { name, email, message });

    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';

    // Reset form
    this.reset();

    // Hide success message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
});

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe elements for animation on scroll
document.querySelectorAll('.skill-card, .project-card, .contact-card, .stat-card, .highlight-card, .about-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===========================
// Mobile Menu Close on Link Click
// ===========================
const navbarCollapse = document.querySelector('.navbar-collapse');
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: true
        });
    });
});

// ===========================
// Progress Bar Animation on Scroll
// ===========================
const skillObserverOptions = {
    threshold: 0.5
};

const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, skillObserverOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// ===========================
// Header Scroll Effect
// ===========================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop;
});

// ===========================
// Initialization
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
});
 
window.onload = function() {
        // Reset the form fields when the page loads
        document.getElementById("form").reset();
    };