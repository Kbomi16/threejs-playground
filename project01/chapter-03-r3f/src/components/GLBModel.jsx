import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

export default function GLBModel() {
  const [currentAnimation, setCurrentAnimation] = useState('wave')

  // const three = useThree()
  const { scene, animations } = useGLTF('/dancer.glb')
  const ref = useRef(null)

  const { actions } = useAnimations(animations, ref)

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene, actions])

  useEffect(() => {
    actions[currentAnimation].fadeIn(0.5).play()

    return () => {
      actions[currentAnimation].fadeOut(0.5).stop()
    }
  }, [currentAnimation, actions])

  // state 값 = useThree 로 얻은 값과 같다?
  useFrame((state, delta) => {})

  return (
    <primitive
      ref={ref}
      onPointerUp={() => console.log('포인터 업')}
      onPointerDown={() => console.log('포인터 다운')}
      onClick={(prev) => {
        setCurrentAnimation((prev) => {
          if (prev === 'wave') return 'windmill'
          return 'wave'
        })
      }}
      scale={0.01}
      object={scene}
      position-y={0.8}
    />
  )
}
