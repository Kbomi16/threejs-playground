import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
// import Meshes from './Meshes'
import Lights from './Lights'
import Meshes2 from './Meshes2'
import Controls from './Controls'
import GLBModel from './GLBModel'
import { Dancer } from './Dancer'
import PostProcessor from './PostProcessor'
// import * as THREE from 'three'

export default function MainCanvas() {
  return (
    <Canvas
      gl={{ antialias: true }}
      // ! shadows 를 사용하는 세 가지 방법
      shadows={'soft'}
      // shadows={{ enabled: true, type: THREE.PCFSoftShadowMap }}
      // shadows
      camera={{
        pov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
        position: [5, 5, 5],
      }}
      scene={{ background: new THREE.Color('#000000') }}
    >
      <Controls />
      <Lights />
      {/* <Meshes /> */}
      <Meshes2 />
      {/* <GLBModel /> */}
      {/* <Dancer /> */}
      <PostProcessor />
    </Canvas>
  )
}
