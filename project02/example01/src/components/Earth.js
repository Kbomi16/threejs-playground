import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function Earth(props) {
  const glb = useLoader(GLTFLoader, 'models/earth.glb')
  // glb.scene.position.x = 1
  // glb.scene.rotation.y = 1

  return (
    <mesh {...props}>
      <primitive object={glb.scene} />
    </mesh>
  )
}
