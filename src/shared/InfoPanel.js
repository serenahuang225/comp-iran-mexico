import { Html } from '@react-three/drei'
import { panelStyles, closeButtonStyles } from './styles'

export default function InfoPanel({ title, content, onClose }) {
  return (
    <Html center>
      <div style={panelStyles}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ color: 'gold', margin: 0 }}>{title}</h3>
          <button 
            onClick={onClose}
            style={closeButtonStyles}
            aria-label="Close panel"
          >
            x
          </button>
        </div>
        <p style={{ marginTop: '8px' }}>{content}</p>
      </div>
    </Html>
  )
}