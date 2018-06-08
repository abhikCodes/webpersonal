var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var helper = require('sendgrid').mail;
var sg = require("sendgrid")("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");


var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : false});

module.exports = router;

router.get('/', function(req, res){
    res.render('../index')
    // res.sendFile(path.join(__dirname, '../index.html'))
});

router.get('/about', function(req, res){
    // res.sendFile(path.join(__dirname, '../about.html'))
    // res.send(about);
    res.render('../about');
});

router.get('/contact', function(req, res){
    // res.sendFile(path.join(__dirname, '../contact.html'))
    res.render('../contact');
});
router.post('/contact', urlencodedParser, function(req, res){
    console.log(req.body);
    console.log(req.body['name']);

    var fromEmail = new helper.Email(req.body['email']);
    var toEmail = new helper.Email("as242@snu.edu.in");
    var subject = req.body['subject'];
    var content = new helper.Content("text/plain", req.body['message']);
    var mail = new helper.Mail(fromEmail, subject,toEmail, content);

    var request = sg.emptyRequest({
        method: "POST",
        path: "/v3/mail/send",
        body: mail.toJSON()
    });

    sg.API(request, function(error, response){
        if(error){
            console.log("Error");
            res.render('../error');
        }
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
        console.log("Succesfully sent");
        res.render('../mailresult');
    })

})

router.get('/projects', function(req, res){
    // res.sendFile(path.join(__dirname, '../projects.html'))
    res.render('../projects');
});

router.get('/experience' , function(req, res){
    // res.sendFile(path.join(__dirname, '../experience.html'))
    res.render('../experience');
})



// router.get('')
