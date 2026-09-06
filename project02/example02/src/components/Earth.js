import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useRef } from 'react'

const Earth = () => {
  const glb = useLoader(GLTFLoader, '/models/earth.glb')
  const ref = useRef(null)

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1
    }
  })

  return (
    <mesh scale={1.3} rotation-x={Math.PI / 2} ref={ref} position={[0, -2, 0]}>
      <primitive object={glb.scene} />
    </mesh>
  )
}

export default Earth
