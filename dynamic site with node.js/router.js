const Profile = require("./profile.js");
const render = require('./render.js');
let querystring = require('querystring')

// 2. handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  // if url == "/" && GET
  if (request.url === '/') {
    if(request.method === 'GET'){
      // Show search
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      render.view('header', {}, response);
      render.view('search', {}, response);
      render.view('footer', {}, response);
      response.end();
    }else{
    // if url =="/" && POST
    //get post data from body
    request.on('data', function(postBody){
      let query = querystring.parse(postBody.toString())
      response.writeHead(303,{'Location': "/" + query.username})
      response.end()
    });
    //extract username
    
   // Redirect to /:username 
    }
  } else {
    response.end('404 Not Found');
  
}
  
}

// 3. Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  // if url =="/...."
  const userName = request.url.replace('/', '');
  if (userName.length > 0) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    render.view('header', {}, response);

    // get json from treehouse
    let studentProfile = new Profile(userName);

    // on "end"
    studentProfile.on("end", function(profileJSON) {
      // show profile

      // store the values which we need
      let values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        JavaScriptPoints: profileJSON.points.JavaScript,
      };

      // simple response
      render.view('profile', values, response);
      render.view('footer', {}, response);
      response.end();
    });

    // on "error"
    studentProfile.on("error", function(error) {
      render.view('error', { errorMessage: error.message }, response);
      render.view('search', {}, response);
      render.view('footer', {}, response);
      response.end();
    });
  } else {
    response.end('404 Not Found');
  }
}

module.exports.home = home;
module.exports.user = user;
