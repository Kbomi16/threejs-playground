import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import {
  // OrbitControls,
  ScrollControls,
} from '@react-three/drei'
import Dancer from './Dancer'
import Loader from './Loader'
import { Suspense } from 'react'
import MovingDom from './dom/MovingDom'
import { useRecoilValue } from 'recoil-next'
import { IsEnteredAtom } from '../stores'

export default function MainCanvas() {
  const isEntered = useRecoilValue(IsEnteredAtom)
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
      <ScrollControls
        pages={isEntered ? 8 : 0} // 페이지 수 -> 많을 수록 스크롤이 더 생김
        damping={0.25} // 스크롤 감쇠
      >
        <Suspense fallback={<Loader />}>
          <MovingDom />
          <Dancer />
        </Suspense>
      </ScrollControls>
      {/* <OrbitControls /> */}
    </Canvas>
  )
}
