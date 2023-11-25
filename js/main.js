const searchBtn = document.querySelector("#search-btn")
const city = document.querySelector("#city")
const temp = document.querySelector("#temp")
const img = document.querySelector("#img")
const humidity = document.querySelector(".humidity")
const wind = document.querySelector(".wind")
const desc = document.querySelector("#desc")
const day_time = document.querySelector(".date-time")

// The forcasted globals
const contaier = document.querySelector(".forcast-container")
const futureDay = document.querySelector(".future-day")
const futureImg = document.querySelector(".future-img")
const futureTemp = document.querySelector(".future-temp")

// The time
const d = new Date()
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
]

const min = d.getMinutes() > 10 ? d.getMinutes() : `0${d.getMinutes()}`
const hours = d.getHours() > 10 ? d.getHours() : `0${d.getHours()}`
const day = days[d.getDay()]

day_time.textContent = `${day}, ${hours}:${min}`

async function showData(response) {
	const d = new Date()
	const min = d.getMinutes() > 10 ? d.getMinutes() : `0${d.getMinutes()}`
	const hours = d.getHours() > 10 ? d.getHours() : `0${d.getHours()}`
	const day = days[d.getDay()]
	day_time.textContent = `${day}, ${hours}:${min}`

	let data = response.data
	city.textContent = data.city
	temp.textContent = Math.round(data.temperature.current)
	img.src = data.condition.icon_url
	humidity.textContent = `${data.temperature.humidity} % `
	wind.textContent = ` ${data.wind.speed} km/h`
	desc.textContent = data.condition.description
	// console.log(data)
}

searchBtn.addEventListener("click", (e) => {
	e.preventDefault()
	const searchInput = document.querySelector("#search-input").value
	const current = `https://api.shecodes.io/weather/v1/current?query=${searchInput}&key=fof4f42f9bd4t90cc59f3c0da512e140&units=metric`
	axios.get(current).then(showData)

	const forecast = `https://api.shecodes.io/weather/v1/forecast?query=${searchInput}&key=fof4f42f9bd4t90cc59f3c0da512e140&units=metric`
	axios.get(forecast).then(getForcast)

	document.querySelector("#search-input").value = ""
})

async function getForcast(res) {
	let forcastedArr = res.data.daily
	let d = new Date()
	let dayIndex = d.getDay() === 6 ? 0 : d.getDay() + 1
	let html = ""
	forcastedArr.forEach((day, index) => {
		html += `
		<div class="forcast-container"> 
			<span class="future-day uppercase bold">${days[dayIndex]}</span>
			<img class="future-img" src="${day.condition.icon_url}" alt="">
			<span class="future-temp text-2xl bold">${Math.round(
				day.temperature.day
			)} °C</span>
		</div>
		`
		dayIndex++
		console.log(day)
	})
	contaier.innerHTML = html
}
// Days
//

// Initial call
