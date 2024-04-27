var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');


button.addEventListener('click', function(name){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&lang=&appid=d72fb680a697371ba834bcfadc0c6812&units=metric')
    .then(response => response.json())
    .then(data => {
        var tempValue = data['main']['temp'];
        var nameValue = data['name'];
        var descValue = data['weather'][0]['description'];
        var weatherIcon = data['weather'][0]['icon'];
        main.innerHTML = nameValue;
        desc.innerHTML = descValue;
        temp.innerHTML = "Temp - "+tempValue + "°C";
        input.value ="";
  
        var imagePath = 'assets/rainy.png';
        if (weatherIcon === '01d' || weatherIcon === '01n') {
            imagePath = 'assets/sun.png';
        } else if (weatherIcon === '02d' || weatherIcon === '02n') {
            imagePath = 'assets/clear-sky.png';
        } else if (weatherIcon === '03d' || weatherIcon === '03n' || weatherIcon === '04d' || weatherIcon === '04n') {
            imagePath = 'assets/cloud.png'; 
        } else if (weatherIcon === '09d' || weatherIcon === '09n' || weatherIcon === '10d' || weatherIcon === '10n') {
            imagePath = 'assets/rain.png'; 
        } else if (weatherIcon === '11d' || weatherIcon === '11n') {
            imagePath = 'assets/extreme-weather.png';
        } else if (weatherIcon === '13d' || weatherIcon === '13n') {
            imagePath = 'assets/snow.png'; 
        }
        var weatherIconElement = document.querySelector('.weather-icon');
        weatherIconElement.src = imagePath;
  
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=d72fb680a697371ba834bcfadc0c6812&units=metric')
          .then(response => response.json())
          .then(data => {
            var precipitationValue = data['weather'][0]['main'];
            var windSpeed = data['wind']['speed'];
            
            document.querySelector('.precipitation').innerHTML = precipitationValue;
            document.querySelector('.wind').innerHTML = windSpeed + " m/s";
          })
          .catch(err => alert("dati non recuperati"));
    })
    .catch(err => alert("Nome della città inesistente"));
})