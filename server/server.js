/**
 * Created by JFCS on 1/22/16.
 */
var express = require('express');
var index = require('./route/index');
var app = express();
var bodyParser = require('body-parser');
var api = require('./route/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api',api);
app.use("/",index);
app.use(express.static('server/public'));


var server = app.listen(3000,function(){
   var port=server.address().port;
    console.log('We are now open on port ', port);
});