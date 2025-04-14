import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export default function ComparisonTab() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <OrbitControls enableZoom={false} />
      <RotatingGroup />
    </Canvas>
  )
}

function RotatingGroup() {
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={groupRef}>
      {/* Title */}
      <Html wrapperClass="comparison-title" position={[-5, -5, 0]}>
        <h1>Political Culture Comparison</h1>
      </Html>

      {/* Mexico Section */}
      <group position={[-6, 0, 0]}>
        <CountryBase 
          position={[0, -1, 0]}
          color="#00a2ff"
          title="Mexico"
          characteristics={[
            "Pluralist Democracy",
            "Clientelism Networks",
            "Separation of Powers",
            "Secular State",
            "Party Competition"
          ]}
        />
        <CulturalSymbols 
          position={[0, 2, 0]}
          type="mexico"
          count={15}
        />
      </group>

      {/* Iran Section */}
      <group position={[6, 0, 0]}>
        <CountryBase 
          position={[0, -1, 0]}
          color="#ff3d3d"
          title="Iran"
          characteristics={[
            "Theocratic Republic",
            "Velayat-e Faqih",
            "Religious Oversight",
            "Revolutionary Ideology",
            "Limited Pluralism"
          ]}
        />
        <CulturalSymbols 
          position={[0, 2, 0]}
          type="iran"
          count={15}
        />
      </group>

      <ComparisonLines />
      <Legend />
    </group>
  )
}



  
  
function CountryBase({ position, color, title, characteristics }) {
  return (
    <group position={position}>
      {/* Base Platform */}
      <mesh>
        <cylinderGeometry args={[3, 3, 0.2, 32]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.7} 
        />
      </mesh>

      {/* Title */}
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
      >
        {title}
      </Text>

      {/* Characteristics */}
      <group position={[0, 0.5, 0]}>
        {characteristics.map((char, i) => (
          <Text
            key={i}
            position={[0, -i * 0.4, 2.5]}
            fontSize={0.25}
            color="white"
            anchorX="center"
            maxWidth={4}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign="center"
          >
            {char}
          </Text>
        ))}
      </group>
    </group>
)
}

function CulturalSymbols({ position, type, count }) {
  const symbols = useRef()
  const symbolPositions = useMemo(() => 
    Array.from({ length: count }).map(() => [
      (Math.random() - 0.5) * 5,
      Math.random() * 3,
      (Math.random() - 0.5) * 5
    ]),
    [count]
  )

  useFrame((state) => {
    if (!symbols.current) return
    
    const time = state.clock.getElapsedTime()
    symbols.current.children.forEach((symbol, i) => {
      // Different movement based on country type
      if (type === 'mexico') {
        symbol.position.x = symbolPositions[i][0] + Math.sin(time * (0.5 + i * 0.1)) * 0.3
        symbol.position.z = symbolPositions[i][2] + Math.cos(time * (0.3 + i * 0.1)) * 0.3
      } else {
        symbol.position.x = symbolPositions[i][0] + Math.sin(time * 0.5) * 0.1
        symbol.position.z = symbolPositions[i][2] + Math.cos(time * 0.5) * 0.1
      }
    })
  })

  return (
    <group ref={symbols} position={position}>
      {symbolPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          {type === 'mexico' ? (
            <>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? '#00a2ff' : '#00ff9d'} 
                emissive={i % 2 === 0 ? '#00a2ff' : '#00ff9d'}
                emissiveIntensity={0.3}
              />
            </>
          ) : (
            <>
              <coneGeometry args={[0.2, 0.3, 4]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? '#ff3d3d' : '#ffb43d'} 
                emissive={i % 2 === 0 ? '#ff3d3d' : '#ffb43d'}
                emissiveIntensity={0.3}
              />
            </>
          )}
        </mesh>
      ))}
    </group>
  )
}

function ComparisonLines() {
  const linePoints = [
    // X-axis comparison (Secular vs Theocratic)
    { start: [-3, 2, 0], end: [3, 2, 0], label: "Secular vs Theocratic" },
    // Y-axis comparison (Pluralism vs Control)
    { start: [-3, 1, 0], end: [3, 1, 0], label: "Pluralism vs Control" },
    // Z-axis comparison (Federal vs Unitary)
    { start: [-3, 0, 0], end: [3, 0, 0], label: "Federal vs Unitary" }
  ]

  return (
    <group position={[0, -1, 0]}>
      {linePoints.map((line, i) => (
        <group key={i}>
          <line>
            <bufferGeometry attach="geometry" />
            <lineBasicMaterial attach="material" color="white" />
          </line>
          <Text
            position={[0, line.start[1] + 0.2, 0]}
            fontSize={0.3}
            color="gold"
            anchorX="center"
          >
            {line.label}
          </Text>
        </group>
      ))}
    </group>
  )
}

function Legend() {
  return (
    <group position={[0, -3, 0]}>
      <Html wrapperClass="comparison-legend" center>
        <div className="legend-container">
          <div className="legend-item">
            <div className="mexico-color"></div>
            <span>Mexican Characteristics</span>
          </div>
          <div className="legend-item">
            <div className="iran-color"></div>
            <span>Iranian Characteristics</span>
          </div>
          <div className="legend-item">
            <div className="comparison-line"></div>
            <span>Key Differences</span>
          </div>
        </div>
      </Html>
    </group>
  )
}