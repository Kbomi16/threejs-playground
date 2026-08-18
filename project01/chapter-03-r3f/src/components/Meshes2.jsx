import { useBox, useSphere } from '@react-three/cannon'
import { Box, Plane, Sphere, TorusKnot } from '@react-three/drei'
import { useEffect } from 'react'

export default function Meshes2() {
  const [planeRef] = useBox(() => ({
    args: [50, 1, 50],
    type: 'Static',
    mass: 1,
    position: [0, 0, 0],
    material: {
      restitution: 1, // 탄성력
      friction: 0.5, // 마찰력
    },
    onCollide: () => {
      console.log('바닥에 충돌했다!')
    },
  }))

  const [boxRef, api] = useBox(() => ({
    args: [1, 1, 1],
    mass: 1,
    position: [-1, 2, 0],
    material: {
      restitution: 0.4, // 탄성력
      friction: 0.2, // 마찰력
    },
  }))

  const [sphereRef1, sphereApi1] = useSphere(() => ({
    mass: 5,
    position: [0.5, 8, 0],
    material: {
      restitution: 0.4,
      friction: 0.2,
    },
  }))

  const [sphereRef2, sphereApi2] = useSphere(() => ({
    mass: 0.2,
    position: [1, 5, 0],
    material: {
      restitution: 0.2,
      friction: 0.1,
    },
  }))

  useEffect(() => {
    api.applyForce([555, 50, 0], [1, 0, 0])
    sphereApi1.applyLocalForce([-555, -50, 0], [-1, 0, 0])
  }, [api, sphereApi1])

  useEffect(() => {
    const timeout = setTimeout(() => {
      api.applyLocalImpulse([0, 20.0], [0, 1, 0])
      sphereApi1.applyLocalImpulse([0, 20.0], [0, 1, 0])
    }, 3000)
    return () => clearTimeout(timeout)
  }, [sphereApi1, api])

  return (
    <>
      <Box ref={planeRef} args={[50, 1, 50]}>
        <meshStandardMaterial
          color={0xfefefe}
          roughness={0.3}
          metalness={0.8}
        />
      </Box>
      <Box ref={boxRef} args={[1, 1, 1]}>
        <meshStandardMaterial
          color={0xff0000}
          roughness={0.3}
          metalness={0.8}
        />
      </Box>
      <Sphere ref={sphereRef1}>
        <meshStandardMaterial
          color={0x00ff00}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
      <Sphere ref={sphereRef2}>
        <meshStandardMaterial
          color={0x0000ff}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
    </>
  )
}
