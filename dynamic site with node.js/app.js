const router = require('./router.js')

// problem: we need a simple way to look at a user's badge count & JS points from a web browser.
// solution: use node.js to perform profile look ups and server our template via HTTP.

// 1. create web a server 
const http = require('http');
 
const hostname = '127.0.0.1';
const port = 3000;
 
const server = http.createServer((request, response) => {
  router.home(request, response)
  router.user(request, response)
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
//response.write('This is before end\n')
//response.end('Hello World'); //when we call the ".end" we can see somewhere codes after writen ".end"
//response.write('This is after end\n') //so, this not gonna showup.
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// 4. function that handles the reading of files and merge in value.
  //read from file and get a string
    //merge values in to string >>>>go to render.js