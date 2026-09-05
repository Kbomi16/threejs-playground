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
      <Earth position={[0, -2, 0]} />
      <Weather position={[0.5, 0, 0]} weather={'rain'} />
      <Weather position={[0, 0, 0]} weather={'clear'} />
      <Weather position={[-0.5, 0, 0]} weather={'snow'} />
    </>
  )
}

export default Scene
