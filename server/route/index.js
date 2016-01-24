/**
 * Created by JFCS on 1/22/16.
 */
var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/',function(request,response){
    response.sendFile(path.join(__dirname,'../public/views/index.html'));

});








//router.get('/*', function(request, response) {
//    response.sendFile(path.join(__dirname, '../public/views/index.html'));
//});

// nuka catch all script, will use as neccesary.
///* handle root angular route redirects */
//router.get('/*', function(req, res, next){
//    var url = req.originalUrl;
//    if (url.split('.').length > 1){
//        next();
//    } else {
//        // handles angular urls. i.e. anything without a '.' in the url (so static files aren't handled)
//        console.log('Catch all handled url: ' + url);
//        res.redirect('/#' + url);
//    }
//});

//console.log('Route * loaded.');





module.exports = router;