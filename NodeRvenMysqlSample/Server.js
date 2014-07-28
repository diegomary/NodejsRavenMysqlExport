// immediately-invoked function expression  No pollution of namespace
(function DMSERVER () {
    var http = require('http');
    var util = require('util');
    var express = require('express');  // express is installed as a module with the following command line:   npm install express
    var mysql = require('mysql');
    var extend = require('util')._extend;
    var $ = require('jquery'); // npm install jquery
    var fs = require('fs');
    var ravendb = require('ravendb'); //https://www.npmjs.org/package/ravendb
//**********************************************************************************************************************************
        var connected_users = 0;
        http.createServer(function (request, response) {  // re
        var dataToServer = '';
        var pluto = 'hello';
        response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        request.on('data', function (chunk) {
            console.log('Request received: ');
            console.log("The request comes from the following client IP " + request.connection.remoteAddress);
            console.log('Got the following Data:  ' + chunk);
            dataToServer = JSON.parse(chunk.toString());           
        });
        request.on('end', function () {
            var allRows = {};
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'Diego',
                password: 'Atreius@62'
            });
            connection.query("use northwind");
            var strQuery = "select * from customers";
            connection.query(strQuery, function (err, rows) {
                allRows = JSON.stringify(extend({}, rows)); // Simple example to show how to clone an object in nodejs                
                response.end(allRows); // It must be stringified
                var db = ravendb('http://localhost:777', 'Northwind');
                var counter = 0;
                //Do not use a simple for loop because it doesn't work
                rows.forEach(
                                function insertRow(row) {
                                    row.id = counter.toString();  // we need to add the id prior saving it
                                    db.saveDocument('Customers', row, function (err, result) {
                                        if (err) console.error(err);
                                        //else console.log(result);
                                    })
                                    counter++;
                                }                                
                            );
                fs.writeFile("test.json", allRows, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("The file was saved!");
                    }
                });
                            
                console.log(dataToServer[0].user);
            });
        });
    }).listen(8080, "127.0.0.1", function () { console.log("opened server on %j", this.address()); })
        .on('connection', function (socket) {
            console.log('someone connected! ...');
            connected_users += 1;
            console.log('Number of Connected Users: ' + connected_users)
            // connected_users[socket.__fd] = socket.remoteAddress;      
            socket.on('close', function () {
                connected_users -= 1;
                console.log('Number of Connected Users: ' + connected_users)
            });
        });   
})();
























