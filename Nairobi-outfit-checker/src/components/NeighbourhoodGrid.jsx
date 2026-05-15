import { NEIGHBOURHOODS } from '../data/neighbourhoods'
function NeighbourhoodGrid({ onSelect, loadingArea, selected }) {
  return (
    <div className="neighbourhood-section">
      <p className="neighbourhood-hint">
        Pick a Nairobi area to see what to wear today
      </p>
    <div className="neighbourhood-grid">
        {NEIGHBOURHOODS.map((place) => {
         const isLoading = loadingArea === place.name
         const isSelected = selected === place.name
        return (
<button
     key={place.name}
    className={`neighbourhood-btn ${isSelected ? 'active' : ''}`}
    onClick={() => onSelect(place)}
     disabled={isLoading}
    >
    <span className="n-name">{place.name}</span>
    {isLoading && <span className="n-loading">loading...</span>}
</button>
)
 })}
 </div>
 </div>
  )
}

export default NeighbourhoodGrid
