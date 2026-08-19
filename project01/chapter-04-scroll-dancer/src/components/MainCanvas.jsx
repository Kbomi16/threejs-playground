import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import Dancer from './Dancer'

export default function MainCanvas() {
  const aspectRatio = window.innerWidth / window.innerHeight
  return (
    <Canvas
      id="canvas"
      gl={{ antialias: true }} // 가장자리 계단 현상 방지
      shadows="soft"
      camera={{
        fov: 30,
        aspect: aspectRatio,
        near: 0.01,
        far: 1000,
        position: [0, 6, 12],
      }}
      scene={{ background: new THREE.Color('#000') }}
    >
      <OrbitControls />
      <Dancer />
    </Canvas>
  )
}
