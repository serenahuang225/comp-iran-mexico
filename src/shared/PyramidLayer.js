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
      
      <Text color="white" fontSize={0.3} position={[0, size[1]/2 + 0.3, size[1]/2]}>
        {label}
      </Text>

      {/* <Html center position={[0, size[1]/2 + 0.3, 0]} >
        <p style={{color: 'white'}}>{label}</p>
      </Html> */}
      
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