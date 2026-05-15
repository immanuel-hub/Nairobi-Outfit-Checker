
function WeatherButton({ onClick, loading }) {
  return (
    <button 
      onClick={onClick}
      disabled={loading}
      className="weather-btn">
      {loading ? 'Loading...' : 'Check Nairobi Weather'}
    </button>
  )
}
export default WeatherButton
