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