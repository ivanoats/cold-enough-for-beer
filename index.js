/* global geolocator */
function round(number, precision) {
  var shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision
    }
    var numArray = ('' + number).split('e')
    return +(
      numArray[0] +
      'e' +
      (numArray[1] ? +numArray[1] + precision : precision)
    )
  }
  return shift(Math.round(shift(number, precision, false)), precision, true)
}

window.onload = function () {
  var options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumWait: 20000,
    maximumAge: 0
  }

  geolocator.locate(options, function (err, location) {
    if (err) return geoLocationFail(err)
    console.log(location)
    $.get(
      'https://api.weather.gov/points/' +
        location.coords.latitude +
        ',' +
        location.coords.longitude,
      getFirstStation
    ).fail(function () {
      $('h2.answer').text('Sorry, weather service API did not work right now')
    })
  })
}

function geoLocationFail(err) {
  $('h2.answer').text(
    'Sorry, geolocation did not work, or is not enabled in your browser'
  )
  console.error(err.message)
}

// get the list of weather stations near the user's location
function getFirstStation(data) {
  var observationStationsURL = data.properties.observationStations
  $.get(observationStationsURL, function (stations) {
    stationData(stations.observationStations[0])
  }).fail(function () {
    $('h2.answer').text(
      'Sorry, the Weather Service API observations stations list was not available'
    )
  })
}

// get current observation for station
function stationData(url) {
  $.get(url, function (stationData) {
    $.get(
      `https://api.weather.gov/stations/${stationData.properties.stationIdentifier}/observations/current`,
      function (data) {
        updater(data.properties.temperature.value)
        $('span.location').text(stationData.properties.name)
      }
    )
  })
}

function updater(tmp) {
  var tempF = round(tmp * (9 / 5) + 32, 0)
  var coldEnough = tempF <= 46
  if (coldEnough) {
    $('h2.answer').text('🍺 HELL YEAH!')
  } else {
    // eslint-disable-next-line prettier/prettier
    $('h2.answer').text('🌴 No way, José. It\'s only ' + tempF + ' degrees.')
  }
}
