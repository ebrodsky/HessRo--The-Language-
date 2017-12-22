var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var port = process.env.PORT || 3000;

function requestHandler(request, response)
{
    var IP = request.connection.remoteAddress;
    console.log("\n\nrequested ", IP);

    var filePath = './public' + request.url;
    if(filePath == './public/')
        filePath = filePath + 'index.html';
    console.log("filePath: ", filePath);

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    if(extname == '.js')
        contentType = 'text/javascript';
    else if(extname == '.css')
        contentType = 'text/css';

    fs.readFile(filePath, function(err, content)
    {
        if(err)
        {
            if(err.code == 'ENOENT')
            {
                fs.readFile('public/404.html', function(err, content)
                {
                    response.statusCode = 200;
                    response.setHeader('Content-Type', contentType);
                    response.end(content, 'utf-8');
                });
            }
            else
            {
                response.writeHead(500);
                response.end('Error: hess rob? rob! hess! rob hess rob hess');
            }
        }
        else
        {
            response.setHeader('Content-Type', contentType);
            response.end(content, 'utf-8');
        }
    });

};

var server = http.createServer(requestHandler);

server.listen(port);

console.log("Listening on port ", port);
