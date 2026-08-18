import { useBox, useSphere } from '@react-three/cannon'
import { Box, Plane, Sphere, TorusKnot } from '@react-three/drei'
import { useEffect } from 'react'

export default function Meshes2() {
  // useBox/useSphere: [메시 ref, 물리 api]. args 는 아래 시각 메시와 같아야 함
  // Static: 안 움직임 (바닥/벽). mass 는 무시됨
  const [planeRef] = useBox(() => ({
    args: [50, 1, 50],
    type: 'Static',
    mass: 1,
    position: [0, 0, 0], // 중심. 두께 1이라 윗면은 y=0.5
    material: {
      restitution: 1, // 탄성 — ContactMaterial 없으면 Physics 기본값이 우선
      friction: 0.5, // 마찰력
    },
    onCollide: () => {
      console.log('바닥에 충돌했다!')
    },
  }))

  // Dynamic (기본): 중력·힘·충돌에 반응. api 로 applyForce 등 호출
  const [boxRef, api] = useBox(() => ({
    args: [1, 1, 1],
    mass: 1,
    position: [-1, 2, 0],
    material: {
      restitution: 0.4,
      friction: 0.2,
    },
  }))

  // args 생략 시 반지름 기본값 1. mass 가 클수록 같은 힘에 덜 움직임
  const [sphereRef1, sphereApi1] = useSphere(() => ({
    mass: 5,
    position: [0.5, 8, 0],
    material: {
      restitution: 0.4,
      friction: 0.2,
    },
  }))

  // 힘/임펄스를 안 줘서 중력만 받음
  const [sphereRef2, sphereApi2] = useSphere(() => ({
    mass: 0.2,
    position: [1, 5, 0],
    material: {
      restitution: 0.2,
      friction: 0.1,
    },
  }))

  // Force: 한 물리 스텝만 적용. 지속하려면 useFrame 에서 매 프레임 호출
  // 두 번째 인자 = 작용점. 중심이 아니면 회전(토크)도 생김
  useEffect(() => {
    api.applyForce([555, 50, 0], [1, 0, 0]) // 월드 좌표로 밀기
    sphereApi1.applyLocalForce([-555, -50, 0], [-1, 0, 0]) // 물체 로컬 좌표로 밀기
  }, [api, sphereApi1])

  // Impulse: 운동량을 즉시 더함 (점프/펀치). Local = 물체 기준 방향
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
