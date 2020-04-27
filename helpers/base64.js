const padString = (input) => {
  let segmentLength = 4;
  let stringLength = input.length;
  let diff = stringLength % segmentLength;

  if (!diff) {
      return input;
  }

  let position = stringLength;
  let padLength = segmentLength - diff;
  let paddedStringLength = stringLength + padLength;
  let buffer = Buffer.alloc(paddedStringLength);

  buffer.write(input);

  while (padLength--) {
      buffer.write("=", position++);
  }

  return buffer.toString();
}

module.exports.urlEncode = (unencoded) => {
  return unencoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

module.exports.urlDecode = (encoded) => {
  return padString(encoded).replace(/\-/g, "+").replace(/_/g, "/");
}

module.exports.encode = (unencoded = '') => {
  return module.exports.urlEncode(Buffer.from(unencoded).toString('base64'));
}

module.exports.decode = (encoded = '') => {
  return Buffer.from(encoded, 'base64').toString('utf8');
}
