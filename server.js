var http = require('http')
var port = process.env.PORT || 1337;



var express = require('express')
, edge = require('edge');

var getResult = edge.func('sql',function () {/*
    select top 30 TestRunId,SuiteName,CaseName,LastUpdateDate,LastUpdatedBy,Result
    from TestCases
    order by DateAdded desc
*/});

var app = express();

app.use(express.static(__dirname ));

 
console.log("Registering endpoint: /stubbed");
app.get('/stubbed', function(req, res){
    res.send('hello STUBBED');
});
 
console.log("Registering endpoint: /testing");
app.get('/testing', function(req, res){
    res.send('this is a test endpoint');
});
 
console.log("Registering endpoint: /jsonendpoint");
app.get('/jsonendpoint', function(req, res){
    res.json([
      
       ]
    );
});
app.get('/result', function(req,res){
    getResult(null,function(error,result){
        if(error) throw error;
        res.json(result);
    });
});

console.log("Registering endpoint: /");
app.get('/', function(req, res){
    res.sendFile('/index.html');
});


//http.createServer(function(req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//})
app.listen(port);