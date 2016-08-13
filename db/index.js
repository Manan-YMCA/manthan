var mongoose = require('mongoose');
var json2html = require('node-json2html');
var helper = require('sendgrid').mail;

//Database Connection
mongoose.connect('mongodb://XXX:XXX@XXX.mlab.com:45405/XXX');
//Database Setup
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {         
      // we're connected!
      console.log("Connected To MongoLab Cloud Database :p");
}); 

//Schema Setup
var userSchema = mongoose.Schema({
    fullname: String,
    rollno: String,
    branch: String,
    year: String,
    email: String,
    phone: String,
    codingprofilelinks: String,
    opensourcelinks: String,
    otherprofiles: String,
    project: String,
    score: Number,
    timestamp: String
});

//Model Setup
var User = mongoose.model('User', userSchema);

exports.addUser=  function (req, res) {
//Get form data
var fullname = req.body.fullname;
var rollno = req.body.rollno;
var branch = req.body.branch;
var year = req.body.year;
var email = req.body.email;
var phone = req.body.phone;
var codingprofilelinks = req.body.codingprofilelinks;
var opensourcelinks = req.body.opensourcelinks;
var otherprofiles = req.body.otherprofiles;
var project = req.body.project;
var timestamp = new Date();

var newUser = new User({
    fullname: fullname,
    rollno: rollno,
    branch: branch,
    year: year,
    email: email,
    phone: phone,
    codingprofilelinks: codingprofilelinks,
    opensourcelinks: opensourcelinks,
    otherprofiles: otherprofiles,
    project: project,
    score: 0,
    timestamp: timestamp
});
newUser.save(function (err, testEvent) {
  if (err) return console.error(err);
  console.log("New user record saved!");
});
var strVar="";
strVar += "<!DOCTYPE html>";
strVar += "<html>";
strVar += "<head>";
strVar += " <title>Manthan<\/title>";
strVar += "<\/head>";
strVar += "<body style=\"background-color:#F4F8FF;";
strVar += "     width: 100%;";
strVar += "     height: 100%;";
strVar += "     text-align: center;";
strVar += "     font-family: \"wf_segoe-ui_normal\", \"Segoe UI\", \"Segoe WP\", Tahoma, Arial, sans-serif;";
strVar += "     display:-webkit-box;";
strVar += "     -webkit-box-orient:horizontal;\"><table bgcolor=\"#F4F8FF\"";
strVar += " <div style=\" margin-left: 15%; margin-right: 15%; \"> ";
strVar += "";
strVar += "     <img src=\"http:\/\/mananymca.herokuapp.com\/images\/rsvp.png\" width=\"100%\">";
strVar += "     <h3>Congratulations "+newUser.fullname+" !<\/h3>";
strVar += "         <hr style=\"color: #141414;\" >";
strVar += "";
strVar += "     <p style=\"padding-top:9px;";
strVar += "     padding-right:18px;";
strVar += "     padding-bottom:9px; ";
strVar += "     padding-left:18px; ";
strVar += "     word-break:break-word; ";
strVar += "     color:#202020; ";
strVar += "     font-family:Arial,'Helvetica Neue',Helvetica,sans-serif; ";
strVar += "     font-size:16px; ";
strVar += "     line-height:150%; ";
strVar += "     text-align:left; \">";
strVar += "     You have been successfully registered! <br\/><br\/>";
strVar += "     Our schedule is as follows<br\/>";
strVar += "      <b>- Orientation<\/b> <br\/>";
strVar += "      <b>- Manthan - Written Round<\/b> <br\/>";
strVar += "      <b>- Manthan - Exhibition Round<\/b> <br\/>";
strVar += "      <b>- Manthan - Personal Interview Round<\/b> <br\/><br\/>";
strVar += "     Be there on time and show your passion :)<br\/>";
strVar += "     <\/p>";
strVar += "";
strVar += "     <p style=\"padding-top:9px;";
strVar += "     padding-right:18px;";
strVar += "     padding-bottom:9px; ";
strVar += "     padding-left:18px; ";
strVar += "     word-break:break-word; ";
strVar += "     color:#202020; ";
strVar += "     font-family:Arial,'Helvetica Neue',Helvetica,sans-serif; ";
strVar += "     font-size:16px; ";
strVar += "     line-height:150%; ";
strVar += "     text-align:left;";
strVar += "     align=\"top\";";
strVar += "     }\">";
strVar += "";
strVar += "     ";
strVar += "     Have questions? Wanna give some feedback? Feel free to contact us anytime<br\/>";
strVar += "     Phone:- +91 9643763712<br\/>";
strVar += "     Email:- manantechnosurge@gmail.com<br\/>";
strVar += "     <br\/><br\/>";
strVar += "     Cheers!<br>WebTeam <br\/><i>Manan<\/i> <br\/> #manthan2016";
strVar += "     <\/p>";
strVar += "     <table align=\"center\">";
strVar += "     <tr>";
strVar += "     <td>";
strVar += "     <a href=\"http:\/\/www.facebook.com\/manan.ymcaust\">";
strVar += "     <img src=\"http:\/\/mananymca.herokuapp.com\/dark-facebook-96.png\" alt=\"Facebook\" class=\"x_mcnFollowBlockIcon\" style=\"width:48px; max-width:48px; display:block; border:0; height:auto; outline:none; text-decoration:none\" width=\"48\">Fb";
strVar += "     <\/a>";
strVar += "     <\/td>";
strVar += "     <td>";
strVar += "     <a href=\"http:\/\/www.manan.tech\">";
strVar += "     <img src=\"http:\/\/mananymca.herokuapp.com\/dark-link-96.png\" alt=\"Website\" class=\"x_mcnFollowBlockIcon\" style=\"width:48px; max-width:48px; display:block; border:0; height:auto; outline:none; text-decoration:none\" width=\"48\"> Website";
strVar += "     <\/a>";
strVar += "     <\/td>";
strVar += "     <\/tr>";
strVar += "     <\/table>";
strVar += "";
strVar += "     ";
strVar += "";
strVar += "    <\/div><\/table>";
strVar += "<\/body>";
strVar += "<\/html>";

from_email = new helper.Email("manantechnosurge@gmail.com","WebTeam Manan")
to_email = new helper.Email(newUser.email)
subject = "Congratulation! You have been registered"
content = new helper.Content("text/html", strVar)
mail = new helper.Mail(from_email, subject, to_email, content)

var sg = require('sendgrid')('XXX');
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode)
    console.log(response.body)
   // res.send(response.statusCode+response.body)
    console.log(response.headers)
  })

res.render('done')
}

exports.testEmail= function(req,res){
    res.json({mode:'Testing'})
}

exports.admin=  function (req, res) {
    if(req.params.pin=="inim"){
    User.find({},function (err, user) {
        var data = user;
           var transform = {'tag':'tr','html':'<td style=\"border:1px solid black\">${fullname}</td><td style=\"border:1px solid black\">${rollno}</td><td style=\"border:1px solid black\">${branch}</td><td style=\"border:1px solid black\">${year}</td><td style=\"border:1px solid black\">${email}</td><td style=\"border:1px solid black\">${phone}</td><td style=\"border:1px solid black\">${codingprofilelinks}</td><td style=\"border:1px solid black\">${opensourcelinks}</td><td style=\"border:1px solid black\">${otherprofiles}</td><td style=\"border:1px solid black\">${marks}</td><td style=\"border:1px solid black\">${timestamp}</td>'};
           var html = json2html.transform(data,transform);
        res.send("<html><body>Admin Zone<table><tr style=\"background:black;color:white;font-weight:bold;\"><td style=\"border:1px solid black\">fullname</td><td style=\"border:1px solid black\">rollno</td><td style=\"border:1px solid black\">branch</td><td style=\"border:1px solid black\">year</td><td style=\"border:1px solid black\">email</td><td style=\"border:1px solid black\">phone</td><td style=\"border:1px solid black\">codingprofilelinks</td><td style=\"border:1px solid black\">opensourcelinks</td><td style=\"border:1px solid black\">otherprofiles</td><td style=\"border:1px solid black\">score</td><td style=\"border:1px solid black\">timestamp</td><br/><\/tr>"+html+"<\/table><\/body><\/html>");
        if (err) return console.error(err);
        });
    }else{
        res.send('<h1>Illegal Access</\h1>-WebTeam Manan.')
    }
}