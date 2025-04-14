import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router'
import Home from './components/Home'
import MexicoTab from './components/MexicoTab'
import IranTab from './components/IranTab'
import ComparisonTab from './components/ComparisonTab'
import './App.css'

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="tab-nav">
          <NavLink to="/" end className={({isActive}) => isActive ? 'tab-button active' : 'tab-button'}>
            Home
          </NavLink>
          <NavLink to="/mexico" className={({isActive}) => isActive ? 'tab-button active' : 'tab-button'}>
            Mexico
          </NavLink>
          <NavLink to="/iran" className={({isActive}) => isActive ? 'tab-button active' : 'tab-button'}>
            Iran
          </NavLink>
          <NavLink to="/comparison" className={({isActive}) => isActive ? 'tab-button active' : 'tab-button'}>
            Comparison
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mexico" element={<MexicoTab />} />
          <Route path="/iran" element={<IranTab />} />
          <Route path="/comparison" element={<ComparisonTab />} />
        </Routes>
      </div>
    </Router>
  )
}