var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
// var helper = require('sendgrid').mail;
// var sg = require("sendgrid")("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");
var mailgun = require("mailgun-js");
var api_key = '39c8e70ac049b15b7fbaa13556b165be-b892f62e-07c76ef9';
var DOMAIN = 'sandbox3e55e08ddc8045e89472658728735aad.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

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

    var data = {
      from: req.body['email'],
      to: 'as242@snu.edu.in',
      subject: req.body['subject'],
      text: req.body['message']
    };

    mailgun.messages().send(data, function (error, body) {
        console.log("mailgun:");
        console.log(body);
        res.render('../mailresult');
    });

    // var fromEmail = new helper.Email(req.body['email']);
    // var toEmail = new helper.Email("as242@snu.edu.in");
    // var subject = req.body['subject'];
    // var content = new helper.Content("text/plain", req.body['message']);
    // var mail = new helper.Mail(fromEmail, subject,toEmail, content);

    // var request = sg.emptyRequest({
    //     method: "POST",
    //     path: "/v3/mail/send",
    //     body: mail.toJSON()
    // });
    //
    // sg.API(request, function(error, response){
    //     if(error){
    //         console.log("Error");
    //         res.render('../error');
    //     }
    //     console.log(response.statusCode);
    //     console.log(response.body);
    //     console.log(response.headers);
    //     console.log("Succesfully sent");
    //     res.render('../mailresult');
    // })

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
