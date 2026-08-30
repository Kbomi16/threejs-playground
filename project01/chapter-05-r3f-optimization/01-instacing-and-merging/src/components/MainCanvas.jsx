import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
// import InstacnedBoxes from './InstacnedBoxes'
import MergedMesh from './MergedMesh'

export default function MainCanvas() {
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100000,
        position: [5, 5, 5],
      }}
      scene={{ background: new THREE.Color('#000') }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[100, 100, 100]} />
      <OrbitControls />
      {/* <InstacnedBoxes /> */}
      <MergedMesh />
    </Canvas>
  )
}
