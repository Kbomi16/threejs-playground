import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Weather = ({ position, weather }) => {
  const glb = useLoader(GLTFLoader, '/models/weather.glb')
  console.log(glb.nodes)

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

  return (
    <mesh position={position}>
      <primitive object={weatherModel} />
    </mesh>
  )
}

export default Weather
