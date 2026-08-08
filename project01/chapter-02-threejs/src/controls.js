import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'

// ! 렌더러 생성
// antialias: 렌더링 시 계단 현상을 줄여주는 옵션
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.shadowMap.enabled = true // 그림자 허용
renderer.shadowMap.type = THREE.PCFSoftShadowMap
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

// ! 바닥 생성
const floorGeometry = new THREE.PlaneGeometry(20, 20) // 바닥 평면
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xbbbbbb,
  side: THREE.DoubleSide,
}) // 바닥 재질
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI / 2 // 바닥 평면을 수평으로 회전
floor.receiveShadow = true // 그림자 허용
scene.add(floor)

const boxGeometry = new THREE.BoxGeometry(1, 1, 1) // 정사각형
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 }) // 정사각형 재질
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
boxMesh.position.y = 0.5
boxMesh.castShadow = true
boxMesh.receiveShadow = true
scene.add(boxMesh)

// ! DirectionalLight: 태양빛과 같이 한 방향으로 비춰주는 빛
const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
directionalLight.castShadow = true // 그림자 허용
directionalLight.position.set(3, 4, 5) // 빛의 위치
directionalLight.lookAt(0, 0, 0) // 빛이 바라보는 위치
directionalLight.shadow.mapSize.width = 4096 // 그림자 해상도
directionalLight.shadow.mapSize.height = 4096

directionalLight.shadow.camera.top = 2 // 그림자 카메라 top
directionalLight.shadow.camera.bottom = -2 // 그림자 카메라 bottom
directionalLight.shadow.camera.left = -2 // 그림자 카메라 left
directionalLight.shadow.camera.right = 2 // 그림자 카메라 right

directionalLight.shadow.camera.near = 0.1 // 그림자 카메라 near
directionalLight.shadow.camera.far = 100 // 그림자 카메라 far
scene.add(directionalLight)

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1,
) // 빛의 위치를 시각화
scene.add(directionalLightHelper)

// ------------------------------------------------------------------
// Controls 실습
// ------------------------------------------------------------------

// ! orbitControls: 마우스로 카메라를 움직일 수 있게 해주는 컨트롤러
// const orbitControls = new OrbitControls(camera, renderer.domElement)
// orbitControls.enableDamping = true // 부드럽게 카메라 이동
// orbitControls.dampingFactor = 0.03 // 부드럽게 카메라 이동 속도
// orbitControls.enableZoom = true // 마우스 휠로 줌인/줌아웃 가능 (default는 true)
// orbitControls.autoRotate = false // 자동으로 카메라 회전 (default는 false)
// orbitControls.autoRotateSpeed = 0.5 // 자동 회전 속도

// orbitControls.enablePan = true // 마우스 오른쪽 버튼으로 카메라 이동 (default는 true)
// orbitControls.enableRotate = true // 마우스 왼쪽 버튼으로 카메라 회전 (default는 true)

// orbitControls.maxPolarAngle = Math.PI / 2 // 세로 카메라 회전 각도 제한 (default는 Math.PI)
// orbitControls.minPolarAngle = Math.PI / 4 // 세로 카메라 회전 각도 제한 (default는 0)
// orbitControls.maxAzimuthAngle = Math.PI / 2 // 가로 카메라 회전 각도 제한 (default는 Infinity)
// orbitControls.minAzimuthAngle = -Math.PI / 2 // 가로 카메라 회전 각도 제한 (default는 -Infinity)
// orbitControls.minDistance = 1 // 카메라 최소 거리 제한 (default는 0)
// orbitControls.maxDistance = 20 // 카메라 최대 거리 제한 (default는 Infinity)

// ! flyControls: 마우스로 카메라를 움직일 수 있게 해주는 컨트롤러
// const flyControls = new FlyControls(camera, renderer.domElement)
// flyControls.movementSpeed = 5 // 이동 속도
// flyControls.rollSpeed = Math.PI / 10 // 회전 속도
// flyControls.autoForward = false // 자동으로 앞으로 이동 (default는 false)
// flyControls.dragToLook = true // 마우스 드래그로 시점 이동 (default는 false)

// ! firstPersonControls: 마우스로 카메라를 움직일 수 있게 해주는 컨트롤러
// camera.position.set(0, 1, 5)
// const firstPersonControls = new FirstPersonControls(camera, renderer.domElement)
// firstPersonControls.lookSpeed = 0.1 // 회전 속도
// firstPersonControls.movementSpeed = 1 // 이동 속도
// firstPersonControls.lookVertical = true // 수직 회전 허용 (default는 true)

// ! pointerLockControls: 마우스로 카메라를 움직일 수 있게 해주는 컨트롤러
// const pointerLockControls = new PointerLockControls(camera, renderer.domElement)

// // 마우스 클릭 시 포인터 잠금
// window.addEventListener('click', () => {
//   pointerLockControls.lock()
// })

// ! trackBallControls: 마우스로 카메라를 움직일 수 있게 해주는 컨트롤러
const trackBallControls = new TrackballControls(camera, renderer.domElement)
trackBallControls.rotateSpeed = 2 // 마우스 왼쪽 버튼으로 카메라 회전 속도
trackBallControls.zoomSpeed = 1.5 // 마우스 휠로 줌인/줌아웃 속도
trackBallControls.panSpeed = 1 // 마우스 오른쪽 버튼으로 카메라 이동 속도
trackBallControls.noRotate = false // 마우스 왼쪽 버튼으로 카메라 회전 허용 (default는 false)
trackBallControls.noZoom = false // 마우스 휠로 줌인/줌아웃 허용 (default는 false)
trackBallControls.noPan = false // 마우스 오른쪽 버튼으로 카메라 이동 허용 (default는 false)
trackBallControls.staticMoving = false // 마우스 왼쪽 버튼으로 카메라 회전 시, 마우스 이동에 따라 카메라가 따라오도록 설정 (default는 false)
trackBallControls.dynamicDampingFactor = 0.3 // 마우스 왼쪽 버튼으로 카메라 회전 시, 마우스 이동에 따라 카메라가 따라오는 속도 (default는 0.2)

const target = new THREE.Mesh(
  new THREE.SphereGeometry(0.5),
  new THREE.MeshStandardMaterial({ color: 0xff0000 }),
)
target.position.set(4, 0.5, 0)
scene.add(target)
trackBallControls.target = target.position

// ! 애니메이션
// 브라우저 창 크기 조정 시 렌더러와 카메라 비율 업데이트
// resize 이벤트를 쓰지 않으면 브라우저 창 크기 조정 시 화면이 깨진다.
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
})

const clock = new THREE.Clock()

const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
  // orbitControls.update()
  // flyControls.update(clock.getDelta()) // flyControls는 update()에 deltaTime을 넣어줘야 함
  // firstPersonControls.update(clock.getDelta()) // firstPersonControls는 update()에 deltaTime을 넣어줘야 함
  trackBallControls.update()
}

render()
