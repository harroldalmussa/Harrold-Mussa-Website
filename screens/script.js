document.addEventListener('DOMContentLoaded', () => {
    const aboutCard = document.getElementById('about-card');
    const aboutMeTriggerBtn = aboutCard.querySelector('.about-me-trigger-btn');
    const closeCardBtn = aboutCard.querySelector('.close-card-btn');
    const aboutLink = document.querySelector('.main-nav a[href="#about-card"]');

    function expandAboutCard() {
        aboutCard.classList.add('is-expanded');
        aboutCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function closeAboutCard() {
        aboutCard.classList.remove('is-expanded');
    }

    if (aboutLink && aboutCard) {
        aboutLink.addEventListener('click', (event) => {
            event.preventDefault();
            expandAboutCard();
        });
    }

    if (aboutMeTriggerBtn) {
        aboutMeTriggerBtn.addEventListener('click', expandAboutCard);
    }

    if (closeCardBtn) {
        closeCardBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            closeAboutCard();
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
    const projectCloseModalBtn = projectModal.querySelector('.close-modal-btn');
    const modalTitle = projectModal.querySelector('.modal-title');
    const modalDescription = projectModal.querySelector('.modal-description');
    const modalTags = projectModal.querySelector('.modal-tags');
    const carouselImagesContainer = projectModal.querySelector('.carousel-images');
    const prevButton = projectModal.querySelector('.carousel-nav.prev');
    const nextButton = projectModal.querySelector('.carousel-nav.next');
    const projectModalBody = projectModal.querySelector('.modal-body');

    let currentImageIndex = 0;
    let currentProjectImages = [];

    // --- Contact Modal Elements ---
    const contactMeCard = document.querySelector('.contact-me-card');
    const contactModal = document.getElementById('contact-modal');
    const contactCloseModalBtn = contactModal.querySelector('.close-modal-btn');
    const contactForm = document.getElementById('contact-form');
    const navContactLink = document.querySelector('.main-nav a[href="#contact-modal"]');


    // Define project data
    const projectsData = {
        konnektsocial: {
            title: 'KonnektSocial',
            description: 'Built a feature-rich social media application designed to facilitate vibrant online communities and foster real-time interaction. The platform includes secure user authentication, instant messaging via Socket.IO, intuitive post creation, engaging "moments" functionality, and efficient friend management. Enhanced with integrated image processing, this project underscores practical experience in delivering a complete, interactive, and visually appealing full-stack solution.',
            tags: ['React Native', 'Node.js', 'PostgreSQL', 'Socket.IO', 'Express.js', 'Bcrypt', 'JWT', 'Multer', 'Sharp'],
            images: [
                '../assets/konnektsocial/konnektsocial-1.png',
                '../assets/konnektsocial/konnektsocial-2.png',
                '../assets/konnektsocial/konnektsocial-3.png',
                '../assets/konnektsocial/konnektsocial-4.png',
                '../assets/konnektsocial/konnektsocial-5.png',
                '../assets/konnektsocial/konnektsocial-6.png',
            ],
            link: 'https://github.com/harroldalmussa/KonnektSocial'
        },
        pocketflow: {
            title: 'PocketFlow',
            description: 'A smart budget tracking application designed to help users manage their finances effectively. It integrates AI-powered insights to provide personalized recommendations and predictive analysis, helping users make informed financial decisions. The project showcases data visualization, machine learning integration, and secure financial data handling.',
            tags: ['Python', 'Flask', 'Machine Learning', 'PostgreSQL', 'SciKit-learn', 'Plotly.js'],
            images: [
                '../assets/pocketflow/example1.png',
                '../assets/pocketflow/example2.png',
                '../assets/pocketflow/example3.png',
                '../assets/pocketflow/example4.png',
                '../assets/pocketflow/example5.png',
                
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

    function showProjectModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;

        modalTags.innerHTML = '';
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

    function showContactModal() {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideContactModal() {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
        contactForm.reset();
    }

    function handleContactFormSubmit(event) {
    event.preventDefault(); 

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const sendMessageBtn = contactForm.querySelector('.send-message-btn');
    const originalBtnText = sendMessageBtn.textContent;
    sendMessageBtn.textContent = 'Sending...';
    sendMessageBtn.disabled = true; 

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let resultJson = await response.json(); 
        if (response.status === 200) {
            alert('Your message has been sent successfully!');
            hideContactModal();
        } else {
            console.error('Web3Forms Error:', resultJson);
            alert('Oops! Something went wrong. Please try again. Message: ' + resultJson.message);
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
        alert('A network error occurred. Please check your internet connection and try again.');
    })
    .finally(() => {
        sendMessageBtn.textContent = originalBtnText; 
        sendMessageBtn.disabled = false; 
        contactForm.reset(); 
    });
}

    // For the main "Contact me" card
    contactMeCard.addEventListener('click', showContactModal);
    if (navContactLink) {
        navContactLink.addEventListener('click', (event) => {
            event.preventDefault();
            showContactModal();
        });
    }

    // For Project Cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (event) => {
            const projectId = card.dataset.project;
            showProjectModal(projectId);
        });
    });

    // For Project Modal
    projectCloseModalBtn.addEventListener('click', hideProjectModal);
    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);
    projectModal.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            hideProjectModal();
        }
    });

    // For Contact Modal
    contactCloseModalBtn.addEventListener('click', hideContactModal);
    contactForm.addEventListener('submit', handleContactFormSubmit);
    contactModal.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            hideContactModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (projectModal.classList.contains('active')) {
                hideProjectModal();
            } else if (contactModal.classList.contains('active')) {
                hideContactModal();
            } else if (aboutCard.classList.contains('is-expanded')) {
                closeAboutCard(); // Close about card on escape
            }
        }
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('card-animate-in');
        }, 100 * index);
    });

});