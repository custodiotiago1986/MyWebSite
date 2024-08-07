// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const rootElement = document.documentElement;

function handleScroll() {
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (rootElement.scrollTop / scrollTotal > 0.5) {
        scrollToTopBtn.classList.add('showBtn');
    } else {
        scrollToTopBtn.classList.remove('showBtn');
    }
}

function scrollToTop() {
    rootElement.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

scrollToTopBtn.addEventListener('click', scrollToTop);
document.addEventListener('scroll', handleScroll);

// Load projects from JSON based on the current page
// Verifica o parâmetro de consulta ou o nome da página para definir o arquivo JSON correto
const urlParams = new URLSearchParams(window.location.search);
const pageParam = urlParams.get('page');
const currentPage = window.location.pathname.split('/').pop(); // Obtém o nome da página atual
let jsonFile = 'portfolio.json'; // Default to portfolio.json

if (pageParam === 'freela' || currentPage === 'freela.html') {
    jsonFile = 'freela.json';
    console.log(jsonFile);
} else if (pageParam === 'portfolio' || currentPage === 'portfolio.html') {
    jsonFile = 'projects.json';
    console.log(jsonFile);
}

fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = ''; // Clear any existing projects
        data.forEach(project => {
            const projectHTML = `
                <div class="project-container" data-category="${project.category}">
                    <div class="project-card">
                        <a href="${project.link}" target="_blank">
                            <img src="${project.image}" class="card-img-top" alt="${project.title}">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${project.title} <span class="badge ${project.badgeColor}">${project.badge}</span></h5>
                            <p class="card-text">${project.description}</p>
                        </div>
                    </div>
                    <div class="project-description">
                        <p>${project.fullDescription}</p>
                    </div>
                </div>
            `;
            projectsContainer.insertAdjacentHTML('beforeend', projectHTML);
        });
    });

// Project Filter
const filterSelect = document.getElementById('filterProjects');
const projectsContainer = document.getElementById('projects-container');

function filterProjects() {
    const selectedCategory = filterSelect.value;
    const projectContainers = projectsContainer.querySelectorAll('.project-container');
    projectContainers.forEach(container => {
        if (selectedCategory === 'all' || container.dataset.category === selectedCategory) {
            container.style.display = 'flex';
        } else {
            container.style.display = 'none';
        }
    });
}

filterSelect.addEventListener('change', filterProjects);

// Contact form submission
document.getElementById('contactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    let mailtoLink = `mailto:tiagoluis86@outlook.com?subject=Message from ${name}&body=${message} (${email})`;
    window.location.href = mailtoLink;
});