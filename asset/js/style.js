const CountryFlags = {
    "EGP": "./asset/img/egy.png",
    "US": "./asset/img/us.png"  
};

document.getElementById("country-select").addEventListener("change", function() {
    const selectedCountry = this.value;
    document.getElementById("country-flag").src = CountryFlags[selectedCountry];
});