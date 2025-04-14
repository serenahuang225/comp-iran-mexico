import { Text } from '@react-three/drei'
import BranchOrb from './shared/BranchOrb'
import { MEXICO_BRANCHES } from './shared/data'

export default function MexicoSystem() {
  return (
    <group>
      {MEXICO_BRANCHES.map((branch, index) => (
        <BranchOrb 
          key={branch.label}
          position={branch.position}
          label={branch.label}
          color={branch.color}
          info={branch.info}
        />
      ))}
      
      <Text position={[0, -3, 0]} color="gold" fontSize={0.5}>
        Mexico's Political System
      </Text>
    </group>
  )
}