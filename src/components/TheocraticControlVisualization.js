import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Line, Html } from '@react-three/drei'
import * as THREE from 'three'

export default function TheocraticControlVisualization() {
  const [activeEvent, setActiveEvent] = useState(null)
  const groupRef = useRef()

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    groupRef.current.scale.setScalar(Math.sin(time * 0.5) * 0.05 + 0.95)
    
    // Pulsing for election nodes
    events.forEach((event, i) => {
      if (event.type === 'election') {
        event.ref.current.scale.x = Math.sin(time * 2 + i) * 0.1 + 1
        event.ref.current.scale.y = Math.sin(time * 2 + i) * 0.1 + 1
      }
    })
  })

  // Create refs outside of the event list
  const eventRefs = {
      '2009-election': useRef(),
      '2017-election': useRef(),
      '2021-election': useRef(),
      '1999': useRef(),
      '2019': useRef()
    }

  const { nodes, connections, events } = useMemo(() => {
    const baseEvents = [
      {
        id: '2009-election',
        type: 'election',
        year: '2009',
        title: 'Green Movement Protests',
        position: [3, -1, 2],
        description: 'Mass protests following disputed re-election of Mahmoud Ahmadinejad. Security forces killed dozens of protesters.',
        stats: {
          disqualified: '500+',
          turnout: '85',
          irregularities: 'Ballot stuffing, overnight results'
        }
      },
      {
        id: '2017-election',
        type: 'election',
        year: '2017',
        position: [1, -2, -2],
        title: 'Guardian Council Vetting',
        description: 'Over 1,600 candidates disqualified before presidential election.',
        stats: {
          disqualified: '1,600',
          turnout: '73',
          irregularities: 'Pre-election disqualifications'
        }
      },
      {
        id: '2021-election',
        type: 'election',
        year: '2021',
        position: [-2, -3, 1],
        title: 'Ebrahim Raisi Election',
        description: 'Lowest turnout in history after mass disqualifications of reformists.',
        stats: {
          disqualified: '7,000+ (parliamentary)',
          turnout: '48.8',
          irregularities: 'Pre-printed ballots reported'
        }
      },
      {
        id: '1999',
        type: 'crackdown',
        year: '1999',
        position: [-3, 0, 3],
        title: 'Student Uprising Crackdown',
        description: 'Violent suppression of student protests at Tehran University.'
      },
      {
        id: '2019',
        type: 'crackdown',
        year: '2019',
        position: [0, -4, 0],
        title: 'Fuel Protests Massacre',
        description: 'Estimated 1,500 killed during internet blackout.'
      }
    ]

    const eventsWithRefs = baseEvents.map(event => ({
      ...event,
      ref: eventRefs[event.id]
    }))

    // nodes and connections are the same
    const nodes = [
      // Religious Control
      {
        label: "Guardian Council",
        position: [-2, 1.5, 0],
        color: "#8B0000",
        emissive: "#ff0000",
        textOffset: 0.5
      },
      {
        label: "Assembly of Experts",
        position: [2, 1.5, 0],
        color: "#8B0000",
        emissive: "#ff0000",
        textOffset: 0.5
      },
      // Military Control
      {
        label: "IRGC",
        position: [-3, 0, -1],
        color: "#B22222",
        emissive: "#ff4000",
        textOffset: 0.5
      },
      {
        label: "Basij Militia",
        position: [3, 0, -1],
        color: "#B22222",
        emissive: "#ff4000",
        textOffset: 0.5
      }, 
      // Judicial Control
      {
        label: "Revolutionary Courts",
        position: [-2, -1, 1],
        color: "#CD5C5C",
        emissive: "#ff6666",
        textOffset: 0.5
      },    
      // Cultural Control
      {
        label: "State Media",
        position: [0, -2, -1],
        color: "#FF6347",
        emissive: "#ff9999",
        textOffset: 0.5
      },
      {
        label: "Morality Police",
        position: [2, -1.5, 0],
        color: "#FF6347",
        emissive: "#ff9999",
        textOffset: 0.5
      }
    ]
    const connections = [
      { from: nodes[0].position, to: nodes[2].position }, // Guardian Council to IRGC
      { from: nodes[0].position, to: nodes[4].position }, // Guardian Council to Courts
      { from: nodes[1].position, to: nodes[0].position }, // Assembly to Guardian Council
      { from: nodes[2].position, to: nodes[3].position }, // IRGC to Basij
      { from: nodes[2].position, to: nodes[5].position }, // IRGC to State Media
      { from: nodes[4].position, to: nodes[6].position }  // Courts to Morality Police
    ]

    return { nodes, connections, events: eventsWithRefs }
  }, [eventRefs])

  return (
    <group ref={groupRef}>
      {/* Supreme Leader Node */}
      <mesh position={[0, 3, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color="#8B0000" 
          emissive="#ff0000"
          emissiveIntensity={0.5}
        />
        <Text  position={[0, 1.2, 0]} fontSize={0.4} color="white">
          Supreme Leader
        </Text>
      </mesh>

      {/* Control Nodes */}
      {nodes.map((node, i) => (
        <group key={`node-${i}`}>
          <mesh position={node.position}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color={node.color} emissive={node.emissive} />
            <Text position={[0, node.textOffset, 0]} fontSize={0.2} color="white">
              {node.label}
            </Text>
          </mesh>
          <Line points={[[0, 3, 0], node.position]} color="#ff5555" lineWidth={1} />
        </group>
      ))}

      {/* Historical Events */}
      {events.map((event, i) => (
        <group 
          key={`event-${i}`} 
          position={event.position}
          ref={event.ref}
          onClick={() => setActiveEvent(event)}
        >
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial 
              color={event.type === 'crackdown' ? '#ff0000' : '#ffff00'} 
              emissive={event.type === 'crackdown' ? '#ff3333' : '#ffff99'}
            />
          </mesh>
          <Text position={[0, -0.6, 0]} fontSize={0.15} color="white">
            {event.year}
          </Text>
          {activeEvent?.id === event.id && (
            <Html center>
              <div className="event-tooltip">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                {event.stats && (
                  <div className="election-stats">
                    <p><strong>Disqualified Candidates:</strong> {event.stats.disqualified}</p>
                    <p><strong>Reported Turnout:</strong> {event.stats.turnout}%</p>
                    <p><strong>Opposition Claims:</strong> {event.stats.irregularities}</p>
                  </div>
                )}
                <button onClick={(e) => { e.stopPropagation(); setActiveEvent(null) }}>
                  ×
                </button>
              </div>
            </Html>
          )}
        </group>
      ))}

      {/* Legend */}
      <Html position={[-4, -3, 0]}>
        <div className="legend">
          <div><span className="event-crackdown"></span> Political Crackdowns</div>
          <div><span className="event-election"></span> Controversial Elections</div>
          <div><span className="node-religious"></span> Religious Control</div>
          <div><span className="node-military"></span> Military Force</div>
        </div>
      </Html>
    </group>
  )
}