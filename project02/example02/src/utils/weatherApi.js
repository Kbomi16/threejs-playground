// ! 날씨 정보 GET
export const getCurrentWeather = async (lat, lon, key) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('날씨 정보 GET 실패', error)
    return null
  }
}

// ! 도시 날씨 정보 GET
// units=metric: 섭씨 단위로 변환
export const getCityWeather = async (city, key) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return {
      city: city,
      weatherData: data,
    }
  } catch (error) {
    console.error('도시 날씨 정보 GET 실패', error)
    return null
  }
}
