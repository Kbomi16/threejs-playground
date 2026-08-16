import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

export default function GLBModel() {
  const three = useThree()
  const { scene, animations } = useGLTF('/dancer.glb')
  const ref = useRef(null)

  const { actions } = useAnimations(animations, ref)

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }

      actions['wave'].play()
    })
  }, [scene, actions])

  // state 값 = useThree 로 얻은 값과 같다?
  useFrame((state, delta) => {})

  return <primitive ref={ref} scale={0.01} object={scene} position-y={0.8} />
}
