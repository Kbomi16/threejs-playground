import { Merged } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function MergedMesh() {
  const ref = useRef(null)

  useFrame(() => {
    ref.current.rotation.y += 0.01
  })

  return (
    <Merged
      ref={ref}
      position={[1, 1, 1]}
      meshes={[
        new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({ color: 'red' }),
        ),
        new THREE.Mesh(
          new THREE.SphereGeometry(1),
          new THREE.MeshStandardMaterial({ color: 'blue' }),
        ),
      ]}
    >
      {(Box, Sphere) => {
        return (
          <>
            <Box position={[-1, -2, 1]} />
            <Sphere position={[1, 3, 1]} />
            <Box position={[3, 3, 0]} />
            <Box position={[1, 1, 1]} />
          </>
        )
      }}
    </Merged>
  )
}
