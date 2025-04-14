import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Line, useScroll, Html } from '@react-three/drei'
import * as THREE from 'three'

export default function ClientelismVisualization() {
  const [highlightedNode, setHighlightedNode] = useState(null)
  const { elites, citizens, connections } = useMemo(() => {
    // Create simulation data
    const elites = Array.from({ length: 8 }).map((_, i) => ({
      id: `elite-${i}`,
      position: [
        (Math.random() - 0.5) * 3,
        2 + Math.random(),
        (Math.random() - 0.5) * 3
      ],
      type: 'elite',
      name: ['PRI Official', 'Local Boss', 'Union Leader', 'Mayor', 'Party Leader', 'Businessman', 'Media Owner', 'Bureaucrat'][i]
    }))
    
    const citizens = Array.from({ length: 50 }).map((_, i) => ({
      id: `citizen-${i}`,
      position: [
        (Math.random() - 0.5) * 10,
        -1 + Math.random() * 0.5,
        (Math.random() - 0.5) * 10
      ],
      type: 'citizen',
      benefit: ['Job', 'Housing', 'Subsidy', 'Protection', 'Education'][Math.floor(Math.random() * 5)]
    }))
    
    const connections = []
    elites.forEach(elite => {
      // Each elite connects to 5-15 citizens
      const connectedCitizens = [...citizens]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5 + Math.floor(Math.random() * 10))
      
      connectedCitizens.forEach(citizen => {
        connections.push({
          from: elite.position,
          to: citizen.position,
          strength: Math.random()
        })
      })
    })
    
    return { elites, citizens, connections }
  }, [])

  const scroll = useScroll()
  const groupRef = useRef()

  useFrame(() => {
    // Fade in when scrolling to this section
    groupRef.current.visible = scroll.offset > 0.5
    groupRef.current.position.y = 5 - scroll.offset * 20 // Smooth transition
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {elites.map((elite) => (
        <group key={elite.id}>
          <mesh 
            position={elite.position}
            onClick={() => setHighlightedNode(elite)}
            onPointerOver={() => setHighlightedNode(elite)}
          >
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial 
              color={highlightedNode?.id === elite.id ? '#ffd700' : '#00a2ff'} 
              emissive="#00a2ff"
              emissiveIntensity={0.5}
            />
          </mesh>
          {highlightedNode?.id === elite.id && (
            <Html position={[elite.position[0], elite.position[1] + 0.5, elite.position[2]]}>
              <p style={{color: 'white'}}>{elite.name}</p>
            </Html>
          )}
        </group>
      ))}
      
      {/* Citizens (smaller green spheres) */}
      {citizens.map((citizen) => (
        <group key={citizen.id}>
          <mesh 
            position={citizen.position}
            onClick={() => setHighlightedNode(citizen)}
            onPointerOver={() => setHighlightedNode(citizen)}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color={highlightedNode?.id === citizen.id ? '#00ff9d' : '#009d5e'} 
              emissive="#009d5e"
              emissiveIntensity={0.3}
            />
          </mesh>
          {highlightedNode?.id === citizen.id && (
            
            <Text
              position={[citizen.position[0], citizen.position[1] + 0.3, citizen.position[2]]}
              color="white"
              fontSize={0.2}
              anchorX="center"
            >
              {citizen.benefit}
            </Text>
          )}
        </group>
      ))}
      
      {/* Connection lines (dynamic transparency) */}
      {connections.map((conn, i) => {
        const isHighlighted = 
          (highlightedNode && (
            (conn.from === highlightedNode.position) || 
            (conn.to === highlightedNode.position)
          ))
        return (
          <Line
            key={i}
            points={[conn.from, conn.to]}
            color={isHighlighted ? 'gold' : 'white'}
            opacity={isHighlighted ? 0.8 : 0.2}
            transparent
            lineWidth={isHighlighted ? 2 : 1}
          />
        )
      })}
      
      {/* Legend */}
      <group position={[-4, -2, -5]}>
        <Text color="white" fontSize={0.3} position={[0, 0.6, 0]}>
          Political Elites
        </Text>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#00a2ff" emissive="#00a2ff" />
        </mesh>
        
        <Text color="white" fontSize={0.3} position={[2, 0.6, 0]}>
          Citizens
        </Text>
        <mesh position={[2, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#009d5e" emissive="#009d5e" />
        </mesh>
      </group>
    </group>
  )
}