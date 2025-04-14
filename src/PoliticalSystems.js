import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import IranSystem from './IranSystem'
import MexicoSystem from './MexicoSystem'
import ComparisonTab from './ComparisonTab'
import TabButtons from './shared/TabButtons'

export default function PoliticalSystems() {
  const [activeTab, setActiveTab] = useState('mexico')

  return (
    <div className="political-systems-container">
      <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <Canvas style={{ background: 'black' }} camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="gold" />
        
        {activeTab === 'mexico' && <MexicoSystem />}
        {activeTab === 'iran' && <IranSystem />}
        {activeTab === 'comparison' && <ComparisonTab />}
        
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  )
}