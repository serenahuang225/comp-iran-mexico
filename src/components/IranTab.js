import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, Text, Html, OrbitControls } from '@react-three/drei'
import IranSystem from './IranSystem'
import TheocraticControlVisualization from './TheocraticControlVisualization'
import { motion } from 'motion/react'

export default function IranTab() {
  return (
    <div className="iran-tab-container">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <OrbitControls enableZoom={false} />
        <ScrollControls pages={2} damping={0.2}>
          <Scroll>
            <IranSystem />
          </Scroll>

          <Scroll>
            <group position={[0, -15, 0]}>
              <TheocraticControlVisualization />
            </group>
          </Scroll>

          <Scroll html style={{ width: '100%' }}>
          <div style={{
            position: 'absolute',
            top: '15vh',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            textAlign: 'center',
            textShadow: '0 0 10px rgba(255, 0, 0, 0.7)',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '1rem 2rem',
            borderRadius: '10px',
            border: '1px solid red',
          }}>
            <h1>
              Iran's Political System
            </h1>
          </div>

          <motion.div
            animate={{ y: [0,-10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut"}}
            style={{
              position: 'absolute',
              top: '90vh',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              textAlign: 'center',
            }}>
            <p>scroll ↓</p>
          </motion.div>

          <div style={{
            position: 'absolute',
            top: '115vh',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            textAlign: 'center',
            textShadow: '0 0 10px rgba(255, 0, 0, 0.7)',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '1rem 2rem',
            borderRadius: '10px',
            border: '1px solid red',
          }}>
            <h1>
              Theocratic Control
            </h1>
          </div>
        </Scroll>
        </ScrollControls>

        <Lights />
      </Canvas>
    </div>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} color="#ffdf91" />
      <pointLight position={[10, 10, 5]} intensity={1} color="#ff0000" />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ffff00" />
    </>
  )
}