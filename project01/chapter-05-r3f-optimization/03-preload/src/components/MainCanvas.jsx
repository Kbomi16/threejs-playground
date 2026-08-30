import { Html, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import TestMesh from './TestMesh'
import { useCallback, useEffect, useState } from 'react'
import { Suspense } from 'react'

export default function MainCanvas() {
  const [isLoading, setIsLoading] = useState(true)

  const handleModelLoaded = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleModelLoaded()
      console.log('로딩 끝!')
    }, 5000)

    return () => clearTimeout(timeout)
  }, [handleModelLoaded])

  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100000,
        position: [10, 10, 10],
      }}
      scene={{ background: new THREE.Color('#000') }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[100, 100, 100]} />
      <OrbitControls />
      <Suspense fallback={<Html>Loading...</Html>}>
        {isLoading ? null : <TestMesh />}
      </Suspense>
    </Canvas>
  )
}

// 모델 로딩 전에 미리 로딩
useGLTF.preload([
  '/dancer01.glb',
  '/dancer02.glb',
  '/dancer03.glb',
  '/dancer04.glb',
  '/dancer05.glb',
  '/dancer06.glb',
  '/dancer07.glb',
  '/dancer08.glb',
  '/dancer09.glb',
  '/dancer10.glb',
  '/dancer11.glb',
  '/dancer12.glb',
  '/dancer13.glb',
  '/dancer14.glb',
  '/dancer15.glb',
  '/dancer16.glb',
  '/dancer17.glb',
  '/dancer18.glb',
  '/dancer19.glb',
  '/dancer20.glb',
  '/dancer21.glb',
])
