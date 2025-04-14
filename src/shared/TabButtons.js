export default function TabButtons({ activeTab, setActiveTab }) {
  return (
    <div className="tab-buttons">
      <button 
        className={`tab-button ${activeTab === 'mexico' ? 'active' : ''}`}
        onClick={() => setActiveTab('mexico')}
      >
        Mexico
      </button>
      <button 
        className={`tab-button ${activeTab === 'iran' ? 'active' : ''}`}
        onClick={() => setActiveTab('iran')}
      >
        Iran
      </button>
      <button 
        className={`tab-button ${activeTab === 'comparison' ? 'active' : ''}`}
        onClick={() => setActiveTab('comparison')}
      >
        Culture Comparison
      </button>
    </div>
  )
}