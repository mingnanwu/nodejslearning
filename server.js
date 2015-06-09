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
       {"TestRunId":"551da3d0-7661-4bb7-80da-59fe1cc96bb9","SuiteName":"LoopTestScenario","CaseName":"LoopTestCase","LastUpdateDate":"6/9/2015 4:12:24 AM","LastUpdatedBy":"REDMOND\\v-kevwu","Result":"Pass"},
       {"TestRunId":"1479ee4c-e980-4a64-b92f-1a9cbf25a975","SuiteName":"LoopTestScenario","CaseName":"LoopTestCase","LastUpdateDate":"6/9/2015 3:10:40 AM","LastUpdatedBy":"REDMOND\\v-kevwu","Result":"Pass"},
       {"TestRunId":"97c7e944-37d7-403a-917a-94177685da5d","SuiteName":"LoopTestScenario","CaseName":"LoopTestCase","LastUpdateDate":"6/9/2015 2:10:41 AM","LastUpdatedBy":"REDMOND\\v-kevwu","Result":"Pass"},
       {"TestRunId":"a6606a3b-3500-4df0-96e2-72aaaef1fc8b","SuiteName":"LoopTestScenario","CaseName":"LoopTestCase","LastUpdateDate":"6/9/2015 1:10:41 AM","LastUpdatedBy":"REDMOND\\v-kevwu","Result":"Pass"},
       {"TestRunId":"565d8b13-06ae-45d9-8fac-d85a249c5410","SuiteName":"LoopTestScenario","CaseName":"LoopTestCase","LastUpdateDate":"6/9/2015 12:22:12 AM","LastUpdatedBy":"REDMOND\\v-kevwu","Result":"Pass"},
       {"TestRunId":"e53eb315-b30f-4349-b256-eee1248fd1a6","SuiteName":"LoopTestScenario","CaseName":"LoopTestCase","LastUpdateDate":"6/9/2015 12:19:00 AM","LastUpdatedBy":"REDMOND\\v-kevwu","Result":"Pass"},
       {"TestRunId":"cab0b897-5bca-40a8-b999-40fd8427baa9","SuiteName":"LoopTestScenario","CaseName":"LoopTestCase","LastUpdateDate":"6/9/2015 12:17:35 AM","LastUpdatedBy":"REDMOND\\v-kevwu","Result":"Pass"},
       {"TestRunId":"19cb208c-9bd9-436e-bd11-700077475cab","SuiteName":"LoopTestScenario","CaseName":"LoopTestCase","LastUpdateDate":"6/9/2015 12:20:56 AM","LastUpdatedBy":"REDMOND\\v-kevwu","Result":"Pass"},
       {"TestRunId":"6fd03d19-4821-4da7-a207-a793c992e82c","SuiteName":"LoopTestScenario","CaseName":"LoopTestCase","LastUpdateDate":"6/9/2015 12:19:47 AM","LastUpdatedBy":"REDMOND\\v-kevwu","Result":"Pass"},
       {"TestRunId":"74e897b0-0891-49aa-a3f1-fdbfc0ea1f77","SuiteName":"LoopTestScenario","CaseName":"LoopTestCase","LastUpdateDate":"6/9/2015 12:17:54 AM","LastUpdatedBy":"REDMOND\\v-kevwu","Result":"Pass"}
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