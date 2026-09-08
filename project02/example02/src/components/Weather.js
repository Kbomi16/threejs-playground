import { useFrame, useLoader } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { motion } from 'r3f-motion'

const Weather = ({ position, weather, rotationY }) => {
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
    <motion.mesh
      whileHover={{ scale: 1.5, transition: 0.5 }}
      position={position}
      ref={ref}
      rotation-y={rotationY}
    >
      <primitive object={weatherModel} />
    </motion.mesh>
  )
}

export default Weather
