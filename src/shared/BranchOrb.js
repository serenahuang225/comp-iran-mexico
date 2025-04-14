import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import InfoPanel from './InfoPanel'

export default function BranchOrb({ position, label, color, info }) {
  const meshRef = useRef()
  const [active, setActive] = useState(false)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(time * 2) * 0.2
    meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01
  })

  return (
    <group ref={meshRef} position={position}>
      <mesh onClick={() => setActive(true)}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
      
      <Text position={[0, -1.2, 0]} color="white" fontSize={0.3}>
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