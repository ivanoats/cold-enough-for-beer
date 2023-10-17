/* global geolocator */
/**
 * @param {number} number
 * @param {number} precision
 */
function round(number, precision) {
  const shift = function (num, precis, reverseShift) {
    if (reverseShift) {
      precis = -precis
    }
    const numArray = ('' + num).split('e')
    return +(
      numArray[0] + 'e' + (numArray[1] ? +numArray[1] + precis : precis)
    )
  }
  return shift(Math.round(shift(number, precision, false)), precision, true)
}

window.onload = function () {
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumWait: 20000,
    maximumAge: 0
  }

  // @ts-ignore
  geolocator.locate(options, function (err, location) {
    if (err) return geoLocationFail(err, location)
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

function geoLocationFail(err, location) {
  $('h2.answer').text(
    'Sorry, geolocation did not work, or is not enabled in your browser'
  )
  console.error(err.message)
  console.log(location)
}

// get the list of weather stations near the user's location
function getFirstStation(data) {
  const observationStationsURL = data.properties.observationStations
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
  $.get(url, function (station) {
    $.get(
      `https://api.weather.gov/stations/${station.properties.stationIdentifier}/observations/`,
      function (data) {
        updater(data.features[0].properties.temperature.value)
        $('span.location').text(station.properties.name)
      }
    )
  })
}

function updater(tmp) {
  const tempF = round(tmp * (9 / 5) + 32, 0)
  const coldEnough = tempF <= 46
  if (coldEnough) {
    $('h2.answer').text('🍺 HELL YEAH!')
  } else {
    $('h2.answer').text('🌴 No way, José. It\'s only ' + tempF + ' degrees.')
  }
}
