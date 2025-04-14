import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import PyramidLayer from '../shared/PyramidLayer'
import { IRAN_LAYERS } from '../shared/data'

export default function IranSystem() {
  const pyramidRef = useRef()
  
  // Rotation animation
  useFrame(() => {
    if (pyramidRef.current) {
      pyramidRef.current.rotation.y += 0.001 // Adjust speed as needed
    }
  })

  return (
    <group position={[0, -2, 0]} ref={pyramidRef}>
      {IRAN_LAYERS.map((layer) => (
        <PyramidLayer
          key={layer.label}
          position={layer.position}
          size={layer.size}
          label={layer.label}
          color={layer.color}
          info={layer.info}
        />
      ))}
      
      <Text position={[0, -3, 0]} color="gold" fontSize={0.5} >
        Iran's Political System (Hierarchical)
      </Text>
    </group>
  )
}