import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
// import Meshes from './Meshes'
import Lights from './Lights'
import Meshes2 from './Meshes2'

export default function MainCanvas() {
  return (
    <Canvas
      gl={{ antialias: true }}
      shadows={'soft'}
      camera={{
        pov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
        position: [5, 5, 5],
      }}
      scene={{ background: new THREE.Color('#000000') }}
    >
      <OrbitControls />
      <Lights />
      {/* <Meshes /> */}
      <Meshes2 />
    </Canvas>
  )
}
