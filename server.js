const express = require('express');
const hbs = require('hbs');
const fs =require('fs');
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view angine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log=`${now}:${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('unable to do sometihng');
    }
  });
  console.log(log);
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs',{
//     pageTitle:'maintenance page',
//   });
// });
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentyear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  console.log(text );
  //return text.toUpperCase();
});
app.get('/',(req,res)=>{

  res.render('home.hbs',{
    pageTitle:'Home page',
    wellcome:" welcome to my site"
  })
});

app.get('/about',(req,res)=>{
  //  res.send('about page');
  res.render('about.hbs',{
    pageTitle:'About page',

  });
});

app.get('/bad',(req,res)=>{
  res.send({
    error:"unable to do somesting"
  });
});


app.listen(3000,()=>{
  console.log('server is up on port 3000');}
);
