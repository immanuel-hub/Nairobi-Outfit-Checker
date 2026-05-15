// About.jsx
// Information page explaining what the app does and how it was built

function About() {
  return (
    <div className="container">
      <h1>About This App</h1>

      <p>
        Nairobi Outfit Checker helps you decide what to wear before heading out.
        Just pick the area of Nairobi you are going to and the app will show you
        outfit recommendations based on the real weather forecast for that area.
      </p>

      <p>You can check multiple areas at once — useful when you have errands in different parts of the city.</p>

      <p>Built with:</p>

      <ul className="about-list">
        <li>React + Vite — for building the user interface</li>
        <li>React Router — for navigating between pages</li>
        <li>Firebase Firestore — for saving outfit checks to the cloud</li>
        <li>Open-Meteo API — for free live weather data</li>
        <li>Responsive CSS — so it works on phones and desktops</li>
      </ul>

      <p>
        Every check is saved to a cloud database — not localStorage — so your
        history is there even after you close the browser or switch devices.
      </p>
    </div>
  )
}

export default About
