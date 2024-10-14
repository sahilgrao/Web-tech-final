const express = require('express')

var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))
app.use('/js',express.static(__dirname+'public/js'))
app.use('/img',express.static(__dirname+'public/img'))

//app.set('views','./views')
//app.set('view engine','ejs')


app.get('/',(req,res)=>res.sendFile(__dirname + '/views/mainpage.html'))
app.get('/login',(req,res)=>res.sendFile(__dirname + '/views/login.html'))
app.get('/register',(req,res)=>res.sendFile(__dirname + '/views/register.html'))
app.get('/signsuccess',(req,res)=>res.sendFile(__dirname + '/views/signup_success.html'))
app.get('/contact',(req,res)=>res.sendFile(__dirname + '/views/contact.html'))
app.get('/games',(req,res)=>res.sendFile(__dirname + '/views/games.html'))



app.post("/log",(req,res)=>{
    var name = req.body.name;
    var password = req.body.password;

    var data = {
        "name": name,
        "password" : password
    }

    db.collection('users').find(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("found");
        globalname=name;
    });

    res.redirect('/')
    //res.render('mainpage',{name:globalname})
})

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    res.redirect('/signsuccess')
})

app.listen(port,()=>console.info("listening to port 3000"))                                                                                          