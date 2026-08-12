import {
  Box,
  Circle,
  Cone,
  Cylinder,
  Plane,
  Sphere,
  Torus,
  TorusKnot,
} from '@react-three/drei'

export default function Meshes() {
  return (
    <>
      {/* <mesh>
         <boxGeometry args={[1, 1, 1]} />
         <meshBasicMaterial color={'#ff0000'} />
      </mesh>
      // 버퍼 지오메트리를 기반으로 하기 때문에 성능이 더 좋다. */}
      {/* <Box args={[1, 1, 1]} material-color={'#ff0000'} /> */}

      {/* Plane: 평면 */}
      <Plane args={[40, 40]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial />
      </Plane>

      {/* Box: 사각형 */}
      <Box args={[1, 1, 1]} castShadow position-y={0.5}>
        <meshStandardMaterial color={'#ff0000'} />
      </Box>

      {/* Sphere: 구   */}
      <Sphere
        args={[1]}
        castShadow
        position={[3, 1, 0]}
        material-color="#ffff00"
      />

      {/* Circle: 원 */}
      <Circle
        args={[1]}
        rotation-x={-Math.PI / 2}
        position={[0, 1, -3]}
        material-color="#0000ff"
      />

      {/* Cone: 원뿔 */}
      <Cone
        args={[1, 2, 32]}
        castShadow
        position={[-3, 1, 0]}
        material-color="#ff00ff"
      />

      {/* Cylinder: 원기둥 */}
      <Cylinder
        args={[2, 1, 2]}
        castShadow
        position={[0, 1, 3]}
        material-color="#00ffff"
      />

      {/* Torus: 토러스 */}
      <Torus
        args={[1, 0.4, 16, 100]}
        castShadow
        position={[0, 2, 6]}
        material-color="hotpink"
      />

      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[0, 2, -6]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={'#ff00ff'} roughness={0.5} metalness={1} />
      </TorusKnot>

      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[4, 2, -6]}
        castShadow
        receiveShadow
      >
        <meshLambertMaterial
          color={'#ff00ff'}
          emissive={'#632da5'}
          emissiveIntensity={0.5}
        />
      </TorusKnot>

      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[8, 2, -6]}
        castShadow
        receiveShadow
      >
        <meshPhongMaterial
          color={'#ff00ff'}
          emissive={'#632da5'}
          emissiveIntensity={0.5}
          specular={'#00ff15'}
          shininess={100}
        />
      </TorusKnot>

      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[12, 2, -6]}
        castShadow
        receiveShadow
      >
        <meshDepthMaterial opacity={0.5} />
      </TorusKnot>
    </>
  )
}
