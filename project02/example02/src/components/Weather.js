import { useFrame, useLoader } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { motion } from 'r3f-motion'
import CityName from './CityName'

const Weather = ({ position, weather, rotationY, cityName }) => {
  const [isHover, setIsHover] = useState(false)

  const glb = useLoader(GLTFLoader, '/models/weather.glb')
  const ref = useRef(null)

  // let weatherModel

  // if (glb.nodes[weather]) {
  //   weatherModel = glb.nodes[weather].clone()
  // } else {
  //   weatherModel = glb.nodes.cloud.clone()
  // }

  const weatherModel = useMemo(() => {
    const cloneModel = glb.nodes[weather] || glb.nodes.cloud
    return cloneModel.clone()
  }, [weather, glb.nodes])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta
    }
  })

  return (
    <group
      position={position}
      rotation-y={rotationY}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
    >
      <motion.mesh whileHover={{ scale: 1.5, transition: 0.5 }} ref={ref}>
        <primitive object={weatherModel} />
      </motion.mesh>
      {isHover && <CityName name={cityName} />}
    </group>
  )
}

export default Weather
