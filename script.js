document.addEventListener('DOMContentLoaded', function() {
    // ===== LOADING SCREEN =====
    const loadingScreen = document.querySelector('.loading-screen');

    function fadeOutLoadingScreen() {
        loadingScreen.classList.add('fade-out');
        loadingScreen.addEventListener('transitionend', () => {
            document.body.classList.remove('loading'); // Optional: remove class to prevent conflicts.
        }, { once: true }); // Ensures the listener only runs once.
    }

    // Simulate a loading delay (remove or adjust in production)
    setTimeout(fadeOutLoadingScreen, 1500);


    // ===== HEADER =====
    const header = document.querySelector('header');

    function updateHeaderOnScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeaderOnScroll);



    // ===== HAMBURGER MENU =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }));



    // ===== TYPING ANIMATION =====
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = ["Data Analyst", "Problem Solver", "Critical Thinker", "Innovator"];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing animation on load
    setTimeout(type, 2000);



    // ===== REVEAL ANIMATION =====
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");

        for (let i = 0; i < reveals.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = reveals[i].getBoundingClientRect().top;
            let elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            }
        }
    }

    window.addEventListener("scroll", reveal);

    // Initial call to reveal to show elements that are already in the viewport on page load.
    reveal();



    // ===== PROGRESS BAR & BACK TO TOP =====
    const progressBar = document.querySelector('.progress-bar');
    const backToTopButton = document.querySelector('.back-to-top');

    function updateProgressBar() {
        let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (windowScroll / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';

        // Show/hide back to top button
        if (windowScroll > 300) {
            backToTopButton.style.opacity = 1;
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = 0;
            backToTopButton.style.visibility = 'hidden';
        }
    }

    window.addEventListener('scroll', updateProgressBar);

    backToTopButton.addEventListener('click', () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

    // ===== CONTACT FORM SUBMISSION (Example - Requires Server-Side Implementation) =====
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        //Basic validation, more robust validation may be needed
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if(!name || !email || !message) {
            alert("Please fill out all fields.");
            return;
        }
        //You would typically send the data using AJAX or fetch here.
        //Example (using fetch - replace with your actual endpoint):
        fetch('your-api-endpoint', { //Replace 'your-api-endpoint'
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, email: email, message: message }),
        })
        .then(response => {
            if(response.ok) {
                alert('Message sent successfully!');
                contactForm.reset(); //Clear form on success
            } else {
                alert('Message sending failed.  Please try again later.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    });

    // ===== ACTIVE LINK HIGHLIGHTING (using Intersection Observer) =====

    const sections = document.querySelectorAll('section'); // Get all sections
    const navLinksAll = document.querySelectorAll('.nav-link'); // Get all nav links

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get the ID of the intersecting section
                    const id = entry.target.id;

                    // Remove 'active' class from all links
                    navLinksAll.forEach(link => {
                        link.classList.remove('active');
                    });

                    // Add 'active' class to the corresponding link
                    const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
                    if (correspondingLink) {
                        correspondingLink.classList.add('active');
                    }
                }
            });
        },
        {
            threshold: 0.5  // Adjust threshold as needed
        }
    );

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
});