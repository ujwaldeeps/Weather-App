const argv = require('yargs').options({
    a:{
        demand:true,
        describe: 'Address to know weather for',
        alias:'address',
        string:true
    }
})
.help()
.alias('help','h')
.argv;

const axios = require('axios');
const encodedAddress = encodeURIComponent(argv.address);
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(url)
.then((response)=>{
      if(response.data.status=== 'ZERO_RESULTS' )
         {
             throw new Error('Invalid Address Entered');
         }

      var lat=response.data.results[0].geometry.location.lat;
      var lng=response.data.results[0].geometry.location.lng;
      
     // console.log(lat,lng);
     var weatherUrl = `https://api.darksky.net/forecast/c7dbe896f309b6c335ccd26c859a9c04/${lat},${lng}`;
     return axios.get(weatherUrl);
})
.then((response)=>{
        var temperature = (response.data.currently.temperature-32)*(5/9);
        console.log(temperature.toPrecision(4));
    })

.catch((err)=>{
    if(e.code=='ENOTFOUND')
        {
            console.log('Unable to connect');
        }
   console.log(err.message);
});

