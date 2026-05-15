// Home.jsx
// Main page component - simplified version

import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import NeighbourhoodGrid from '../components/NeighbourhoodGrid'
import WeatherCard from '../components/WeatherCard'
import HistoryCard from '../components/HistoryCard'

export function getTimeOfDay(hour) {
  if (hour >= 5 && hour < 12) return 'Morning'
  if (hour >= 12 && hour < 17) return 'Afternoon'
  if (hour >= 17 && hour < 21) return 'Evening'
  return 'Night'
}

// Simplified outfit algorithm
export function getOutfit(temp, rain, wind, hour) {
  const isRainy = rain >= 50
  const isWindy = wind >= 20
  const isCool = hour < 11 || hour >= 18

  if (temp >= 30) {
    return {
      top: 'T-shirt',
      bottom: 'Shorts', 
      extras: isRainy ? 'Umbrella, Sunglasses' : 'Sunglasses, Water bottle',
      isRainy
    }
  }
  
  if (temp >= 25) {
    return {
      top: 'Light T-shirt',
      bottom: 'Jeans or chinos',
      extras: isRainy ? 'Umbrella' : isWindy ? 'Light scarf' : 'Sunglasses',
      isRainy
    }
  }
  
  if (temp >= 20) {
    return {
      top: isCool ? 'Light jacket' : 'Long sleeve shirt',
      bottom: 'Jeans',
      extras: isRainy ? 'Umbrella, Rain jacket' : isWindy ? 'Scarf' : 'Light jacket for later',
      isRainy
    }
  }
  
  return {
    top: 'Sweater or hoodie',
    bottom: 'Warm trousers',
    extras: isRainy ? 'Umbrella, Heavy jacket' : 'Heavy jacket, Scarf',
    isRainy
  }
}
function Home() {
  const [checkedAreas, setCheckedAreas] = useState([])
  const [loadingArea, setLoadingArea] = useState(null)
  const [selected, setSelected] = useState(null)
  const [history, setHistory] = useState([])
  const [error, setError] = useState(null)

  // Load history on component mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const q = query(collection(db, 'outfits'), orderBy('timestamp', 'desc'))
        const snapshot = await getDocs(q)
        setHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      } catch (err) {
        console.error('Could not load history:', err)
      }
    }
    loadHistory()
  }, [])

  const handleSelect = async (place) => {
    setLoadingArea(place.name)
    setSelected(place.name)
    setError(null)

    try {
      // Fetch weather data
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}&hourly=temperature_2m,precipitation_probability,wind_speed_10m,relative_humidity_2m&forecast_days=1&timezone=Africa%2FNairobi`
      const response = await fetch(url)
      const data = await response.json()

      // Process weather data using modern array methods
      const { temperature_2m: temps, precipitation_probability: rain, wind_speed_10m: wind, relative_humidity_2m: humidity } = data.hourly
      
      const avgTemp = Math.round(temps.reduce((a, b) => a + b) / temps.length)
      const maxRain = Math.max(...rain)
      const avgWind = Math.round(wind.reduce((a, b) => a + b) / wind.length)
      const tempHigh = Math.round(Math.max(...temps) * 10) / 10
      const tempLow = Math.round(Math.min(...temps) * 10) / 10
      const avgHumidity = Math.round(humidity.reduce((a, b) => a + b) / humidity.length)

      // Get outfit recommendation
      const outfit = getOutfit(avgTemp, maxRain, avgWind, 12)

      // Create weather data object
      const weatherData = {
        neighbourhood: place.name,
        date: new Date().toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        time: new Date().toLocaleString('en-KE'),
        timestamp: new Date().toISOString(),
        tempHigh,
        tempLow,
        avgTemp,
        humidity: avgHumidity,
        wind: avgWind,
        rain: maxRain,
        ...outfit
      }

      // Update or add weather card
      const existingIndex = checkedAreas.findIndex(area => area.neighbourhood === place.name)
      if (existingIndex >= 0) {
        const updated = [...checkedAreas]
        updated[existingIndex] = weatherData
        setCheckedAreas(updated)
      } else {
        setCheckedAreas(prev => [...prev, weatherData])
      }

      // Save to Firestore and refresh history
      await addDoc(collection(db, 'outfits'), weatherData)
      const q = query(collection(db, 'outfits'), orderBy('timestamp', 'desc'))
      const snapshot = await getDocs(q)
      setHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

    } catch (fetchError) {
      console.error('Weather fetch failed:', fetchError)
      setError('Could not fetch weather. Please try again.')
    }

    setLoadingArea(null)
  }

  return (
    <div className="container">
      <h1>What Should You Wear Today?</h1>
      <p className="subtitle">Pick a Nairobi area — you can check multiple places!</p>

      <NeighbourhoodGrid
        onSelect={handleSelect}
        loadingArea={loadingArea}
        selected={selected}
      />

      {error && <p className="error">{error}</p>}

      {checkedAreas.length > 0 && (
        <div className="checked-areas">
          {checkedAreas.map((weatherData, index) => (
            <WeatherCard key={index} weather={weatherData} />
          ))}
        </div>
      )}

      <div className="history-section">
        <h2>Recent Checks</h2>
        {history.length === 0 ? (
          <p className="empty">No checks yet. Pick a neighbourhood above!</p>
        ) : (
          history.map(item => <HistoryCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  )
}

export default Home
