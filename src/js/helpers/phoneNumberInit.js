import intlTelInput from 'intl-tel-input';
import IMask from 'imask';

// CHANGE THE OUTPUT COUNTRIES NAME IN THE DROPDOWN LIST
// IMPORTANT: DO IT BEFORE INITIALIZATION
let countryData = window.intlTelInputGlobals.getCountryData();
for (let i = 0; i < countryData.length; i++) {
  var country = countryData[i];
  country.name = country.name.replace(/.+\((.+)\)/, "$1");
}


// --------------------------------------------------------------
// INITIALISATION
export const itiInit = (elem) => {
  return intlTelInput(elem, {
    initialCountry: "ua",
    preferredCountries: ["ua", "pl", "lt", "ee", "lv", "gb", "de", "fr"],
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
  });
}

export const maskInit = (elem) => {
  let maskOptions = {
    mask: '00 000-00-00',
    lazy: false,
  };
  return IMask(elem, maskOptions);
}
// --------------------------------------------------------------