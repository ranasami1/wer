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
    slidesPerView: 2, // Default for larger screens
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
        history.pushState({}, '', '/SignIn');
        alertMessage.classList.remove("toggle_form");
    } else {
        registerBtn.classList.add("active");
        registerBtn.classList.add("notActive");
        registerForm.classList.remove("toggle_form");
        signForm.classList.add("toggle_form");
        signBtn.classList.add("notActive");
        signBtn.classList.remove("active");
        history.pushState({}, '', '/Register');
        alertMessage.classList.add("toggle_form");
    }
}

function toggleShow(btnId){
  //let showBtn = document.getElementById("more");
  let hiddenData = document.getElementsByClassName("hidden");
  //let visibleData = document.getElementsByClassName("visible");
    if(btnId === "more"){
        hiddenData.classList.add("toggle_form")
    }else{
        console.log("test");
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
