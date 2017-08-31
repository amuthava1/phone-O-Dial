//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/sales');
//onconnection
mongoose.connection.on('connected',()=>{
    console.log('connected to mongob');
});
mongoose.connection.on('error',(err)=>{
    if(err)
        {
            console.log('error to database connection:'+err);
        }
});
//port no
const port = 3000;
//adding middleware
app.use(cors());
//adding body parser
app.use(bodyparser.json());
//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route); 
//testing server
app.get('/',(req, res)=>{
    res.send('foobar');
})
app.listen(port,()=>{
    console.log('Server started at port:'+port);
});