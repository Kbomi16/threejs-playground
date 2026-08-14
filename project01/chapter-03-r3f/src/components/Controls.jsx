/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import {
  FirstPersonControls,
  FlyControls,
  PointerLockControls,
  SpotLight,
  TrackballControls,
  useHelper,
} from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

// 감쇠란?
// 감쇠(damping)는 물리학에서 물체의 운동이 점차적으로 감소하는 현상
// 이는 일반적으로 마찰이나 저항과 같은 외부 힘에 의해 발생하며, 물체의 속도나 진동이 시간이 지남에 따라 점점 줄어드는 것을 나타냅니다. 감쇠는 다양한 시스템에서 중요한 역할을 하며, 예를 들어 자동차의 서스펜션 시스템, 건물의 진동 제어, 전자 회로의 신호 처리 등에서 활용됩니다. 감쇠는 시스템의 안정성을 높이고, 불필요한 진동이나 흔들림을 줄이는 데 기여합니다.

export default function Controls() {
  return (
    // <OrbitControls
    //   enableDamping
    //   dampingFactor={0.3} // 감쇠 계수, 0~1 사이의 값으로 설정 가능. 0에 가까울수록 감쇠가 적고, 1에 가까울수록 감쇠가 큼
    //   enableZoom // 줌 기능 활성화
    //   enablePan // 패닝 기능 활성화
    //   // autoRotate // 자동 회전 활성화
    //   // autoRotateSpeed={0.5} // 자동 회전 속도

    //   maxPolarAngle={Math.PI / 2} // 카메라가 회전할 수 있는 최대 각도 (수직 방향 제한)
    //   minPolarAngle={Math.PI / 4} // 카메라가 회전할 수 있는 최소 각도 (수직 방향 제한)
    //   maxAzimuthAngle={Math.PI / 2} // 카메라가 회전할 수 있는 최대 수평 각도 (좌우 방향 제한)
    //   minAzimuthAngle={-Math.PI / 2} // 카메라가 회전할 수 있는 최소 수평 각도 (좌우 방향 제한)
    // />

    // <FlyControls
    //   movementSpeed={5} // 이동 속도
    //   rollSpeed={Math.PI / 24} // 회전 속도
    //   autoForward={false} // 자동 전진 여부
    //   dragToLook={true} // 마우스 드래그로 시점 이동 가능 여부
    // />

    // <FirstPersonControls
    //   lookSpeed={0.1} // 마우스 이동 속도
    //   movementSpeed={5} // 이동 속도
    //   verticalMax={Math.PI / 2} // 수직 회전 최대 각도
    //   verticalMin={-Math.PI / 2} // 수직 회전 최소 각도
    // />

    // <PointerLockControls />

    <TrackballControls
      rotateSpeed={1.0} // 회전 속도
      zoomSpeed={1.2} // 줌 속도
      panSpeed={0.8} // 패닝 속도
      noRotate={false} // 회전 기능 활성화 여부
      noZoom={false} // 줌 기능 활성화 여부
      noPan={false} // 패닝 기능 활성화 여부
      staticMoving={false} // 마우스 이동 시 카메라가 즉시 따라오도록 설정
      dynamicDampingFactor={0.05} // 감쇠 계수, 0~1 사이의 값으로 설정 가능. 0에 가까울수록 감쇠가 적고, 1에 가까울수록 감쇠가 큼
    />
  )
}
