import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useRef, useState } from 'react'
import { Html } from '@react-three/drei'

const Earth = () => {
  const [isHover, setIsHover] = useState(false)

  const htmlRef = useRef(null)
  const glb = useLoader(GLTFLoader, '/models/earth.glb')
  const ref = useRef(null)

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group position={[0, -1.5, 0]}>
      <mesh
        scale={isHover ? 1.5 : 1.3}
        rotation-x={Math.PI / 2}
        ref={ref}
        // onClick={(e) => console.log('클릭')}
        // onContextMenu={(e) => console.log('콘텍스트 메뉴, 오른쪽 마우스 클릭')}
        // onDoubleClick={(e) => console.log('더블 클릭')}
        // onWheel={(e) => console.log('마우스 휠')}
        // onPointerUp={(e) => console.log('마우스에서 손 뗐을 때')}
        // onPointerDown={(e) => console.log('마우스 버튼을 눌렀을 때')}
        // onPointerOver={(e) => console.log('포인터가 객체 위에')}
        // onPointerOut={(e) => console.log('포인터가 객체를 벗어났을 때')}
        // onPointerEnter={(e) => console.log('포인터가 객체 내부로')}
        // onPointerLeave={(e) => console.log('포인터가 객체에서')}
        // onPointerMove={(e) => console.log('포인터가 객체내에서')}
        // onPointerMissed={() => console.log('포인터가 객체를 빗나갔을 때')}
        // onUpdate={(self) => console.log('프로퍼티가 업데이트됨')}

        onPointerEnter={(e) => setIsHover(true)}
        onPointerLeave={(e) => setIsHover(false)}
      >
        <primitive object={glb.scene} />
      </mesh>
      {isHover && (
        <Html>
          <span className="rotation-icon">
            <img
              src="/icons/rotation.png"
              alt="rotation"
              width={100}
              height={100}
            />
          </span>
        </Html>
      )}
    </group>
  )
}

export default Earth
