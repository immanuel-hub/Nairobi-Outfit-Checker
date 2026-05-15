function HistoryCard({ item }) {
  return (
 <div className="history-card">
    <div className="history-left">
    <p className="history-neighbourhood">{item.neighbourhood}</p>
    <small>{item.date}</small>
 </div>

 <div className="history-middle">
    <span className="temp-high">{item.tempHigh}°C</span>
    <span className="temp-low"> {item.tempLow}°C</span>
    {item.isRainy && <span className="rain-tag">Rain</span>}
  </div>

  <small className="history-time">{item.time}</small>
  </div>
  )
}

export default HistoryCard
