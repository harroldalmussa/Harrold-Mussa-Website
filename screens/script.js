document.addEventListener('DOMContentLoaded', () => {
    const flipCard = document.querySelector('.portrait-card-wrapper');

    if (flipCard) {
        flipCard.addEventListener('click', () => {
            flipCard.classList.toggle('is-flipped');
        });
    }

    const aboutLink = document.querySelector('.main-nav a[href="#about"]');
    if (aboutLink && flipCard) {
        aboutLink.addEventListener('click', (event) => {
            event.preventDefault();
            flipCard.classList.add('is-flipped');
            flipCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    const flipBackBtn = document.querySelector('.portrait-card-back');
    if (flipBackBtn && flipCard) {
        flipBackBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            if (flipCard.classList.contains('is-flipped')) {
                flipCard.classList.remove('is-flipped');
            }
        });
    }

    const projectsLink = document.querySelector('.main-nav a[href="#work"]');
    const firstProjectCard = document.querySelector('.project-card');

    if (projectsLink && firstProjectCard) {
        projectsLink.addEventListener('click', (event) => {
            event.preventDefault();
            firstProjectCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // --- Project Modal Elements ---
    const projectModal = document.getElementById('project-modal');
    const projectCloseModalBtn = projectModal.querySelector('.close-modal-btn'); // Renamed to avoid conflict
    const modalTitle = projectModal.querySelector('.modal-title');
    const modalDescription = projectModal.querySelector('.modal-description');
    const modalTags = projectModal.querySelector('.modal-tags');
    const carouselImagesContainer = projectModal.querySelector('.carousel-images');
    const prevButton = projectModal.querySelector('.carousel-nav.prev');
    const nextButton = projectModal.querySelector('.carousel-nav.next');
    const projectModalBody = projectModal.querySelector('.modal-body'); // Get body for project modal link button

    let currentImageIndex = 0;
    let currentProjectImages = [];

    // --- Contact Modal Elements ---
    const contactMeCard = document.querySelector('.contact-me-card');
    const contactModal = document.getElementById('contact-modal');
    const contactCloseModalBtn = contactModal.querySelector('.close-modal-btn'); // Renamed to avoid conflict
    const contactForm = document.getElementById('contact-form');


    // Define project data (unchanged, but now with link property)
    const projectsData = {
        konnektsocial: {
            title: 'KonnektSocial',
            description: 'Built a feature-rich social media application designed to facilitate vibrant online communities and foster real-time interaction. The platform includes secure user authentication, instant messaging via Socket.IO, intuitive post creation, engaging "moments" functionality, and efficient friend management. Enhanced with integrated image processing, this project underscores practical experience in delivering a complete, interactive, and visually appealing full-stack solution.',
            tags: ['React Native', 'Node.js', 'PostgreSQL', 'Socket.IO', 'Express.js', 'Bcrypt', 'JWT', 'Multer', 'Sharp'],
            images: [
                './assets/konnektsocial/konnektsocial-1.png', // Changed to relative path
                './assets/konnektsocial/konnektsocial-2.png',
                './assets/konnektsocial/konnektsocial-3.png',
                './assets/konnektsocial/konnektsocial-4.png',
                './assets/konnektsocial/konnektsocial-5.png',
                './assets/konnektsocial/konnektsocial-6.png',
            ],
            link: 'https://github.com/harroldalmussa/KonnektSocial'
        },
        pocketflow: {
            title: 'PocketFlow',
            description: 'A smart budget tracking application designed to help users manage their finances effectively. It integrates AI-powered insights to provide personalized recommendations and predictive analysis, helping users make informed financial decisions. The project showcases data visualization, machine learning integration, and secure financial data handling.',
            tags: ['Python', 'Flask', 'Machine Learning', 'PostgreSQL', 'SciKit-learn', 'Plotly.js'],
            images: [
                './assets/pocketflow/pocketflow-1.jpg',
                './assets/pocketflow/pocketflow-2.jpg',
            ],
            link: 'https://github.com/your-username/pocketflow'
        },
        ecommerce: {
            title: 'E-commerce Clone',
            description: 'A modern full-stack e-commerce platform built to replicate a popular online store. It features a responsive design, product listings, shopping cart functionality, secure payment processing with Stripe, and content management via Sanity.io. This project emphasizes performance optimization, secure transactions, and a seamless user experience.',
            tags: ['Next.js', 'Stripe API', 'Sanity.io', 'Tailwind CSS', 'React', 'Node.js'],
            images: [
                './assets/ecommerce/ecommerce-1.jpg',
                './assets/ecommerce/ecommerce-2.jpg',
            ],
            link: 'https://github.com/your-username/ecommerce-clone'
        }
    };


    // --- Project Modal Functions ---
    function showProjectModal(projectId) { // Removed clickedCard param as it's not used
        const project = projectsData[projectId];
        if (!project) return;

        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;

        modalTags.innerHTML = ''; // Clear previous tags
        project.tags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag;
            modalTags.appendChild(span);
        });

        currentProjectImages = project.images;
        currentImageIndex = 0;
        carouselImagesContainer.innerHTML = '';
        currentProjectImages.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = project.title + ' screenshot';
            carouselImagesContainer.appendChild(img);
        });
        updateCarousel();

        // Add project link if available
        // Remove existing button before adding new one for consistency
        const existingLinkBtn = projectModalBody.querySelector('.project-link-btn');
        if (existingLinkBtn) {
            existingLinkBtn.remove();
        }
        if (project.link) {
            const linkBtn = document.createElement('a');
            linkBtn.href = project.link;
            linkBtn.target = '_blank';
            linkBtn.rel = 'noopener noreferrer';
            linkBtn.className = 'project-link-btn';
            linkBtn.textContent = 'View on GitHub';
            projectModalBody.appendChild(linkBtn);
        }

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideProjectModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
        // Clean up project-specific elements when closing the modal
        const existingLinkBtn = projectModalBody.querySelector('.project-link-btn');
        if (existingLinkBtn) {
            existingLinkBtn.remove();
        }
    }

    function updateCarousel() {
        if (currentProjectImages.length > 0) {
            const offset = -currentImageIndex * 100;
            carouselImagesContainer.style.transform = `translateX(${offset}%)`;
            prevButton.style.display = currentImageIndex > 0 ? 'block' : 'none';
            nextButton.style.display = currentImageIndex < currentProjectImages.length - 1 ? 'block' : 'none';
        } else {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }
    }

    function nextImage() {
        if (currentImageIndex < currentProjectImages.length - 1) {
            currentImageIndex++;
            updateCarousel();
        }
    }

    function prevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateCarousel();
        }
    }

    // --- Contact Modal Functions ---
    function showContactModal() {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideContactModal() {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
        contactForm.reset(); // Clear the form when closing
    }

    function handleContactFormSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(contactForm);
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');

        // Basic validation
        if (!email || !message) {
            alert('Please enter your email and message.');
            return;
        }

        // --- Placeholder for actual backend submission ---
        console.log('Contact Form Submitted:');
        console.log('Email:', email);
        console.log('Phone:', phone || 'N/A');
        console.log('Message:', message);

        // In a real application, you would send this data to your backend server
        // using fetch() or XMLHttpRequest.
        // Example:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, phone, message }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Your message has been sent!');
            hideContactModal();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to send message. Please try again later.');
        });
        */
        // For now, just show an alert and close the modal
        alert('Your message has been sent! (Backend integration needed)');
        hideContactModal();
    }


    // --- Event Listeners ---

    // Event Listener for the main "Contact me" card
    contactMeCard.addEventListener('click', showContactModal);

    // Event Listeners for Project Cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (event) => {
            const projectId = card.dataset.project;
            showProjectModal(projectId);
        });
    });

    // Event Listeners for Project Modal
    projectCloseModalBtn.addEventListener('click', hideProjectModal);
    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);
    projectModal.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            hideProjectModal();
        }
    });

    // Event Listeners for Contact Modal
    contactCloseModalBtn.addEventListener('click', hideContactModal);
    contactForm.addEventListener('submit', handleContactFormSubmit);
    contactModal.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            hideContactModal();
        }
    });


    // Global Escape key listener for both modals
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (projectModal.classList.contains('active')) {
                hideProjectModal();
            } else if (contactModal.classList.contains('active')) {
                hideContactModal();
            }
        }
    });

    // Animate cards on load
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('card-animate-in');
        }, 100 * index); // Staggered delay
    });

});