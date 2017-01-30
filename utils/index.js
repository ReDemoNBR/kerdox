const [Base64, Digester, KerdoxNumber, NumberTreatment] = [require("./base64"), require("./digester"), require("./kerdox-number"), require("./number-treatment")];


module.exports = {
  celsiusToKelvin: NumberTreatment.celsiusToKelvin,
  computeSHA256: Digester.SHA256_Hex,
  computeSHA512: Digester.SHA512_Hex,
  computeSHA3: Digester.SHA3_Hex,
  Constants: require("./constants"),
  decodeBase64: Base64.decode,
  encodeBase64: Base64.encode,
  generateKerdoxNumberObject: KerdoxNumber.generateKerdoxNumberObject,
  removeNonDigits: NumberTreatment.removeNonDigits,
  seeder: require("./seeder"),
  setKerdoxNumberDecimalPlaces: KerdoxNumber.setDecimalPlaces
};
