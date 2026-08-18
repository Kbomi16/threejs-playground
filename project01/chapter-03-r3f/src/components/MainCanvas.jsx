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
import { Physics } from '@react-three/cannon'

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
      {/* Physics: cannon 월드. useBox/useSphere 등 물리 훅은 이 안에서만 사용 */}
      <Physics
        gravity={[0, -9, 0]} // 중력 [x, y, z]. 지구 ≈ [0, -9.81, 0]
        defaultContactMaterial={{
          // 바디 material.restitution 이 아니라 여기 값이 실제 탄성에 쓰임
          restitution: 0.1, // 탄성 (0=안 튕김, 1=완전탄성)
          friction: 0.5, // 마찰력
        }}
      >
        <Lights />
        <Meshes2 />
      </Physics>
      {/* OrbitControls 는 물리와 무관해서 Physics 밖에 둠 */}
      <Controls />
      {/* <Meshes /> */}
      {/* <GLBModel /> */}
      {/* <Dancer /> */}
      {/* <PostProcessor /> */}
    </Canvas>
  )
}
