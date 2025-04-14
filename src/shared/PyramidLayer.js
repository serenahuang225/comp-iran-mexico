import { useState } from 'react'
import { Text, Html } from '@react-three/drei'
import InfoPanel from './InfoPanel'

export default function PyramidLayer({ position, size, label, color, info }) {
  const [active, setActive] = useState(false)
  
  return (
    <group position={position}>
      <mesh onClick={() => setActive(true)}>
        <boxGeometry args={size} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.4}
        />
      </mesh>
      
      <Text position={[0, size[1]/2 + 0.3, 0]} color="white" fontSize={0.3}>
        {label}
      </Text>
      
      {active && (
        <InfoPanel 
          title={label} 
          content={info} 
          onClose={() => setActive(false)} 
        />
      )}
    </group>
  )
}