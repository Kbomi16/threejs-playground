import { SpotLight, useHelper } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function Lights() {
  const ref = useRef()

  // ! useHelper를 사용하려면 ref를 지정해야 한다.
  // useHelper(ref, THREE.DirectionalLightHelper, 1, 'red')

  // useHelper(ref, THREE.PointLightHelper, 1, '0xff0000')

  // useHelper(ref, THREE.HemisphereLightHelper, 1, '0xffffff')

  useHelper(ref, THREE.SpotLightHelper, 1, '0xffffff')

  const targetRef = useRef(null)
  const [target, setTarget] = useState()

  useEffect(() => {
    if (targetRef.current) {
      setTarget(targetRef.current)
    }
  }, [])

  return (
    <>
      {/* <ambientLight args={[0xffffff, 0.5]} /> */}

      {/* <directionalLight
        ref={ref}
        args={[0xffffff, 5]}
        position={[4, 4, 4]}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        castShadow
      /> */}

      {/* <pointLight
        ref={ref}
        args={[0xffffff, 10, 10, 1]}
        position={[0, 5, 0]}
        castShadow
      /> */}

      {/* <hemisphereLight
        ref={ref}
        args={[0x0000ff, 0x000000, 5]}
        position-y={2}
      /> */}

      {/* <rectAreaLight
        ref={ref}
        args={[0xffffff, 5, 4, 4]}
        position={[0, 1, 0]}
        rotation-x={-Math.PI / 2}
      /> */}

      {/* <spotLight
        ref={ref}
        args={[0xffffff, 10, 100, Math.PI / 4, 1, 0.5]}
        position={[3, 3, 3]}
        castShadow
      /> */}

      <SpotLight
        color={'0xffffff'}
        intensity={10} // 밝기
        distance={100} // 빛이 도달하는 거리
        angle={Math.PI / 4} // 빛이 퍼지는 각도
        penumbra={1} // 빛의 가장자리 부드럽게
        decay={0.5} // 빛의 감쇠 정도
        anglePower={100} // 빛의 각도에 따른 밝기 변화
        attenuation={1} // 빛의 감쇠 정도
        radiusTop={1} // 원뿔 상단 반지름
        radiusBottom={10} // 원뿔 하단 반지름
        opcacity={1} // 빛의 투명도
        volumetric={true} // 볼류메트릭 효과 적용 여부
        debug // 디버그 모드 활성화
        position={[3, 3, 3]} // 위치 설정
        castShadow // 그림자 생성 여부
        // lookAt 메서드가 없어서 타겟을 설정해야 한다.
        target={target}
      />
    </>
  )
}
