const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials')

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log+'\n');
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
//     });

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name:'Rishu',
    //     likes:[
    //         'Biking',
    //         'Cities'
    //     ]
    // });
    res.render('home.hbs',{
        pageTitle:'Home Page',
        homePageMessage:'Welcome to home Page',
       // currentYear: new Date().getFullYear()
    });
});

app.get('/about',(req,res)=>{
   // res.send('About Page');
   res.render('about.hbs',{
       pageTitle:'About Page',
      // currentYear: new Date().getFullYear()
   });
});

app.get('/projects',(req,res)=>{
    
    res.render('projects.hbs',{
        pageTitle:'About Page',
      
    });
 });

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:"Unable to handle request"
    });
});


app.listen(port,()=>{
    console.log(`Server is up on the port ${port}`);
});