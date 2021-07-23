const localInfo = document.querySelector('.local-info')
const time = localInfo.querySelector('.time')
const ampm = localInfo.querySelector('.ampm')

const calendar = localInfo.querySelector('.date')

const weather = localInfo.querySelector('.weather')
const weatherIcon = weather.querySelector('.weather-icon')
const weatherInfo = weather.querySelector('.weather-info')
const weatherRefreshBtn = weather.querySelector('.weather-refresh-btn')

let weatherTemp = document.createElement('h1')
let weatherName = document.createElement('h3')
let weatherLocation = document.createElement('p')

const WEATHER_API_KEY = '7b6faccf71e614cc2afcf18921927f13'
const COORDS = 'coords'

function getTime() {
  let myDate = new Date()
  let hours = myDate.getHours()
  let minutes = myDate.getMinutes()

  time.innerHTML = `${
    hours == 0
      ? '12'
      : hours < 10
      ? `0${hours}`
      : hours > 12
      ? `${hours % 12 < 10 ? `0${hours % 12}` : hours % 12}`
      : hours
  }:${minutes < 10 ? `0${minutes}` : minutes}`

  ampm.innerHTML = `${hours > 11 ? 'PM' : 'AM'}`
}

function dayConverter(day) {
  let dayArray = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  return dayArray[day]
}

function getDate() {
  let myDate = new Date()
  let year = myDate.getFullYear()
  let month = myDate.getMonth()
  let date = myDate.getDate()
  let day = myDate.getDay()

  calendar.innerHTML = `${year}.${month + 1}.${date} ${dayConverter(day)}`
}

function refreshWeather() {
  localStorage.removeItem(COORDS)
  weatherInfo.innerText = 'Loading...'
  weatherIcon.removeChild(weatherIcon.childNodes[0])
  askForCoords()
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      const iconID = json.weather[0].icon
      const temp = json.main.temp
      const name = json.weather[0].main
      const place = json.name

      let icon = document.createElement('img')
      icon.setAttribute(
        'src',
        `https://openweathermap.org/img/wn/${iconID}@2x.png`
      )
      icon.setAttribute('alt', 'weather icon')
      weatherIcon.appendChild(icon)

      weatherInfo.innerText = ''
      weatherTemp.innerHTML = `${temp} ℃`
      weatherTemp.classList.add('temp')
      weatherName.innerHTML = name
      weatherName.classList.add('name')
      weatherLocation.innerHTML = place
      weatherLocation.classList.add('location')

      weatherInfo.appendChild(weatherTemp)
      weatherInfo.appendChild(weatherName)
      weatherInfo.appendChild(weatherLocation)
    })
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSucces(position) {
  console.log(position.coords)
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  const coordsObj = {
    latitude,
    longitude,
  }
  saveCoords(coordsObj)
  getWeather(latitude, longitude)
}

function handleGeoFail() {
  console.log('CANNOT ACCESS LOCATION')
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoFail)
}

function init() {
  getTime()
  setInterval(getTime, 1000)

  getDate()
  setInterval(getDate, 1000)

  const currentWeather = localStorage.getItem(COORDS)
  if (currentWeather == null) {
    askForCoords()
  } else {
    const parsedCoords = JSON.parse(currentWeather)
    getWeather(parsedCoords.latitude, parsedCoords.longitude)
  }

  weatherRefreshBtn.addEventListener('click', refreshWeather)
}

init()
