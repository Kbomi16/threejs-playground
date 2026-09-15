import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Player from './maps/player'
import RootMap from './maps/RootMap'

export default function MainCanvas() {
  const aspectRatio = window.innerWidth / window.innerHeight

  return (
    <Canvas
      id="canvas"
      gl={{ antialias: true }}
      camera={{
        position: [12, 12, 12],
        fov: 30,
        aspect: aspectRatio,
        near: 0.01,
        far: 100000,
      }}
    >
      <ambientLight name="ambientLight" intensity={5} />
      <directionalLight
        name="directionalLight"
        intensity={10}
        castShadow
        position={[0, 50, -50]}
        // 그림자 여드름(겹침 깨짐) 완화
        shadow-normalBias={0.1}
        // 그림자 카메라 직교 절두체 (넓을수록 넓은 영역에 그림자, 해상도는 떨어짐)
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        // 그림자를 계산할 거리 범위
        shadow-camera-near={0.1}
        shadow-camera-far={200}
      />
      <OrbitControls />
      <Player />
      <RootMap />
    </Canvas>
  )
}
