/* global geolocator */
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

function mstomph(ms) { return ms*2.23694 }

window.onload = function () {

  navigator.geolocation.getCurrentPosition(function (position) {
    Window.map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(Window.map);
    setInterval(updater, 5000, location)
    updater(position)
  })
}

function updater(location) {
  navigator.geolocation.getCurrentPosition(function(l2){
    console.log(l2)
    const speed = round(mstomph(l2.coords.speed), 2)
    $('h2.answer').text(speed)
    Window.map.setView([l2.coords.latitude, l2.coords.longitude], 13);
    // const marker = L.marker([l2.coords.latitude, l2.coords.longitude]).addTo(Window.map);
  })
}
