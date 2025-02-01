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
    let gameList = container.querySelector("#hidden"); // Get the related hidden list

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
        this.visitedLinks = new Set();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.querySelectorAll('.dropdown-wrapper').forEach(wrapper => {
            wrapper.addEventListener('click', (e) => {
                const linkText = wrapper.querySelector('.nav-link').textContent.trim();
                this.markAsVisited(linkText);
                // Prevent navigation
                e.preventDefault();
                e.stopPropagation();
            });
            
            wrapper.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const parentLink = wrapper.querySelector('.nav-link').textContent.trim();
                    const childLink = item.textContent.trim();
                    
                    // Mark parent as visited
                    this.markAsVisited(parentLink);
                    // Mark child as visited
                    this.markAsVisited(childLink);
                    // Update path
                    this.updatePath([parentLink, childLink]);
                    
                    // Prevent navigation
                    e.preventDefault();
                    e.stopPropagation();
                });
            });
        });
    }

    markAsVisited(text) {
        if (!this.visitedLinks.has(text)) {
            this.visitedLinks.add(text);
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

        // Update the page title with the last visited link
        this.updatePageTitle(text);

        // Mark corresponding dropdown wrapper as visited
        const wrapper = document.querySelector(`.dropdown-wrapper [href="#"]:contains("${text}")`).closest('.dropdown-wrapper');
        if (wrapper) {
            wrapper.classList.add('visited');
        }
    }

    updatePath(pathArray) {
        const breadcrumbList = document.getElementById('breadcrumbList');
        breadcrumbList.innerHTML = '';
        
        pathArray.forEach((item, index) => {
            if (index > 0) {  // Only add separator if not first item
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
        
        // Update the page title with the last visited link
        this.updatePageTitle(pathArray[pathArray.length - 1]);
    }

    updatePageTitle(text) {
        const pageTitle = document.querySelector('.pageTitle');
        if (pageTitle) {
            pageTitle.textContent = text;
        }
    }
}

// Initialize the tracker
const tracker = new LinkTracker();