import { useTexture } from '@react-three/drei'
import { RepeatWrapping } from 'three'
import { groundMapSize } from '../../../../../../../data/constants'

export default function Floor() {
  const sandTexture = useTexture('/sand.jpg', (texture) => {
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(5, 5)
  })

  return (
    <mesh
      castShadow
      receiveShadow
      rotation-x={-Math.PI / 2}
      position-y={-0.001}
    >
      <planeGeometry args={[groundMapSize, groundMapSize]} />
      <meshStandardMaterial map={sandTexture} />
    </mesh>
  )
}
