const express = require('express')
const app = express();

app.use(express.json())
app.use('/node_modules',express.static(__dirname + '/node_modules/'));
app.use('/', express.static(__dirname + '/public'));


app.get('/',(req,res)=>{
	res.redirect('index.html');
});
//app.use('/', require('./controllers'))

app.listen(8080, () =>{
    console.log("app listening to port 8080")
});



  
