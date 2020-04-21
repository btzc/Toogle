const sendResponse = (res, statusCode, headers, data) => {
  res.writeHead(statusCode, headers);
  res.end(data);
}

const parseData = (req, res) => {
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
      sendResponse(res, statusCode, headers, data);
    } catch (e) {
      console.error(e.message);
      const statusCode = 400;
      const headers = {
        'Content-Type': 'text/plain'
      };
      const data = 'Server error';
      sentResponse(res, statusCode, headres, data);
    }
  });
}

module.exports = (req, res) => {
  if (req.method === 'GET') {
    const statusCode = 200;
    const headers = {
      'Content-Type': 'text/plain'
    };
    const data = 'Hello, World!\n';

    sendResponse(res, statusCode, headers, data); 
  } else {
    parseData(req, res);
  }
};
