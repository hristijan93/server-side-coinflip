const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

const server = http.createServer((req, res) => {

  function readWrite(file, contentType) {
    fs.readFile(file, function(err, data) {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(data);
      res.end();
    });
  }  

  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
//   console.log(page);
  console.log(params)

  switch(page) {
    case '/':
        readWrite('index.html', 'text/html');
        break;
    case '/api':
        let flipResult = `Type 'flip in the input box`;
        let flipImage = ""
        let imgHeads = 'https://m.media-amazon.com/images/I/51bcZy+HZpL._AC_SY580_.jpg';
        let imgTails = 'https://previews.123rf.com/images/eldadcarin/eldadcarin1303/eldadcarin130300930/18926155-frontal-view-of-the-reverse-tails-side-of-a-10-hong-kong-dollar-coin-minted-in-1995-depicted-is-the-.jpg'
        if(params['student'] == 'flip'){
            // flipResult = Math.random() <= 0.5 ? 'heads' : 'tails';
            flipResult = Math.random();
            if (flipResult <= 0.5) {
                flipResult = 'Heads';
                flipImage = imgHeads;
            } else {
                flipResult = 'Tails';
                flipImage = imgTails;
            }
            
        }
        // Creating response
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          result: flipResult,
          image: flipImage
        }
        res.end(JSON.stringify(objToJson));
        // End of response
        break;
        case '/css/style.css':
            fs.readFile('css/style.css', function(err, data) {
            res.write(data);
            res.end();
            });
            break;
        case '/js/main.js':
            readWrite('js/main.js', 'text/javascript');
            break;
        default:
            figlet('404!!', function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            res.write(data);
            res.end();
            });
            break;    
  }
});

server.listen(8000);
