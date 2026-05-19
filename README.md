# Nairobi Outfit Checker

A web app that tells you what to wear based on the real weather in your Nairobi neighbourhood.

## What it does.

You pick a neighbourhood in Nairobi and the app fetches the current weather forecast for that area and recommends an outfit through calculating the day's hourly temperature.

## Live Demo

https://nairobi-outfit-checker.vercel.app/

## Built with

- React + Vite
- React Router
- Firebase Authentication (Google Sign-In)
- Firebase Firestore
- Open-Meteo API (free weather data)
- CSS (responsive)

## Features

- Google Sign-In
- Real weather data for 8 Nairobi neighbourhoods
- Outfit recommendations based on temperature, rain and wind
- Cloud data persistence using Firestore
- Responsive design for mobile and desktop

## Running tests

```bash
npm test
```

## Project structure

```
src/
├── components/       # Reusable UI components
├── contexts/         # Auth context
├── pages/            # Home, About, Login pages
├── _tests_/          # Test files
├── firebase.js       # Firebase config
└── Neighbourhoods.js # List of Nairobi areas
```


