import { Canvas, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

function App() {
  return (
    <Canvas camera={{ position: [0, 1, 5] }}>
      <color attach="background" args={['yellow']} />
      <Light />
      <Model position={[0, -2, 0]} />
    </Canvas>
  )
}

export default App

function Light() {
  const ref = useRef()

  return <directionalLight ref={ref} position={[1, 3, -1]} intensity={3} />
}

function Model({ ...props }) {
  const glb = useLoader(GLTFLoader, 'models/earth.glb')
  // glb.scene.position.x = 1
  // glb.scene.rotation.y = 1

  return (
    <mesh {...props}>
      <primitive object={glb.scene} />
    </mesh>
  )
}
