const [Base64, Digester, NumberTreatment] = [require("./base64"), require("./digester"), require("./number-treatment")];


module.exports = {
  celsiusToKelvin: NumberTreatment.celsiusToKelvin,
  computeSHA256: Digester.SHA256_Hex,
  computeSHA512: Digester.SHA512_Hex,
  computeSHA3: Digester.SHA3_Hex,
  decodeBase64: Base64.decode,
  encodeBase64: Base64.encode,
  removeNonDigits: NumberTreatment.removeNonDigits,
  seeder: require("./seeder")
};
