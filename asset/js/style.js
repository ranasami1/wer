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
const form = document.querySelector("form"); 
form.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form submitted without refreshing the page!');
});
//initialize swiper
const swiper = new Swiper('slider-wrapper', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });
