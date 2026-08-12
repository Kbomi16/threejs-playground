import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Meshes from './Meshes'

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
      <directionalLight
        args={[0xffffff, 5]}
        position={[4, 4, 4]}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        castShadow
      />
      <Meshes />
    </Canvas>
  )
}
