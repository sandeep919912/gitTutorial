const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  const url = req.url;

  if (url === '/home') {
    res.write('Welcome home');
    res.end();
  } else if (url === '/about') {
    res.write('Welcome to About Us');
    res.end();
  } else if (url === '/node') {
    res.write('Welcome to my Node Js project');
    res.end();
  } else {
    res.write('Page Not Found');
    res.end();
  }
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});