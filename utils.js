module.exports.sendResponse = (res, statusCode, headers, data) => {
  res.writeHead(statusCode, headers);
  res.end(data);
}

module.exports.parseData = (req, res) => {
  let rawData = '';

  req.on('data', (chunk) => { 
    rawData += chunk; 
  });

  req.on('end', () => {
    try {
      console.log(JSON.parse(rawData));
      const statusCode = 200;
      const headers = {
        'Content-Type': 'text/plain'
      };
      const data = 'Success';
      module.exports.sendResponse(res, statusCode, headers, data);
    } catch (e) {
      console.error(e.message);
      const statusCode = 400;
      const headers = {
        'Content-Type': 'text/plain'
      };
      const data = 'Server error';
      module.exports.sendResponse(res, statusCode, headers, data);
    }
  });
}