import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import MexicoSystem from './MexicoSystem'
import IranSystem from './IranSystem'
import Controls from './shared/Controls'

export default function App() {
  const [showIran, setShowIran] = useState(false)

  return (
    <Canvas style={{ background: 'black', height: '100vh' }} camera={{ position: [0, 0, 15], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="gold" />
      
      {showIran ? <IranSystem /> : <MexicoSystem />}
      
      <OrbitControls enableZoom={true} enablePan={true} />
      <Controls showIran={showIran} setShowIran={setShowIran} />
    </Canvas>
  )
}