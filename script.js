// Hamburger menu toggle for mobile navigation
function toggleMenu() {
    const nav = document.querySelector('nav[role="navigation"]');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Modal image viewer
function openModal(src, alt) {
    let modal = document.getElementById('image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '9999';
        modal.innerHTML = '<img id="modal-img" style="max-width:90vw; max-height:80vh; border-radius:8px; box-shadow:0 2px 8px #000;" alt=""><button id="close-modal" style="position:absolute;top:30px;right:40px;font-size:2em;background:none;color:#fff;border:none;cursor:pointer;">&times;</button>';
        document.body.appendChild(modal);
        modal.querySelector('#close-modal').onclick = closeModal;
        modal.onclick = function(e) {
            if (e.target === modal) closeModal();
        };
    }
    const img = modal.querySelector('#modal-img');
    img.src = src;
    img.alt = alt;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav[role="navigation"] a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add click event to project images for modal view
    document.querySelectorAll('section#projects img').forEach(function(img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openModal(this.src, this.alt);
        });
    });

    // Real-time feedback for Contact form
    var contactForm = document.querySelector('section#contact form');
    if (contactForm) {
        var name = contactForm.querySelector('#name');
        var email = contactForm.querySelector('#email');
        var message = contactForm.querySelector('#message');

        function showError(input, message) {
            let error = input.nextElementSibling;
            if (!error || !error.classList.contains('input-error')) {
                error = document.createElement('span');
                error.className = 'input-error';
                error.style.color = '#d32f2f';
                error.style.fontSize = '0.95em';
                error.style.display = 'block';
                error.style.marginTop = '0.2em';
                input.parentNode.insertBefore(error, input.nextSibling);
            }
            error.textContent = message;
        }
        function clearError(input) {
            let error = input.nextElementSibling;
            if (error && error.classList.contains('input-error')) {
                error.textContent = '';
            }
        }

        name.addEventListener('input', function() {
            if (!name.value.trim()) {
                showError(name, 'Name is required.');
            } else {
                clearError(name);
            }
        });
        email.addEventListener('input', function() {
            if (!email.value.trim()) {
                showError(email, 'Email is required.');
            } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
                showError(email, 'Please enter a valid email address.');
            } else {
                clearError(email);
            }
        });
        message.addEventListener('input', function() {
            if (!message.value.trim()) {
                showError(message, 'Message is required.');
            } else {
                clearError(message);
            }
        });

        contactForm.addEventListener('submit', function(e) {
            let valid = true;
            if (!name.value.trim()) {
                showError(name, 'Name is required.');
                valid = false;
            }
            if (!email.value.trim()) {
                showError(email, 'Email is required.');
                valid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
                showError(email, 'Please enter a valid email address.');
                valid = false;
            }
            if (!message.value.trim()) {
                showError(message, 'Message is required.');
                valid = false;
            }
            if (!valid) {
                e.preventDefault();
            }
        });
    }
});