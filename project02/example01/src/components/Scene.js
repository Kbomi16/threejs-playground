import { Canvas } from '@react-three/fiber'
import Light from './Lights'
import Earth from './Earth'

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 1, 3] }}>
      <color attach="background" args={['rgb(67,127,240) 100%']} />
      <Light />
      <Earth position={[0, -2, 0]} />
    </Canvas>
  )
}
