const bodyParser = require('body-parser');
const express = require("express");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function (req,res) {
res.sendFile(__dirname+"/index.html")
});


app.post("/",function(req,res){
const city = req.body.cityName;

   if(city.body == null){
    res.send("Please enter the city");
   }
   const url =
   "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=83e66f29220526b9fd3624b05a3119e0&units=metric";
   https.get(url, function (response) {
   
     console.log(response.statusCode);
     response.on("data",function (data){
     const weatherData =  JSON.parse(data);
     console.log(weatherData.main.temp); 
     const weatherDescription = weatherData.weather[0].description;
     const place = weatherData.name;
   
     res.write("<h1>The Temperature in "+ place +" is : "+weatherData.main.temp+" Degree Celcius</h1> ");
     res.write("<h3>Weather Description is "+ weatherDescription+"</h3>");
   
     let imgUrl ="http://openweathermap.org/img/wn/" +weatherData.weather[0].icon+ "@2x.png";
     
     res.write("<img src="+imgUrl+">");
   
     res.send();
     }) 
   });
});


const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log("server started successfully");
});
