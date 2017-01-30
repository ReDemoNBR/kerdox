module.exports = {
  celsiusToKelvin: (celsius, flagIfErrorReturnNan=false)=>celsius && !Number.isNaN(Number(celsius)) && celsius+273.15 || flagIfErrorReturnNan && Number.NaN || 0,
  removeNonDigits: value=>value.toString().replace(/(?:\D|\.)+/g, "") || "" // already removes the minus sign
};
