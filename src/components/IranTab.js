import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, Text, Html } from '@react-three/drei'
import IranSystem from './IranSystem'
import TheocraticControlVisualization from './TheocraticControlVisualization'

export default function IranTab() {
  return (
    <div className="iran-tab-container">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ScrollControls pages={2} damping={0.2}>
          {/* Political System Section */}
          <Scroll>
            <IranSystem />
          </Scroll>

          {/* Political Culture Section */}
          <Scroll>
            <TheocraticControlVisualization />
          </Scroll>

          {/* HTML Overlay Titles */}
          <Html wrapperClass="html-wrapper" position={[0, 3.5, 0]}>
            <h1 className="section-title">Iran's Political Structure</h1>
          </Html>
          <Html wrapperClass="html-wrapper" position={[0, -6.5, 0]}>
            <h1 className="section-title">Theocratic Control Mechanisms</h1>
          </Html>
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