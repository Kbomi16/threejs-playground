import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// ! 렌더러 생성
// antialias: 렌더링 시 계단 현상을 줄여주는 옵션
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.shadowMap.enabled = true // 그림자 허용
renderer.setSize(window.innerWidth, window.innerHeight)
// 렌더러 크기 설정 (해줘야 화면에 보임)
document.body.appendChild(renderer.domElement)

// ! 씬 생성
const scene = new THREE.Scene()

// ! 카메라 생성
const camera = new THREE.PerspectiveCamera(
  60, // fov
  window.innerWidth / window.innerHeight, // aspect
  0.1, // near
  100, // far
)

camera.position.x = 5 // x가 클수록 오른쪽에서 본다.
camera.position.y = 4 // y가 클수록 위에서 본다.
camera.position.z = 10 // z가 클수록 멀리서 본다.

// ! 빛 생성
const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
directionalLight.castShadow = true // 그림자 허용
directionalLight.position.set(3, 4, 5) // 빛의 위치
directionalLight.lookAt(0, 0, 0) // 빛이 바라보는 위치
scene.add(directionalLight)

// ! 바닥 생성
const floorGeometry = new THREE.PlaneGeometry(20, 20) // 바닥 평면
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb }) // 바닥 재질
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI / 2 // 바닥 평면을 수평으로 회전
floor.receiveShadow = true // 그림자 허용
floor.castShadow = true
scene.add(floor)

// ------------------------------------------------------------------
// Materials 실습
// ------------------------------------------------------------------

// ! 앞면이 보이는 재질
const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1) // 정사각형
const frontSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00fff1,
  side: THREE.FrontSide, // 앞면만 보이게 함
})
const frontSide = new THREE.Mesh(frontSideGeometry, frontSideMaterial)
frontSide.position.z = 4
frontSide.position.y = 0.5
frontSide.castShadow = true
frontSide.receiveShadow = true
scene.add(frontSide)

// ! 뒷면이 보이는 재질
const backSideGeometry = new THREE.BoxGeometry(1, 1, 1) // 정사각형
const backSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.BackSide, // 뒷면만 보이게 함
})
const backSide = new THREE.Mesh(backSideGeometry, backSideMaterial)
backSide.position.set(2, 0.5, 4)
backSide.position.y = 0.51
// backSide.castShadow = true
backSide.receiveShadow = true
scene.add(backSide)

// ! 앞면과 뒷면이 모두 보이는 재질
const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1) // 정사각형
const doubleSideMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide, // 앞면과 뒷면 모두 보이게 함
})
const doubleSide = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial)
doubleSide.position.set(4, 0.5, 4)
doubleSide.position.y = 0.51
doubleSide.castShadow = true
doubleSide.receiveShadow = true
scene.add(doubleSide)

// ! 도넛 매듭
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20) // 도넛 매듭
const torusKnotMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  side: THREE.DoubleSide, // 앞면과 뒷면 모두 보이게 함
})

torusKnotMaterial.roughness = 0.5 // 거칠기
torusKnotMaterial.metalness = 1 // 금속성

const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
torusKnot.position.set(-4, 1, 0)
torusKnot.castShadow = true
torusKnot.receiveShadow = true
scene.add(torusKnot)

// ! MeshLambertMaterial: 빛을 받으면 색이 변하는 재질
const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({
  color: 0x0000ff,
  side: THREE.DoubleSide, // 앞면과 뒷면 모두 보이게 함
})
torusKnotLambertMaterial.emissive = new THREE.Color(0x00ff00) // 발광 색상
torusKnotLambertMaterial.emissiveIntensity = 0.5 // 발광 강도

const torusKnotLambert = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotLambertMaterial,
)
torusKnotLambert.position.set(-2, 1, 0)
torusKnotLambert.castShadow = true
torusKnotLambert.receiveShadow = true
scene.add(torusKnotLambert)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.update()

// ! 애니메이션
// 브라우저 창 크기 조정 시 렌더러와 카메라 비율 업데이트
// resize 이벤트를 쓰지 않으면 브라우저 창 크기 조정 시 화면이 깨진다.
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
})

const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()
