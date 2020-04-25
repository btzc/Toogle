const crypto = require('crypto');
const fs = require('fs');
const base64 = require('./base64');

const headerObj = {
  alg: 'RS256',
  typ: 'JWT'
};

const payloadObj = {
  sub: '1234567890',
  name: 'John Doe',
  admin: true,
  iat: 1516239022
};

module.exports.generateToken = (header, payload) => {
  const signatureFunction = crypto.createSign('RSA-SHA256');

  const headerObjString = JSON.stringify(header);
  const payloadObjString = JSON.stringify(payload);

  const base64UrlHeader = base64.encode(headerObjString);
  const base64UrlPayload = base64.encode(payloadObjString);

  signatureFunction.write(base64UrlHeader + '.' + base64UrlPayload);
  signatureFunction.end();
  
  const PRIV = fs.readFileSync('../scripts/id_rsa_priv.pem', 'utf8');
  const signatureBase64 = signatureFunction.sign(PRIV, 'base64');

  const base64UrlSignature = base64.urlEncode(signatureBase64);

  return `${base64UrlHeader}.${base64UrlPayload}.${base64UrlSignature}`;
}

module.exports.verifyToken = (token) => {
  const verifyFunction = crypto.createVerify('RSA-SHA256');

  const PUB = fs.readFileSync('../scripts/id_rsa_pub.pem', 'utf8');
  const jwtHeader = token.split('.')[0];
  const jwtPayload = token.split('.')[1];
  const jwtSignature = token.split('.')[2];

  verifyFunction.write(`${jwtHeader}.${jwtPayload}`);
  verifyFunction.end();

  const jwtSignatureBase64 = base64.urlDecode(jwtSignature);
  const signatureIsValid = verifyFunction.verify(PUB, jwtSignatureBase64, 'base64');
}
