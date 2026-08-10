import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

export default function MainCanvas() {
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{
        pov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
        position: [5, 5, 5],
      }}
      scene={{ background: new THREE.Color('#000000') }}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={'#ff0000'} />
      </mesh>
    </Canvas>
  )
}
