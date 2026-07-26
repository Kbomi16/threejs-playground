import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// ! 렌더러 생성
// antialias: 렌더링 시 계단 현상을 줄여주는 옵션
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.shadowMap.enabled = true // 그림자 허용

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

camera.position.x = 1 // x가 클수록 오른쪽에서 본다.
camera.position.y = 1 // y가 클수록 위에서 본다.
camera.position.z = 5 // z가 클수록 멀리서 본다.

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
// Geometry 실습
// ------------------------------------------------------------------

// ! 정사각형
const geometry = new THREE.BoxGeometry(1, 1, 1) // 정사각형
// MeshStandardMaterial: 빛을 받으면 색이 변하는 재질
// MeshBasicMaterial: 빛을 받지 않아도 색이 변하지 않는 재질
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.castShadow = true // 그림자 허용
mesh.position.y = 0.5 // y축으로 0.5만큼 올려서 바닥에 붙지 않게 함
scene.add(mesh)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.update()

// ! 캡슐 생성
const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30) // 캡슐
const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 }) // 캡슐 재질
const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial)
capsule.position.set(3, 1.75, 0) // 캡슐 위치
capsule.castShadow = true // 그림자 허용
capsule.receiveShadow = true
scene.add(capsule)

// ! 원기둥 생성
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2) // 원기둥
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 }) // 원기둥 재질
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
cylinder.position.set(-3, 1, 0) // 원기둥 위치
cylinder.castShadow = true // 그림자 허용
cylinder.receiveShadow = true
scene.add(cylinder)

// ! 도넛 생성
const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100, Math.PI * 0.5) // 도넛
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }) // 도넛 재질
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
torus.position.set(0, 1, 3) // 도넛 위치
torus.castShadow = true // 그림자 허용
torus.receiveShadow = true
scene.add(torus)

// ! 별 모양 생성
const starShape = new THREE.Shape()
starShape.moveTo(0, 1)
starShape.lineTo(0.2, 0.2)
starShape.lineTo(1, 0.2)
starShape.lineTo(0.4, -0.1)
starShape.lineTo(0.6, -1)
starShape.lineTo(0, -0.5)
starShape.lineTo(-0.6, -1)
starShape.lineTo(-0.4, -0.1)
starShape.lineTo(-1, 0.2)
starShape.lineTo(-0.2, 0.2)
starShape.lineTo(0, 1) // 별 모양 좌표

const shapeGeometry = new THREE.ShapeGeometry(starShape) // 별 모양
const shapeMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff }) // 별 모양 재질
const shape = new THREE.Mesh(shapeGeometry, shapeMaterial)
shape.position.set(0, 1, 2) // 별 모양 위치
shape.castShadow = true // 그림자 허용
shape.receiveShadow = true
scene.add(shape)

// ! 별 모양 (돌출)
const extrudeSettings = {
  steps: 1, // 값이 커질수록 모양이 부드러워진다.
  depth: 0.1, // 두께
  bevelEnabled: true, // 모서리 둥글게
  bevelThickness: 0.1, // 모서리 둥글기 두께
  bevelSize: 0.3, // 모서리 둥글기 정도
  bevelSegments: 1, // 모서리 둥글기 세그먼트 수 (얼마나 매끄럽게)
}

const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings) // 별 모양 돌출
const extrudeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff }) // 별 모양 돌출 재질
const extrude = new THREE.Mesh(extrudeGeometry, extrudeMaterial)
extrude.position.set(0, 3, -2) // 별 모양 돌출 위치
extrude.castShadow = true // 그림자 허용
extrude.receiveShadow = true
scene.add(extrude)

// ! 구
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32) // 구
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }) // 구 재질
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(2, 1, 3) // 구 위치
sphere.castShadow = true // 그림자 허용
sphere.receiveShadow = true
scene.add(sphere)

// ! 점 생성
const numPoints = 1000
const positions = new Float32Array(numPoints * 3) // 3차원 좌표이므로 3을 곱함
for (let i = 0; i < numPoints; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 10 // x 좌표
  positions[i * 3 + 1] = (Math.random() - 0.5) * 10 // y 좌표
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10 // z 좌표
}

const bufferGeometry = new THREE.BufferGeometry()
bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // position 속성에 좌표를 넣음

const pointsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 }) // 점 재질
const points = new THREE.Points(bufferGeometry, pointsMaterial) // 점 생성
scene.add(points)

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
