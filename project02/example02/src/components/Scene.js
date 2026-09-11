import Earth from './Earth'
import Weather from './Weather'
import { useEffect, useState } from 'react'
import { getCityWeather } from '../utils/weatherApi'
import { cities } from '../utils/cities'

const API = process.env.REACT_APP_API_KEY

const Scene = () => {
  const [content, setContent] = useState(null)

  // ! 도시 날씨 정보 조회
  const getCitiesWeather = async () => {
    try {
      const weathers = await Promise.all(
        cities.map((city) => getCityWeather(city, API)),
      )
      setContent(weathers)
    } catch (error) {
      console.error('도시 날씨 정보 조회 실패', error)
    }
  }

  useEffect(() => {
    getCitiesWeather()
  }, [])

  useEffect(() => {
    console.log(content)
  }, [content])

  return (
    <>
      <Earth />
      {content?.map((el, i) => {
        const angle = (i / (content.length - 1)) * Math.PI
        const radius = 2

        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <Weather
            key={el.city}
            position={[x, y - 1, 0]}
            rotationY={i + 1}
            weather={el.weatherData?.weather[0]?.main?.toLowerCase()}
            cityName={el.city}
          />
        )
      })}
    </>
  )
}

export default Scene
