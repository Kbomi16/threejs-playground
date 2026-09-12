import { Canvas, useFrame } from '@react-three/fiber'
import Lights from '../components/Lights'
import { lazy, Suspense, useState } from 'react'
import { motion } from 'r3f-motion'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'

export default function Home() {
  const pivot = new Vector3(0, 2, 0)

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      {/* <color attach="background" args={['rgb(67, 127, 240) 100%)']} /> */}
      <Suspense fallback={'loading...'}>
        <Lights />
        <Scene />
        {/* <FramerModel position={[0, 0, 0]} /> */}
      </Suspense>
      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={15}
        minPolarAngle={Math.PI / 6} // 최소 회전 각도 (위아래)
        maxPolarAngle={Math.PI / Math.PI / 6} // 최대 회전 각도 (위아래)
        minAzimuthAngle={-Math.PI / 4} // 최소 회전 각도 (좌우)
        maxAzimuthAngle={Math.PI / 4} // 최대 회전 각도 (좌우)
      />
    </Canvas>
  )
}

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1]} />
      <meshBasicMaterial color="white" />
    </mesh>
  )
}

const Scene = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('../components/Scene')), 1000)
  })
})

const variants = {
  initial: {
    rotateX: Math.PI / 2,
    rotateZ: 1,
  },
  animate1: {
    rotateZ: [0, Math.PI],
    transition: {
      duration: 3,
      repeat: Infinity,
    },
  },
  animate2: {
    rotateY: [Math.PI, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
    },
  },
}

const materialVariants = {
  initial: { opacity: 0.2 },
  animate: {
    opacity: [1, 0.5, 1],
    transition: { duration: 0.5, repeat: Infinity },
  },
}

function FramerModel() {
  return (
    <motion.mesh variants={variants} initial="initial" animate="animate1">
      <cylinderGeometry args={[1, 1, 0.5, 8]} />
      <motion.meshBasicMaterial
        transparent
        variants={materialVariants}
        initial="initial"
        animate="animate"
        color="hotpink"
      />
    </motion.mesh>
  )
}
