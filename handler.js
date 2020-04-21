module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
  } else {
    let rawData = '';

    req.on('data', (chunk) => { 
      rawData += chunk; 
    });

    req.on('end', () => {
      try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Success');
      } catch (e) {
        console.error(e.message);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Server error');
      }
    });
  }
};
