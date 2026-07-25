import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// antialias: 렌더링 시 계단 현상을 줄여주는 옵션
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.shadowMap.enabled = true // 그림자 허용

// 렌더러 크기 설정 (해줘야 화면에 보임)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  60, // fov
  window.innerWidth / window.innerHeight, // aspect
  0.1, // near
  100, // far
)

camera.position.x = 1 // x가 클수록 오른쪽에서 본다.
camera.position.y = 1 // y가 클수록 위에서 본다.
camera.position.z = 5 // z가 클수록 멀리서 본다.

const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
directionalLight.castShadow = true // 그림자 허용
directionalLight.position.set(3, 4, 5) // 빛의 위치
directionalLight.lookAt(0, 0, 0) // 빛이 바라보는 위치
scene.add(directionalLight)

const floorGeometry = new THREE.PlaneGeometry(20, 20) // 바닥 평면
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb }) // 바닥 재질
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI / 2 // 바닥 평면을 수평으로 회전
floor.receiveShadow = true // 그림자 허용
floor.castShadow = true
scene.add(floor)

const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30) // 캡슐
const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 }) // 캡슐 재질
const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial)
capsule.position.set(3, 1.75, 0) // 캡슐 위치
capsule.castShadow = true // 그림자 허용
capsule.receiveShadow = true
scene.add(capsule)

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
