module.exports = {
    celsiusToKelvin: (celsius, flagIfErrorReturnNan=false)=>celsius && !Number.isNaN(Number(celsius)) && celsius+273.15 || flagIfErrorReturnNan && Number.NaN || 0,
    metersPerSecToKilometersPerHour: value=>Number(value)*3.6,
    removeNonDigits: value=>String(value).replace(/(?:\D|\.)+/g, "") || "" // already removes the minus sign
};
