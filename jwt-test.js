const http = require('http');

const exampleJwt =
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
  eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.
  TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ`;

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/jwt'});
  // this example were taken from http://jwt.io/
  res.end(exampleJwt);
}).listen(7117);

console.log('Test page running at http://localhost:7117');
