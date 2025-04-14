import { Text, useScroll } from '@react-three/drei'
import BranchOrb from '../shared/BranchOrb'
import { MEXICO_BRANCHES } from '../shared/data'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function MexicoSystem() {
  const scroll = useScroll()
  const groupRef = useRef()

  useFrame(() => {
    // Fade out when scrolling to next section
    groupRef.current.visible = scroll.offset < 0.5
    groupRef.current.position.y = scroll.offset * -2 // Smooth transition
  })

  return (
    <group ref={groupRef}>
      {MEXICO_BRANCHES.map((branch, index) => (
        <BranchOrb 
          key={branch.label}
          position={branch.position}
          label={branch.label}
          color={branch.color}
          info={branch.info}
        />
      ))}
    </group>
  )
}