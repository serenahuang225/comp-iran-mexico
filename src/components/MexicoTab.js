import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, OrbitControls } from '@react-three/drei'
import MexicoSystem from './MexicoSystem'
import ClientelismVisualization from './ClientelismVisualization'
import IranSystem from './IranSystem'
import { motion } from "motion/react"

export default function MexicoTab() {
  return (
    <Canvas style={{ position: 'fixed', top: 0 }} camera={{ position: [0, 0, 15], fov: 50 }}>
      <OrbitControls enableZoom={false} />
      <ScrollControls pages={2} damping={0.1}>
        <Scroll>
          <MexicoSystem />
        </Scroll>

        <Scroll html style={{ width: '100%' }}>
          <div style={{
            position: 'absolute',
            top: '15vh',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            textAlign: 'center',
            textShadow: '0 0 10px rgba(255, 215, 0, 0.7)',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '1rem 2rem',
            borderRadius: '10px',
            border: '1px solid gold',
          }}>
            <h1>
              Mexico's Political System
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
            textShadow: '0 0 10px rgba(255, 215, 0, 0.7)',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '1rem 2rem',
            borderRadius: '10px',
            border: '1px solid gold',
          }}>
            <h1>
              Clientelism Networks
            </h1>
          </div>
        </Scroll>

        <Scroll>
          <ClientelismVisualization />
        </Scroll>
      </ScrollControls>


    </Canvas>
  )
}