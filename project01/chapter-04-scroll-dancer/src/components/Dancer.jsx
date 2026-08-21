import { useAnimations, useGLTF, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil-next'
import { IsEnteredAtom } from '../stores'
import Loader from './Loader'

export default function Dancer() {
  const isEntered = useRecoilValue(IsEnteredAtom)

  const dancerRef = useRef(null)

  const { scene, animations } = useGLTF('/models/dancer.glb')
  const { actions } = useAnimations(animations, dancerRef)

  // offset: 스크롤이 맨 위면 0, 맨 아래면 1
  const scroll = useScroll()

  useFrame(() => {})

  useEffect(() => {
    if (!isEntered) return

    actions['wave'].play() // 춤추는 애니메이션 재생
  }, [actions, isEntered])

  if (!isEntered) return <Loader isCompleted />

  return (
    <>
      <ambientLight
        intensity={2} // 빛의 세기
      />
      <primitive ref={dancerRef} object={scene} scale={0.05} />
    </>
  )
}
