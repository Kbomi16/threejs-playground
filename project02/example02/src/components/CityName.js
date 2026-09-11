import { Html } from '@react-three/drei'
import { motion } from 'r3f-motion'

export default function CityName({ name }) {
  return (
    <motion.group className="group" initial={{ y: 0.3 }} animate={{ y: 0.4 }}>
      <Html center position={[-0.15, 0.1, 0]}>
        <div className="cityName">{name}</div>
      </Html>
    </motion.group>
  )
}
