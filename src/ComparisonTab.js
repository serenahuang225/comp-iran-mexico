import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export default function ComparisonTab() {
  const groupRef = useRef()

  return (
    <group ref={groupRef}>
      {/* Mexico Culture Visualization */}
      <group position={[-5, 0, 0]}>
        <Text position={[0, 4, 0]} color="#00a2ff" fontSize={0.5}>
          Mexican Political Culture
        </Text>
        <CultureDots 
          count={150} 
          colors={['#00a2ff', '#00ff9d', '#00ffd9']} 
          area={[5, 3, 5]}
          behavior="democratic"
        />
      </group>

      {/* Iran Culture Visualization */}
      <group position={[5, 0, 0]}>
        <Text position={[0, 4, 0]} color="#ff3d3d" fontSize={0.5}>
          Iranian Political Culture
        </Text>
        <CultureDots 
          count={150} 
          colors={['#ff3d3d', '#ff7b3d', '#ffb43d']} 
          area={[5, 3, 5]}
          behavior="hierarchical"
        />
      </group>

      {/* Comparison Legend */}
      <Text position={[0, -4, 0]} color="gold" fontSize={0.4} anchorX="center">
        Political Culture Comparison: Freedom vs Authority
      </Text>
    </group>
  )
}

function CultureDots({ count, colors, area, behavior }) {
  const dots = useRef()
  const positions = useMemo(() => {
    return Array.from({ length: count }).map(() => [
      (Math.random() - 0.5) * area[0],
      (Math.random() - 0.5) * area[1],
      (Math.random() - 0.5) * area[2]
    ])
  }, [count, area])

  useFrame((state) => {
    if (!dots.current) return
    
    const time = state.clock.getElapsedTime()
    dots.current.children.forEach((dot, i) => {
      // Different movement patterns based on culture type
      if (behavior === 'democratic') {
        // More chaotic, independent movement
        dot.position.x = positions[i][0] + Math.sin(time * (0.5 + Math.random())) * 0.5
        dot.position.z = positions[i][2] + Math.cos(time * (0.3 + Math.random())) * 0.5
      } else {
        // More uniform, centralized movement
        dot.position.x = positions[i][0] + Math.sin(time * 0.3) * 0.2
        dot.position.z = positions[i][2] + Math.cos(time * 0.3) * 0.2
      }
      
      // Vertical bobbing
      dot.position.y = positions[i][1] + Math.sin(time * 2 + i) * 0.1
    })
  })

  return (
    <group ref={dots}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color={new THREE.Color(colors[i % colors.length])} 
            emissive={new THREE.Color(colors[i % colors.length])}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}