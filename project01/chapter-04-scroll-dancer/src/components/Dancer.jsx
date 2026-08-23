import {
  Box,
  Circle,
  Points,
  useAnimations,
  useGLTF,
  useScroll,
  useTexture,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil-next'
import { IsEnteredAtom } from '../stores'
import Loader from './Loader'
import gsap from 'gsap'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

let timeline

const PARTICLE_COUNT = 500
const positions = new Float32Array(PARTICLE_COUNT * 3)
for (let i = 0; i < positions.length; i++) {
  positions[i] = (Math.random() - 0.5) * 25
}

export default function Dancer() {
  const isEntered = useRecoilValue(IsEnteredAtom)
  const three = useThree()

  const dancerRef = useRef(null)

  const { scene, animations } = useGLTF('/models/dancer.glb')
  const texture = useTexture('/textures/5.png')

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
      {/* primitive: GLB에서 불러온 댄서 3D 모델 */}
      <primitive ref={dancerRef} object={scene} scale={0.05} />
      {/* ambientLight: 방향 없이 장면 전체를 고르게 비추는 환경광 */}
      <ambientLight
        intensity={2} // 빛의 세기
      />
      {/* rectAreaLight: 사각형 면광원. 부드러운 조명 */}
      <rectAreaLight position={[0, 10, 0]} intensity={30} />
      {/* pointLight: 한 점에서 사방으로 퍼지는 점광원 */}
      <pointLight
        position={[0, 5, 0]}
        intensity={45}
        castShadow
        receiveShadow
      />
      {/* hemisphereLight: 하늘색/땅색으로 위아래를 다르게 비추는 반구광 */}
      <hemisphereLight
        position={[0, 5, 0]}
        intensity={0}
        groundColor={'lime'}
        color={'blue'}
      />
      {/* Box: 큰 정육면체 메시. 방을 감싸는 배경으로 사용 */}
      <Box position={[0, 0, 0]} args={[100, 100, 100]}>
        {/* meshStandardMaterial: 빛에 반응하는 표준 재질. DoubleSide는 안쪽 면도 렌더 */}
        <meshStandardMaterial color={'#dc4f00'} side={THREE.DoubleSide} />
      </Box>
      {/* Circle: 원판 메시. 바닥으로 사용 */}
      <Circle
        receiveShadow
        castShadow
        args={[8, 32]} // 반지름, 분할 수
        rotation-x={-Math.PI / 2}
        position-y={-4.4}
      >
        <meshStandardMaterial color={'#dc4f00'} side={THREE.DoubleSide} />
      </Circle>

      {/* Points: 점(파티클)을 그리는 컴포넌트 */}
      <Points positions={positions.slice(0, positions.length / 3)}>
        <pointsMaterial
          size={0.5} // 각 점(파티클)의 크기
          color="#dc4f00" // 점의 색상
          sizeAttenuation // 카메라와 멀어질수록 점이 작아짐 (원근감)
          depthWrite // 깊이 버퍼에 기록. 뒤에 있는 물체가 가려지게 함
          alphaMap={texture} // 텍스처의 밝기로 점의 투명 영역을 결정
          transparent // 알파(투명) 렌더링 활성화. alphaMap이 보이려면 필요
          alphaTest={0.001} // 알파가 이 값보다 낮으면 픽셀을 그리지 않음 (가장자리 잔상 제거)
        />
      </Points>
      <Points
        positions={positions.slice(
          positions.length / 3,
          (positions.length * 2) / 3,
        )}
      >
        <pointsMaterial
          size={0.5}
          color="#dc4f00"
          sizeAttenuation
          depthWrite
          alphaMap={texture}
          transparent
          alphaTest={0.001}
        />
      </Points>
      <Points
        positions={positions.slice(
          (positions.length * 2) / 3,
          positions.length,
        )}
      >
        <pointsMaterial
          size={0.5}
          color="#dc4f00"
          sizeAttenuation
          depthWrite
          alphaMap={texture}
          transparent
          alphaTest={0.001}
        />
      </Points>
    </>
  )
}
