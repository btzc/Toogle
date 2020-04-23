module.exports.sendResponse = (res, statusCode, headers, data) => {
  res.writeHead(statusCode, headers);
  res.end(data);
}

module.exports.parseData = (req, res) => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => { 
      body += chunk; 
    });
  
    req.on('end', () => {
      try {
        body = JSON.parse(body);
      } catch (e) {
        reject(e);
        // console.error(e.message);
        // const statusCode = 400;
        // const headers = {
        //   'Content-Type': 'text/plain'
        // };
        // const data = 'Server error';
        // module.exports.sendResponse(res, statusCode, headers, data);
      }
      resolve(body);
    });
  });
}