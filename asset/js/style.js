const CountryFlags = {
    "EGP": "./asset/img/egy.png",
    "US": "./asset/img/us.png"  
};

function updateFlag() {
    const selectedCountry = document.getElementById("country-select").value;
    if (CountryFlags[selectedCountry]) {
        document.getElementById("country-flag").src = CountryFlags[selectedCountry] + "?t=" + new Date().getTime();
    } else {
        console.error("Flag not found for country:", selectedCountry);
    }
}
document.getElementById("country-select").addEventListener("change", updateFlag);

//disable refreshing behavior onSubmit
let form = document.querySelector("form"); 
if(form !== null){
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submitted without refreshing the page!');
    });
}

//initialize swiper
let swiper = new Swiper('.wrapper', {
    loop: true,
    slidesPerView: 1, // Default for larger screens
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // When screen width is 768px or less
        768: {
            slidesPerView: 4
        }
    }
});


  
function colorChange(buttonId) {
    let signBtn = document.getElementById("sign");
    let registerBtn = document.getElementById("register");
    let signForm = document.getElementById("signin_form");
    let registerForm = document.getElementById("register_form");
    let alertMessage = document.getElementById("alert");
    
    if (buttonId === "sign") {
        signBtn.classList.add("active");
        signBtn.classList.remove("notActive");
        registerForm.classList.add("toggle_form");
        signForm.classList.remove("toggle_form");
        registerBtn.classList.add("notActive");
        registerBtn.classList.remove("active");
        
        alertMessage.classList.remove("toggle_form");
    } else {
        registerBtn.classList.add("active");
        registerBtn.classList.add("notActive");
        registerForm.classList.remove("toggle_form");
        signForm.classList.add("toggle_form");
        signBtn.classList.add("notActive");
        signBtn.classList.remove("active");
        
        alertMessage.classList.add("toggle_form");
    }
}


function toggleGameList(event) {
    let toggleButton = event.target; // Get the clicked button
    let container = toggleButton.closest(".container"); // Find the nearest parent container
    let gameList = container.querySelector(".hidden"); // Get the related hidden list

    if (gameList.style.height === "0px" || gameList.style.height === "") {
        gameList.style.height = gameList.scrollHeight + "px"; // Expands
        gameList.style.opacity = "1";
        toggleButton.innerHTML = "▲";
    } else {
        gameList.style.height = "0px"; // Collapses
        gameList.style.opacity = "0";
        toggleButton.innerHTML = "▼";
    }
}

class LinkTracker {
    constructor() {
        this.visitedLinks = new Set(JSON.parse(localStorage.getItem('visitedLinks')) || []);
        this.initializeEventListeners();
        this.restoreVisitedLinks();
    }

    initializeEventListeners() {
        document.querySelectorAll('.dropdown-wrapper').forEach(wrapper => {
            wrapper.addEventListener('click', (e) => {
                const linkText = wrapper.querySelector('.nav-link').textContent.trim();
                this.markAsVisited(linkText);
                this.navigateToCategoryPage();
                e.preventDefault();
                e.stopPropagation();
            });

            wrapper.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const parentLink = wrapper.querySelector('.nav-link').textContent.trim();
                    const childLink = item.textContent.trim();
                    
                    this.markAsVisited(parentLink);
                    this.markAsVisited(childLink);
                    this.updatePath([parentLink, childLink]);
                    this.navigateToCategoryPage();
                    
                    e.preventDefault();
                    e.stopPropagation();
                });
            });
        });
    }

    markAsVisited(text) {
        if (!this.visitedLinks.has(text)) {
            this.visitedLinks.add(text);
            localStorage.setItem('visitedLinks', JSON.stringify([...this.visitedLinks]));
            this.updateBreadcrumb(text);
        }
    }

    updateBreadcrumb(text) {
        const breadcrumbItem = document.createElement('a');
        breadcrumbItem.className = 'breadcrumb-item';
        breadcrumbItem.textContent = text;
        
        const separator = document.createElement('span');
        separator.className = 'breadcrumb-separator';
        separator.textContent = '/';
        
        const breadcrumbList = document.getElementById('breadcrumbList');
        breadcrumbList.appendChild(separator);
        breadcrumbList.appendChild(breadcrumbItem);

        this.updatePageTitle(text);
    }

    updatePath(pathArray) {
        const breadcrumbList = document.getElementById('breadcrumbList');
        breadcrumbList.innerHTML = '';
        
        pathArray.forEach((item, index) => {
            if (index >= 0) {
                const separator = document.createElement('span');
                separator.className = 'breadcrumb-separator';
                separator.textContent = '/';
                breadcrumbList.appendChild(separator);
            }
            
            const breadcrumbItem = document.createElement('a');
            breadcrumbItem.className = 'breadcrumb-item';
            breadcrumbItem.textContent = item;
            breadcrumbList.appendChild(breadcrumbItem);
        });
        
        this.updatePageTitle(pathArray[pathArray.length - 1]);
    }

    updatePageTitle(text) {
        const pageTitle = document.querySelector('.pageTitle');
        if (pageTitle) {
            pageTitle.textContent = text;
        }
    }

    navigateToCategoryPage() {
        if (!window.location.href.includes('category.html')) {
            window.location.href = 'category.html';
        }
    }

    restoreVisitedLinks() {
        this.visitedLinks.forEach(link => {
            this.updateBreadcrumb(link);
        });
    }
}

const tracker = new LinkTracker();
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))