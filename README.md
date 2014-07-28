NodejsRavenMysqlExport
======================

A nodejs basic server that reads data from Mysql end exports them to RavenDB.

This sample requires RavenDB be installed and running as a service or as a console application. The address configured is:
http://localhost:777.

Also Mysql must be installed and running.

The example reads the table customers from the Mysql northwind database and write it in a Northwind databes in RavenDB.
The Raven DB Northwind must be created using RavenDB studio prior to execute the application.

The nodejs must be installed on a windows machine. and the command node server must be issued in order to launch the server listener.


The Client uses Angularjs system to make asyncronous calls in factory and also a jquery ajax example is supplied in 
Angular factory.


List of nodejs requirements:

 var http = require('http');
    var util = require('util');
    var mysql = require('mysql');
    var extend = require('util')._extend;
    var $ = require('jquery'); // npm install jquery
    var fs = require('fs');  // for saving json datatable on filesystem
    var ravendb = require('ravendb'); 
