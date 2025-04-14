import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import MexicoSystem from './MexicoSystem'
import ClientelismVisualization from './ClientelismVisualization'

export default function MexicoTab() {
  const scrollRef = useRef()

  return (
    <>
      {/* HTML Scroll Container */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        overflowY: 'auto',
        zIndex: 10,
        pointerEvents: 'none' // Allows interaction with Canvas below
      }} ref={scrollRef}>
        <div style={{ height: '200vh' }} /> // Double viewport height
      </div>

      {/* 3D Canvas with Scroll Controls */}
      <Canvas style={{ position: 'fixed', top: 0 }} camera={{ position: [0, 0, 15], fov: 50 }}>
        <ScrollControls pages={2} damping={0.1} style={{ pointerEvents: 'none' }}>
          <Scroll>
            {/* Political System (First Page) */}
            <group position={[0, 0, 0]}>
              <MexicoSystem />
            </group>
          </Scroll>

          <Scroll html style={{ width: '100%' }}>
            {/* Title for Political System */}
            <div style={{
              position: 'absolute',
              top: '10vh',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              fontSize: '2rem',
              textAlign: 'center'
            }}>
              Mexico's Political System
            </div>

            {/* Title for Clientelism */}
            <div style={{
              position: 'absolute',
              top: '110vh',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              fontSize: '2rem',
              textAlign: 'center'
            }}>
              Clientelism Networks
            </div>
          </Scroll>

          <Scroll>
            {/* Clientelism (Second Page) */}
            <group position={[0, -10, 0]}>
              <ClientelismVisualization />
            </group>
          </Scroll>
        </ScrollControls>

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="gold" />
      </Canvas>
    </>
  )
}