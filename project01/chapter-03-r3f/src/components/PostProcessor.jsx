import {
  EffectComposer,
  Bloom,
  BrightnessContrast,
  DotScreen,
  Glitch,
  Grid,
  HueSaturation,
  Pixelation,
  Sepia,
} from '@react-three/postprocessing'

export default function PostProcessor() {
  return (
    <EffectComposer disableNormalPass>
      {/* 블룸 효과 */}
      {/* <Bloom
        intensity={0.5} // 블룸 효과의 강도
        mipmapBlur // 블룸 효과의 블러 효과
        luminanceThreshold={1} // 블룸 효과의 임계값
        luminanceSmoothing={0.02} // 블룸 효과의 부드러움
      /> */}

      {/* 밝기 조절 효과 */}
      {/* <BrightnessContrast
        brightness={0.5} // 밝기 조절
        contrast={0.8} // 대비 조절
      /> */}

      {/* 점 화면 효과 */}
      {/* <DotScreen
        scale={1.5} // 점 화면의 크기
        angle={Math.PI / 4} // 점 화면의 각도
        opacity={0.1} // 점 화면의 투명도
      /> */}

      {/* 글리치 효과 */}
      {/* <Glitch
        delay={[0.5, 1]} // 글리치 효과의 지연 시간 (최소, 최대) 무작위로 실행됨
        duration={[0.5, 1]} // 글리치 효과의 지속 시간
        strength={[0.5, 1]} // 글리치 효과의 강도
        ratio={0.5} // 글리치 효과의 비율 (0에 가까울수록 글리치 효과가 자주 발생함)
      /> */}

      {/* 격자 효과 */}
      {/* <Grid
        scale={1} // 격자의 크기
        color={0x000000} // 격자의 색상
        opacity={0.5} // 격자의 투명도
      /> */}

      {/* 색상 효과 */}
      {/* <HueSaturation
        hue={0.5} // 색상 효과의 허스 값
        saturation={0.5} // 색상 효과의 채도 값
      /> */}

      {/* 픽셀 효과 */}
      {/* <Pixelation
        granularity={10} // 픽셀 효과의 그레인시어리티 값
        scale={10} // 픽셀 효과의 크기
        pixelSize={10} // 픽셀 효과의 크기
      /> */}

      {/* 시프 효과: 빛이 바래는 효과 */}
      <Sepia
        intensity={0.5} // 시프 효과의 강도
        sepia={0.5} // 시프 효과의 시프 값
      />
    </EffectComposer>
  )
}
