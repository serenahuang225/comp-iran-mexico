import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className='welcome-message'>
      <div className="welcome-content">
        <h1>Political Systems Explorer</h1>
        <p>
          Hello there! Thanks for stopping by at my website. This is an 
          interactive visualization that displays and compares the political structures
          and cultures of Mexico and Iran. Use the tabs above to explore each country's
          system individually or how they compare. Hope you enjoy!
        </p>
        <div className="features"
          style={{marginBottom: '2rem'}}>
          <h3>Features:</h3>
          <ul>
            <li>3D models of government structures</li>
            <li>Political culture visualizations</li>
            <li>Side-by-side comparisons</li>
          </ul>
        </div>

        <a
          className={`tab-button`}
          target="_blank" rel="noopener noreferrer"
          href='https://github.com/serenahuang225/comp-iran-mexico'
        >
          view code on github  <FaGithub />
        </a>

        <p style={{marginTop: '1rem', fontSize: '1rem'}}>made with ❤️ by serena :)</p>

      </div>
    </div>
  )
}
