import { Canvas } from '@react-three/fiber'
import { OrbitControls, useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { DirectionalLightHelper } from 'three'

function App() {
  return (
    <Canvas camera={{ position: [0, 1, 2] }}>
      <color attach="background" args={['yellow']} />
      <Box rotation-y={1} />
      <Box position={[0, 0, -1.5]} rotation-y={1} />
      <Light />
    </Canvas>
  )
}

export default App

function Box({ ...props }) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1]} />
      <meshStandardMaterial color={'hotpink'} wireframe />
    </mesh>
  )
}

function Light() {
  const ref = useRef()

  useHelper(ref, DirectionalLightHelper, 1, 'red')

  return <directionalLight ref={ref} position={[1, 1, -1]} intensity={3} />
}
