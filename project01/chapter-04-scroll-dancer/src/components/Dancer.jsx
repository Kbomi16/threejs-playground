import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'

export default function Dancer() {
  const dancerRef = useRef(null)

  const { scene, animations } = useGLTF('/models/dancer.glb')
  const { actions } = useAnimations(animations, dancerRef)

  useEffect(() => {
    actions['wave'].play() // 춤추는 애니메이션 재생
  }, [actions])

  return (
    <>
      <ambientLight
        intensity={2} // 빛의 세기
      />
      <primitive
        ref={dancerRef}
        object={scene}
        scale={0.01}
        position={[0, -1, 0]}
      />
    </>
  )
}
