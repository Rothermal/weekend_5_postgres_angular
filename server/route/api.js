/**
 * Created by JFCS on 1/22/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/weekend5sqlchallenge';

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

//router.post('/talent', function(request, response){
//    var results = [];
//
//    var talent = request.body;
//
//    var talentId;
//
//    pg.connect(connectionString, function(err, client){
//        if (err) {
//            console.log(err)
//        }
//
//        var mainQuery = client.query("INSERT INTO talent(first_name, last_name, phone, low_range, high_range) VALUES ($1, $2, $3, $4, $5) RETURNING id", [talent.first_name, talent.last_name, talent.phone, talent.low_range, talent.high_range], function(err, result){
//            if(err) {
//                console.log(err);
//            }
//
//            talentId = result.rows[0].id;
//
//            if (talent.skills && talent.skills.length > 0) {
//                var queryString = "INSERT INTO talent_skills(talent_id, skill_id) VALUES ";
//
//                for (var i = 1; i <= talent.skills.length; i++) {
//                    if (i != talent.skills.length) {
//                        queryString += "("+talentId+", $" + i + "),";
//                    } else {
//                        queryString += "("+talentId+", $" + i + ")";
//                    }
//                }
//
//                var query = client.query(queryString, talent.skills);
//
//                query.on('end', function() {
//                    var query = client.query("SELECT * FROM talent");
//
//                    query.on('row', function(row) {
//                        results.push(row);
//                    });
//
//                    query.on('end', function() {
//                        client.end();
//                        return response.json(results);
//                    });
//
//                });
//            } else {
//                mainQuery.on('end', function() {
//                    var query = client.query("SELECT * FROM talent");
//
//
//                    query.on('row', function (row) {
//                        results.push(row);
//                    });
//
//                    query.on('end', function () {
//                        client.end();
//                        return response.json(results);
//                    });
//                });
//            }
//        });
//
//
//    });
//});
//
//router.delete('/talent/:id', function(request, response){
//    var results = [];
//
//    pg.connect(connectionString, function(err, client){
//        if (err){
//            console.log(err);
//        }
//
//        var query = client.query("DELETE FROM talent_skills WHERE talent_id = $1", [request.params.id]);
//
//        query.on('end', function() {
//            client.query("DELETE FROM talent WHERE id = $1", [request.params.id]).on('end', function(){
//                var returnQuery = client.query("SELECT * FROM talent");
//
//                returnQuery.on('row', function (row) {
//                    results.push(row);
//                });
//
//                returnQuery.on('end', function () {
//                    client.end();
//                    return response.json(results);
//                });
//            });
//        });
//    });
//});
//
//router.get('/talent_skills', function(request, response){
//    var results = [];
//
//    pg.connect(connectionString, function(err, client){
//        if (err){
//            console.log(err);
//        }
//
//        var query = client.query("SELECT talent_skills.talent_id, skills.name FROM talent_skills LEFT JOIN skills ON talent_skills.skill_id = skills.id");
//
//        query.on('row', function(row) {
//            results.push(row);
//        });
//
//        query.on('end', function() {
//            client.end();
//            return response.json(results);
//        });
//    });
//});
//
//router.get('/skills', function(request, response){
//    var results = [];
//
//    pg.connect(connectionString, function(err, client){
//        if (err) {
//            console.log(err);
//        }
//
//        var query = client.query("SELECT * FROM skills");
//
//        query.on('row', function(row) {
//            results.push(row);
//        });
//
//        query.on('end', function() {
//            client.end();
//            return response.json(results);
//        });
//    });
//});
//
//router.post('/skills', function(request, response){
//    var results = [];
//
//    var name = request.body.name;
//
//    pg.connect(connectionString, function(err, client){
//        if (err) {
//            console.log(err);
//        }
//
//        client.query("INSERT INTO skills(name) VALUES($1)", [name]);
//
//        var query = client.query("SELECT * FROM skills");
//
//        query.on('row', function(row) {
//            results.push(row);
//        });
//
//        query.on('end', function() {
//            client.end();
//            return response.json(results);
//        });
//    });
//});

module.exports = router;
