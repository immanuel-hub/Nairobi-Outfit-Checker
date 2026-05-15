// WeatherCard.jsx
// Component that displays weather information and outfit recommendations

function WeatherCard({ weather }) {
  return (
    <div className="card">
      <h2>{weather.neighbourhood}</h2>
      <p className="temp">{weather.avgTemp}°C</p>
      
      <div className="outfit">
        <div className="outfit-item">
          <span className="outfit-label">Top:</span>
          <span className="outfit-value">{weather.top}</span>
        </div>
        <div className="outfit-item">
          <span className="outfit-label">Bottom:</span>
          <span className="outfit-value">{weather.bottom}</span>
        </div>
        <div className="outfit-item">
          <span className="outfit-label">Extras:</span>
          <span className="outfit-value">{weather.extras}</span>
        </div>
      </div>
      
      {weather.isRainy && <p className="rain">Rain likely - carry umbrella!</p>}
    </div>
  )
}

export default WeatherCard
