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
const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
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
function raduisaddColor(event){
    let gameCard = event.currentTarget;
        gameCard.className += " game_card_active";
}
function raduisremoveColor(event){
    let gameCard = event.currentTarget;
        gameCard.classList.remove("game_card_active");
}