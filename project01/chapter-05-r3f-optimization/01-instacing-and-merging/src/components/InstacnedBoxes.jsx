import { useEffect } from 'react'
import { useRef } from 'react'
import * as THREE from 'three'

const object3D = new THREE.Object3D()
const color = new THREE.Color()
const boxCount = 10000
const boxSize = [0.2, 0.2, 0.2]

const colorPalettes = ['#00a0b0', '#f00', '#d9f', '#dcccff', '#ffc', '#fcc']

// 렌더 중 Math.random 불가 → 모듈 로드 시 한 번만 생성
const colors = new Float32Array(boxCount * 3)
for (let i = 0; i < boxCount; i++) {
  color.set(colorPalettes[Math.floor(Math.random() * colorPalettes.length)])
  color.toArray(colors, i * 3)
}

export default function InstacnedBoxes() {
  const ref = useRef(null)

  // 마운트 후 한 번만: 각 박스(인스턴스)의 위치·회전을 정해서 instancedMesh에 심어 줌
  useEffect(() => {
    if (!ref.current) return

    let i = 0
    // boxCount개 박스를 3D 격자처럼 배치하려면 한 변 길이는 대략 세제곱근
    // 예: 10000 ≈ 21.5 → 22 → 22×22×22 칸을 돌며 채움
    const spacewidth = Math.round(Math.pow(boxCount, 1 / 3))
    // 격자를 원점(0,0,0) 중심으로 맞추기 위한 절반 길이
    const halfOfSpaceWidth = spacewidth / 2

    // x, y, z 삼중 루프 = 가로·세로·깊이 격자 한 칸씩 방문
    for (let x = 0; x < spacewidth; x += 1) {
      for (let y = 0; y < spacewidth; y += 1) {
        for (let z = 0; z < spacewidth; z += 1) {
          const id = i++ // 이 칸에 넣을 인스턴스 번호 (0, 1, 2, ...)

          // 임시 Object3D에 회전·위치를 넣고 → matrix로 구운 뒤 → 인스턴스에 복사
          object3D.rotation.set(
            Math.random(), // x축 회전 (라디안, 랜덤)
            Math.random(), // y축 회전
            Math.random(), // z축 회전
          )

          // half - 격자좌표 + 살짝 랜덤 → 중앙 근처, 간격은 살짝 흔들림
          object3D.position.set(
            halfOfSpaceWidth - x + Math.random(),
            halfOfSpaceWidth - y + Math.random(),
            halfOfSpaceWidth - z + Math.random(),
          )

          object3D.updateMatrix() // position/rotation → matrix 반영
          // id번째 인스턴스에 그 변환 행렬을 저장 (실제로 그리는 위치·자세)
          ref.current.setMatrixAt(id, object3D.matrix)
        }
      }
    }
    // 행렬 버퍼를 바꿨으니 GPU에 "다시 읽어라"고 표시
    ref.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <>
      {/* instancedMesh: 같은 지오메트리/재질로 여러 개를 한 번에 그리는 메시 */}
      <instancedMesh ref={ref} args={[null, null, boxCount]}>
        {/* boxGeometry: 박스(정육면체) 형태. args = [가로, 세로, 깊이] */}
        <boxGeometry args={boxSize}>
          {/* instancedBufferAttribute: 인스턴스마다 다른 속성(여기선 color)을 버퍼로 전달 */}
          <instancedBufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </boxGeometry>
        {/* meshLambertMaterial: 램버트 조명 재질. vertexColors로 정점/인스턴스 색 사용 */}
        <meshLambertMaterial vertexColors />
      </instancedMesh>
    </>
  )
}
