import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Html } from '@react-three/drei'
import * as THREE from 'three'

// Mexico's Branch Orb Component
function BranchOrb({ position, label, color, ...props }) {
  const meshRef = useRef()
  const [active, setActive] = useState(false)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(time * 2) * 0.2
    meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01
  })

  return (
    <group ref={meshRef} position={position}>
      <mesh {...props} onClick={() => setActive(!active)}>
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
        <Html center>
          <div className="info-panel">
            <h3>{label}</h3>
            {getMexicoBranchInfo(label)}
          </div>
        </Html>
      )}
    </group>
  )
}

// Iran's Pyramid Layer Component
function PyramidLayer({ position, size, label, color, info, ...props }) {
  const meshRef = useRef()
  const [active, setActive] = useState(false)
  
  return (
    <group position={position}>
      <mesh {...props} onClick={() => setActive(!active)} ref={meshRef}>
        <boxGeometry args={[size[0], size[1], size[2]]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.4}
        />
      </mesh>
      
      <Text 
        position={[0, size[1]/2 + 0.3, 0]} 
        color="white" 
        fontSize={0.3}
        anchorX="center"
      >
        {label}
      </Text>
      
      {active && (
        <Html center>
          <div className="info-panel">
            <h3>{label}</h3>
            <p>{info}</p>
          </div>
        </Html>
      )}
    </group>
  )
}

// Main scene component
export default function PoliticalSystemsComparison() {
  const [showIran, setShowIran] = useState(false)
  
  return (
    <Canvas style={{ background: 'black', height: '100vh' }} camera={{ position: [0, 0, 15], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="gold" />
      
      {!showIran ? (
        /* MEXICO'S SYSTEM - Floating Orbs */
        <group>
          <BranchOrb position={[-3, 1, 0]} label="Executive" color={new THREE.Color(0xffd700)} />
          <BranchOrb position={[0, 2, 0]} label="Legislative" color={new THREE.Color(0xffa500)} />
          <BranchOrb position={[3, 1, 0]} label="Judicial" color={new THREE.Color(0xff6347)} />
          
          <Text position={[0, -3, 0]} color="gold" fontSize={0.5}>
            Mexico's Political System
          </Text>
        </group>
      ) : (
        /* IRAN'S SYSTEM - Pyramid Structure */
        <group position={[0, -2, 0]}>
          {/* Supreme Leader - Top */}
          <PyramidLayer
            position={[0, 5, 0]}
            size={[3, 0.5, 3]}
            label="Supreme Leader"
            color={new THREE.Color(0x8B0000)} // Dark red
            info="Highest political & religious authority. Controls military, judiciary, and media. Appointed for life by Assembly of Experts."
          />
          
          {/* Guardian Council & Assembly of Experts */}
          <PyramidLayer
            position={[0, 3.8, 0]}
            size={[4, 0.5, 4]}
            label="Guardian Council & Assembly of Experts"
            color={new THREE.Color(0xB22222)} // Firebrick
            info="Guardian Council: Vets all legislation and election candidates. Assembly of Experts: Elects and oversees Supreme Leader."
          />
          
          {/* President & Parliament */}
          <PyramidLayer
            position={[0, 2.6, 0]}
            size={[5, 0.5, 5]}
            label="President & Parliament (Majlis)"
            color={new THREE.Color(0xCD5C5C)} // Indian red
            info="President: Head of government, elected every 4 years. Parliament: 290-member legislative body with limited power."
          />
          
          {/* Judiciary */}
          <PyramidLayer
            position={[0, 1.4, 0]}
            size={[6, 0.5, 6]}
            label="Judiciary"
            color={new THREE.Color(0xDC143C)} // Crimson
            info="Implements Sharia law. Head appointed by Supreme Leader. Includes Revolutionary Courts for political cases."
          />
          
          {/* Military & Revolutionary Guards */}
          <PyramidLayer
            position={[0, 0.2, 0]}
            size={[7, 0.5, 7]}
            label="IRGC & Military"
            color={new THREE.Color(0xFF6347)} // Tomato
            info="Islamic Revolutionary Guard Corps (IRGC): Powerful military force with economic interests. Reports directly to Supreme Leader."
          />
          
          <Text position={[0, -3, 0]} color="gold" fontSize={0.5}>
            Iran's Political System (Hierarchical)
          </Text>
        </group>
      )}
      
      <OrbitControls enableZoom={true} enablePan={true} />
      
      <Html fullscreen>
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px'
        }}>
          <button 
            onClick={() => setShowIran(!showIran)}
            style={{
              background: 'gold',
              color: 'black',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {showIran ? 'Show Mexico' : 'Show Iran'}
          </button>
        </div>
      </Html>
    </Canvas>
  )
}

function getMexicoBranchInfo(branch) {
  const info = {
    'Executive': 'The President of Mexico serves a single six-year term (sexenio) as both head of state and government. Current president: Andrés Manuel López Obrador (AMLO).',
    'Legislative': 'Bicameral Congress: Chamber of Deputies (500 members) and Senate (128 members). Responsible for making federal laws.',
    'Judicial': 'Supreme Court of Justice (11 ministers) is the highest court. Includes electoral tribunals to oversee elections.'
  }
  return <p>{info[branch]}</p>
}