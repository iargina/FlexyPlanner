export const maskOnCountryChange = (selectedCountry, placeHolderMask) => {
  let maskOptions = {};

  switch (selectedCountry) {
    case 'ua':
      maskOptions = {
        mask: '00 000-00-00',
        lazy: false,
      };
      break;
    case 'pl':
      maskOptions = {
        mask: '00 000-00-00',
        lazy: false,
      };
      break;
    case 'us':
      maskOptions = {
        mask: '000 000-00-00',
        lazy: false,
      };
      break;
    case 'gb':
      maskOptions = {
        mask: '0000 00-00-00',
        lazy: false,
      };
      break;
    case 'de':
      maskOptions = {
        mask: '00 000-00-00',
        lazy: false,
      };
      break;
    default:
      // console.log(`Sorry, we are out of ${selectedCountry}.`);
      let newVal = placeHolderMask.replace(new RegExp("[0-9]", "g"), "0");
      maskOptions = {
        mask: newVal,
        lazy: false,
      };
  }

  // console.log('maskOptions :>> ', maskOptions);
  return maskOptions;
}