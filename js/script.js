$(function() {
    var openWeatherClient = new OpenWeather();

    $('#home').show();
    $('#card-tiempo').hide();
    $('#error').hide();
    $("#titulo_buscar").hide();

    $('#inicio').on('click', function() {
        $('#home').show();
        $('#card-tiempo').hide();
        $("#titulo_buscar").hide();
    });

    $('#buscar').on('click', function() {
        $('#home').hide();
        $('#card-tiempo').show();
        $("#weather").hide();
        $("#localizacion").val("");
        $("#titulo_buscar").show();
    });

    $('#actual').on('click', function() {
        $('#home').hide();
        $('#card-tiempo').hide();
        $("#titulo_buscar").hide();
        openWeatherClient.getGeoLocation();
    });
    
    $('#get-weather').on('click', function() {
        $('#error').hide();
        $("#titulo_buscar").hide();
        openWeatherClient.getWeather();
    });
});

function OpenWeather() {
    this.apiUrl = 'http://api.openweathermap.org/';
    this.ApiKey = "50ac30c78dcfb8c8369fa2068668e9a7";
}

// YA FUNCIONA, SOLO FALTA PONER LOS DATOS EN EL CARD DEL TIEMPO
OpenWeather.prototype.getWeather = function(){
    var that = this;
    var localizacion = $("#localizacion").val();
    
    const diasSemana = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];

    $.get(this.apiUrl + "data/2.5/forecast?q=" + localizacion + "&appid=" + this.ApiKey + "&units=metric").done(function(weather){
        
        if (weather.list && weather.list.length > 0){
            $("#weather").show();
            $.each(weather.list, function(index, data) {
                if (index == 0){
                    var fecha = data.dt_txt;
                    var numeroDia = new Date(fecha).getDay();
                    var nombreDia = diasSemana[numeroDia];
                    $('#temperatura').html(Math.round(data.main.temp) + "&deg;");
                    $('#diaSemana').html(nombreDia.toUpperCase());
                    $('#localizacionTiempo').html(localizacion);
                    $('.weather__description').html(data.weather[0].main);
                    $('#datos_tiempo').children('img').remove();
                    $('.weather__forecast img').remove();
                    if (data.weather[0].main == "Thunderstorm"){
                        $('#diaSemana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/11d@2x.png">');
                    }else if (data.weather[0].main == "Rain") {
                        $('#diaSemana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/10d@2x.png">');
                    }else if (data.weather[0].main == "Drizzle") {
                        $('#diaSemana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/09d@2x.png">');
                    }else if (data.weather[0].main == "Snow") {
                        $('#diaSemana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/13d@2x.png">');
                    }else if (data.weather[0].main == "Mist") {
                        $('#diaSemana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/50d@2x.png">');
                    }else if (data.weather[0].main == "Clear") {
                        $('#diaSemana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/01d@2x.png">');
                    }else if (data.weather[0].main == "Clouds") {
                        $('#diaSemana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/02d@2x.png">');
                    }
                    $('#humidity').html(data.main.humidity + "%");
                    $('#pressure').html(data.main.pressure + " mB")
                    // multiplico la velocidad * 3.6 porque la api me la da en m/s y asi lo paso a km/h
                    var wind_speed = data.wind.speed * 3.6;
                    $('#wind').html(Math.round(wind_speed) + " km/h");
                }else if(index == 8){
                    var fecha = data.dt_txt;
                    var numeroDia = new Date(fecha).getDay();
                    var nombreDia = diasSemana[numeroDia];
                    $('#1_dia_semana').html(nombreDia.toUpperCase().substring(0,3));
                    if (data.weather[0].main == "Thunderstorm"){
                        $('#1_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/11d@2x.png">');
                    }else if (data.weather[0].main == "Rain") {
                        $('#1_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/10d@2x.png">');
                    }else if (data.weather[0].main == "Drizzle") {
                        $('#1_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/09d@2x.png">');
                    }else if (data.weather[0].main == "Snow") {
                        $('#1_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/13d@2x.png">');
                    }else if (data.weather[0].main == "Mist") {
                        $('#1_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/50d@2x.png">');
                    }else if (data.weather[0].main == "Clear") {
                        $('#1_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/01d@2x.png">');
                    }else if (data.weather[0].main == "Clouds") {
                        $('#1_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/02d@2x.png">');
                    }
                    $('#1_dia_grados').html(Math.round(data.main.temp) + "&deg;");
                }else if(index == 16){
                    var fecha = data.dt_txt;
                    var numeroDia = new Date(fecha).getDay();
                    var nombreDia = diasSemana[numeroDia];
                    $('#2_dia_semana').html(nombreDia.toUpperCase().substring(0,3));
                    if (data.weather[0].main == "Thunderstorm"){
                        $('#2_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/11d@2x.png">');
                    }else if (data.weather[0].main == "Rain") {
                        $('#2_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/10d@2x.png">');
                    }else if (data.weather[0].main == "Drizzle") {
                        $('#2_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/09d@2x.png">');
                    }else if (data.weather[0].main == "Snow") {
                        $('#2_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/13d@2x.png">');
                    }else if (data.weather[0].main == "Mist") {
                        $('#2_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/50d@2x.png">');
                    }else if (data.weather[0].main == "Clear") {
                        $('#2_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/01d@2x.png">');
                    }else if (data.weather[0].main == "Clouds") {
                        $('#2_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/02d@2x.png">');
                    }
                    $('#2_dia_grados').html(Math.round(data.main.temp) + "&deg;");
                }else if(index == 24){
                    var fecha = data.dt_txt;
                    var numeroDia = new Date(fecha).getDay();
                    var nombreDia = diasSemana[numeroDia];
                    $('#3_dia_semana').html(nombreDia.toUpperCase().substring(0,3));
                    if (data.weather[0].main == "Thunderstorm"){
                        $('#3_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/11d@2x.png">');
                    }else if (data.weather[0].main == "Rain") {
                        $('#3_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/10d@2x.png">');
                    }else if (data.weather[0].main == "Drizzle") {
                        $('#3_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/09d@2x.png">');
                    }else if (data.weather[0].main == "Snow") {
                        $('#3_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/13d@2x.png">');
                    }else if (data.weather[0].main == "Mist") {
                        $('#3_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/50d@2x.png">');
                    }else if (data.weather[0].main == "Clear") {
                        $('#3_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/01d@2x.png">');
                    }else if (data.weather[0].main == "Clouds") {
                        $('#3_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/02d@2x.png">');
                    }
                    $('#3_dia_grados').html(Math.round(data.main.temp) + "&deg;");
                }else if(index == 32){
                    var fecha = data.dt_txt;
                    var numeroDia = new Date(fecha).getDay();
                    var nombreDia = diasSemana[numeroDia];
                    $('#4_dia_semana').html(nombreDia.toUpperCase().substring(0,3));
                    if (data.weather[0].main == "Thunderstorm"){
                        $('#4_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/11d@2x.png">');
                    }else if (data.weather[0].main == "Rain") {
                        $('#4_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/10d@2x.png">');
                    }else if (data.weather[0].main == "Drizzle") {
                        $('#4_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/09d@2x.png">');
                    }else if (data.weather[0].main == "Snow") {
                        $('#4_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/13d@2x.png">');
                    }else if (data.weather[0].main == "Mist") {
                        $('#4_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/50d@2x.png">');
                    }else if (data.weather[0].main == "Clear") {
                        $('#4_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/01d@2x.png">');
                    }else if (data.weather[0].main == "Clouds") {
                        $('#4_dia_semana').after('<img class="mb-4 mt-4" src="https://openweathermap.org/img/wn/02d@2x.png">');
                    }
                    $('#4_dia_grados').html(Math.round(data.main.temp) + "&deg;");
                }
            });
        }else{
            $('#home').hide();
            $('#card-tiempo').hide();
            $('#error').show();
        }
    }).fail(function(error){
        $("#weather").hide();
        $('#error').show();
    })
}

// OpenWeather.prototype.getGeoLocation() = function(){
//     navigator.geolocation.getCurrentPosition(
//         //Si el navegador entrega los datos de geolocalizacion los imprimimos
//         function (position) {
//             window.alert("nav permitido");
//             $("#nlat").text(position.coords.latitude);
//             $("#nlon").text(position.coords.longitude);
//         },
// }