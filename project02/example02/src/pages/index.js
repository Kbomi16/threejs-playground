import { Canvas } from '@react-three/fiber'
import Lights from '../components/Lights'
import { lazy, Suspense } from 'react'

export default function Home() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <color attach="background" args={['rgb(67, 127, 240) 100%)']} />
      <Suspense fallback={<Sphere />}>
        <Lights />
        <Scene />
      </Suspense>
    </Canvas>
  )
}

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1]} />
      <meshBasicMaterial color="white" />
    </mesh>
  )
}

const Scene = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('../components/Scene')), 1000)
  })
})
