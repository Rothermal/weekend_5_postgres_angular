/**
 * Created by JFCS on 1/22/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/weekend5sqlchallege';

router.get('/user', function(request, response){
    var results = [];

    pg.connect(connectionString, function(err, client){
        if(err) {
            console.log(err)
        }

        var query = client.query("SELECT * FROM users");

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            client.end();
            console.log(results);
            return response.json(results);
        });
    })
});

router.post('/addresses', function(request, response){
    var results = [];
    console.log('request in /addreess',request.body);
    pg.connect(connectionString, function(err, client){
        if(err) {
            console.log(err)
        }

        var query = client.query("SELECT * FROM addresses WHERE user_id = $1",[request.body.id]);

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            client.end();
            console.log('results in query',results);
            return response.json(results);
        });
    })
});

router.post('/orders', function(request, response){
    var results = [];
    console.log('request in /orders',request.body);
    pg.connect(connectionString, function(err, client){
        if(err) {
            console.log(err)
        }

        var query = client.query("SELECT * FROM orders JOIN addresses ON orders.ship_address_id = addresses.address_id  WHERE orders.user_id = $1 ORDER BY orders.order_date DESC",[request.body.id]);

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            client.end();
            console.log(results);
            return response.json(results);
        });
    })
});


module.exports = router;
