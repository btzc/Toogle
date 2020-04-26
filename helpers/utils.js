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
        console.log(e);
        reject(new Error('Incorrect parameters'));
      }
      resolve(body);
    });
  });
}