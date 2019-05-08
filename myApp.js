var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// --> 7)  Mount the Logger middleware here
app.use(function middleware(req,res,next){
  let log = `${req.method} ${req.path} - ${req.ip}`;
  console.log(log);
  next();
});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
// console.log("Hello World");

/** 2) A first working Express Server */
// app.get('/', function(req,res){
//   res.send('Hello Express');
// });

/** 3) Serve an HTML file */
app.get('/', function(req,res){
  let path = __dirname + '/views/index.html';
  res.sendFile(path);
});

/** 4) Serve static assets  */
app.use(express.static(__dirname + '/public'));

/** 5) serve JSON on a specific route */
// app.get('/json', function(req,res){
//   res.json({message: "Hello json"});
// });

/** 6) Use the .env file to configure the app */
// app.get('/json', function(req,res){
//   let response = {message: "Hello json"};
//   if(process.env.MESSAGE_STYLE === "uppercase"){
//     response.message = response.message.toUpperCase();
//   }
//   res.json(response);
// }); 
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
app.get('/json', function(req,res){
  let response = {message: "Hello json"};
  if(process.env.MESSAGE_STYLE === "uppercase"){
    response.message = response.message.toUpperCase();
  }
  res.json(response);
}); 

/** 8) Chaining middleware. A Time server */
app.get('/now', function(req,res,next){
  req.time = new Date().toString();
  next();
},function(req, res){
  res.json({time: req.time});
});

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', function(req,res){
  res.json({echo: req.params.word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
let handler = function(req,res){
  let firstName = req.body ? req.body.first : req.query.first;
  let lastName = req.body ? req.body.last : req.query.last;
  let json = { name: `${firstName} ${lastName}`};
  res.json(json);
}
app.route('/name').get(handler).post(handler);
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
