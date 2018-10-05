var currentWeatherResults = $('#currentWeatherResults')
// hide weather results by default
currentWeatherResults.hide()

$(function() {
    // City search handler
    var citySearchInput = $('#city-search-input')

    // City submit handler
    const OPEN_WEATHER_MAP_API_KEY = '4f426beddea168d69f525fbf80de178a'
    var weatherSearchButton = $('#weatherSearchButton')

    // Setup weather card variables here
    var weatherImage = $('#weatherImage')
    var weatherLocation = $('#weatherLocation')
    var weatherConditions = $('#weather')
    var low = $('#low')
    var high = $('#high')
    var humidityNode = $('#humidity')
    var windNode = $('#wind')

    weatherSearchButton.click(function(e) {
        e.preventDefault()
        var value = citySearchInput.val()

        var url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${OPEN_WEATHER_MAP_API_KEY}&q=${value}`
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(parsed_json) {
                var location = parsed_json['name'];
                var weather = parsed_json['weather'][0]['main'];
                var temp = parsed_json['main']['temp'];
                var weather_icon = parsed_json['weather'][0]['icon'];
                var humidity = parsed_json['main']['humidity'];
                var temp_min = parsed_json['main']['temp_min'];
                var temp_max = parsed_json['main']['temp_max'];
                var wind_speed = parsed_json['wind']['speed'];
                var weatherImageHref = "http://openweathermap.org/img/w/" + weather_icon + ".png"
                weatherImage.attr('src', weatherImageHref)
                weatherLocation.html(location)
                weatherConditions.html(weather + " (" + temp + "&#8457;)")
                low.html(temp_min + "&#8457;")
                high.html(temp_max + "&#8457;")
                humidityNode.html(humidity + "%")
                windNode.html(wind_speed + "mph")
                currentWeatherResults.show()

                if (weather === "Rain") {
                    stopRainButton.trigger("click")
                    rainButton.trigger("click")
                }
                else if (weather === "Clear") {
                    stopRainButton.trigger("click")
                }
                else if (weather === "Clouds") {
                    stopRainButton.trigger("click")
                    cloudButton.trigger("click")
                }
                else if (weather === "Snow") {
                    stopRainButton.trigger("click")
                    snowButton.trigger("click")
                }
                else {
                    stopRainButton.trigger("click")
                }
            }
        })
    })

    // Clear button handler
    var clearButton = $('#clearButton')

    clearButton.click(function(e) {
        e.preventDefault()

        citySearchInput.val('')
        currentWeatherResults.hide()
    })

    // Create rain effect
    var rainButton = $('#rainButton')
    var cloudButton = $('#cloudButton')
    var snowButton = $('#snowButton')
    var stopRainButton = $('#stopRainButton')

    // disable snow initially
    setTimeout(function() {
        stopRainButton.trigger("click");
    }, 50)

    rainButton.click(function(e) {
        e.preventDefault()
        stopRainButton.prop('disabled', false)

        $('.jumbotron').addClass('rain')
        $('body').addClass('rain')
        createRain()
        rainButton.prop('disabled', true)
        cloudButton.prop('disabled', true)
        snowButton.prop('disabled', true)
    })

    cloudButton.click(function(e) {
        e.preventDefault()
        stopRainButton.prop('disabled', false)

        $('.jumbotron').addClass('rain')
        $('body').addClass('rain')
        cloudButton.prop('disabled', true)
    })

    snowButton.click(function(e) {
        e.preventDefault()
        stopRainButton.prop('disabled', false)
        snowStorm.autoStart = true

        $('.jumbotron').addClass('rain')
        $('body').addClass('rain')
        snowStorm.resume()
        snowButton.prop('disabled', true)
        rainButton.prop('disabled', true)
        cloudButton.prop('disabled', true)
    })

    stopRainButton.click(function(e) {
        e.preventDefault()
        stopRainButton.prop('disabled', true)
        clearClouds()
        clearSnow()
        stopRain()
    })

    // number of drops created.
    var nbDrop = 858;

    // function to generate a random number range.
    function randRange(minNum, maxNum) {
        return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    }

    // function to generate drops
    function createRain() {
        for (i = 1; i < nbDrop; i++) {
            var dropLeft = randRange(0, 1600);
            var dropTop = randRange(-1000, 1400);

            $('.rain').append('<div class="drop" id="drop' + i + '"></div>');
            $('#drop' + i).css('left', dropLeft);
            $('#drop' + i).css('top', dropTop);
        }
    }


    // Make it stop raining
    function stopRain() {
        rainButton.prop('disabled', false)
        $('.drop').remove()
        $('.jumbotron').removeClass('rain')
        $('body').removeClass('rain')
        stopRainButton.prop('disabled', true)
    }

    // clear clouds
    function clearClouds() {
        cloudButton.prop('disabled', false)
        $('.jumbotron').removeClass('rain')
        $('body').removeClass('rain')
        stopRainButton.prop('disabled', true)
    }

    // clear snow
    function clearSnow() {
        snowButton.prop('disabled', false)
        $('.jumbotron').removeClass('rain')
        $('body').removeClass('rain')
        snowStorm.stop()
        stopRainButton.prop('disabled', true)
    }
})
