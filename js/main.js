/* =========================================
   JAVASCRIPT ΓΙΑ ΤΟ HLEKTROLOGOS WEBSITE
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------
       1. MOBILE HAMBURGER MENU TOGGLE
       ----------------------------------------- */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.desktop-nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Κλείσιμο του μενού αυτόματα όταν ο χρήστης πατάει κάποιο link
        document.querySelectorAll('.desktop-nav a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    /* -----------------------------------------
       2. ACTIVE LINK HIGHLIGHT ON SCROLL
       ----------------------------------------- */
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a');

    window.addEventListener('scroll', () => {
        let currentScrollPos = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (currentScrollPos >= sectionTop && currentScrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });


    /* =========================================
       INTERACTIVE FORM FEEDBACK & FORMSPREE AJAX
       ========================================= */
const contactForm = document.querySelector('.footer-form');
const successMsg = document.querySelector('.form-success-msg');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Αποτρέπουμε την ανανέωση της σελίδας

        const formData = new FormData(contactForm);
        const formspreeUrl = "https://formspree.io/f/xppawpjq"; 

        try {
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'json'
                }
            });

            if (response.ok) {
                // Επιτυχία! Καθαρίζουμε τη φόρμα και εμφανίζουμε το μήνυμα
                contactForm.reset();
                if (successMsg) {
                    successMsg.style.display = 'block';
                    setTimeout(() => {
                        successMsg.style.display = 'none'; // Το κρύβει αυτόματα μετά από 6 δευτερόλεπτα
                    }, 6000);
                }
            } else {
                alert('Υπήρξε ένα πρόβλημα στην αποστολή. Παρακαλώ δοκιμάστε ξανά.');
            }
        } catch (error) {
            alert('Σφάλμα σύνδεσης. Ελέγξτε τη σύνδεσή σας στο internet.');
        }
    });
}

});