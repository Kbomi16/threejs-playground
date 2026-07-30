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

// // ! 빛 생성
// const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
// directionalLight.castShadow = true // 그림자 허용
// directionalLight.position.set(3, 4, 5) // 빛의 위치
// directionalLight.lookAt(0, 0, 0) // 빛이 바라보는 위치
// scene.add(directionalLight)

// ! 바닥 생성
const floorGeometry = new THREE.PlaneGeometry(20, 20) // 바닥 평면
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xbbbbbb,
  side: THREE.DoubleSide,
}) // 바닥 재질
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI / 2 // 바닥 평면을 수평으로 회전
floor.receiveShadow = true // 그림자 허용
floor.castShadow = true
scene.add(floor)

// ------------------------------------------------------------------
// Lights 실습
// ------------------------------------------------------------------

const boxGeometry = new THREE.BoxGeometry(1, 1, 1) // 정사각형
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }) // 정사각형 재질
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
boxMesh.position.y = 0.5
boxMesh.castShadow = true
boxMesh.receiveShadow = true
scene.add(boxMesh)

// ! AbientLight: 전체적으로 빛을 비춰주는 빛
// const amibentLight = new THREE.AmbientLight(0xffffff, 5)
// scene.add(amibentLight)

// ! DirectionalLight: 태양빛과 같이 한 방향으로 비춰주는 빛
// const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
// directionalLight.castShadow = true // 그림자 허용
// directionalLight.position.set(3, 4, 5) // 빛의 위치
// directionalLight.lookAt(0, 0, 0) // 빛이 바라보는 위치
// scene.add(directionalLight)

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight,
//   1,
// ) // 빛의 위치를 시각화
// scene.add(directionalLightHelper)

// ! PointLight: 점에서 모든 방향으로 비춰주는 빛
const hemisphereLight = new THREE.HemisphereLight(0xb4a912, 0x12f34f, 5) // 하늘색, 땅색, 세기
hemisphereLight.position.set(0, 1, 0) // 빛의 위치
hemisphereLight.lookAt(0, 0, 0) // 빛이 바라보는 위치
scene.add(hemisphereLight)

const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  1,
) // 빛의 위치를 시각화
scene.add(hemisphereLightHelper)

// ! orbitControls: 마우스로 카메라를 움직일 수 있게 해주는 컨트롤러
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
  textureBox.rotation.y += 0.01
}

render()
