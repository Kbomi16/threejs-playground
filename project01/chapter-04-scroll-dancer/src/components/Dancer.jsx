import { useAnimations, useGLTF, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil-next'
import { IsEnteredAtom } from '../stores'
import Loader from './Loader'
import gsap from 'gsap'
import { useThree } from '@react-three/fiber'

let timeline

export default function Dancer() {
  const isEntered = useRecoilValue(IsEnteredAtom)
  const three = useThree()

  const dancerRef = useRef(null)

  const { scene, animations } = useGLTF('/models/dancer.glb')
  const { actions } = useAnimations(animations, dancerRef)

  // offset: 스크롤이 맨 위면 0, 맨 아래면 1
  const scroll = useScroll()

  useFrame(() => {
    if (!isEntered) return

    timeline.seek(scroll.offset * timeline.duration())
  })

  useEffect(() => {
    if (!isEntered) return

    actions['wave'].play() // 춤추는 애니메이션 재생
  }, [actions, isEntered])

  useEffect(() => {
    if (!isEntered) return
    if (!dancerRef.current) return

    gsap.fromTo(
      three.camera.position,
      {
        x: -5,
        y: 5,
        z: 5,
      },
      {
        duration: 2.5,
        x: 0,
        y: 6,
        z: 12,
      },
    )

    gsap.fromTo(
      three.camera.rotation,
      {
        z: Math.PI,
      },
      {
        duration: 2.5,
        z: 0,
      },
    )
  }, [isEntered, three.camera, three.camera.rotation])

  useEffect(() => {
    if (!isEntered) return
    if (!dancerRef.current) return

    timeline = gsap.timeline()

    // 댄서가 뱅글뱅글 도는 애니메이션 (스크롤 시)
    timeline
      .from(
        dancerRef.current.rotation,
        {
          duration: 4,
          y: Math.PI * -4,
        },
        0.5,
      )
      .from(
        dancerRef.current.position,
        {
          duration: 4,
          x: 3,
        },
        '<', //
      )
      .to(
        three.camera.position,
        {
          duration: 10,
          x: 2,
          z: 8,
        },
        '<',
      )
      .to(three.camera.position, {
        duration: 10,
        x: 0,
        z: 6,
      })
      .to(three.camera.position, {
        duration: 10,
        x: 0,
        z: 16,
      })
  }, [isEntered, three.camera.position])

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
