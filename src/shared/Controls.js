import { Html } from '@react-three/drei'
import { buttonStyles } from './styles'

export default function Controls({ showIran, setShowIran }) {
  return (
    <Html fullscreen>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)'
      }}>
        <button 
          onClick={() => setShowIran(!showIran)}
          style={buttonStyles}
        >
          {showIran ? 'Show Mexico' : 'Show Iran'}
        </button>
      </div>
    </Html>
  )
}