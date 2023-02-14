export function getPhoneNumber(iniI, maskI) {
  return `+${iniI.getSelectedCountryData().dialCode}${maskI.unmaskedValue}`;
}