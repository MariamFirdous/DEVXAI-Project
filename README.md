# RideNova Fare Estimator Demo

A clean, responsive inspired by the official [RideNova website](https://www.ridenova.in/). This project demonstrates a Hyderabad-focused ride fare estimator with transparent pricing, vehicle comparison, and a live booking-status experience.

> Important: this project uses a static dataset for all route distances, Hyderabad locations, and fare values. It is intentionally built as a demo and does not connect to a live backend or official RideNova services.

## Overview

RideNova’s positioning emphasizes:

- transparent pricing before booking
- driver-first economics
- smart routing and dispatch
- affordable mobility for Hyderabad users

This project reflects that direction by giving users a simple way to:

- select pickup and drop points in Hyderabad
- choose a ride type (Bike, Auto, or Cab)
- calculate a fare based on route distance
- compare RideNova pricing with Ola, Uber, and Rapido
- simulate a booking flow with live status updates

## Features Added

### 1. Dynamic fare estimation using a static dataset
- Pickup and drop locations are selected from a predefined Hyderabad dataset
- Distance is auto-derived from the route map instead of requiring manual user input
- Fare is calculated using a base fare plus distance-based pricing per vehicle
- All route, distance, and pricing logic is powered by a static dataset stored in the app

### 2. Hyderabad-only static dataset
- All locations are restricted to Hyderabad neighborhoods and major areas
- Route distances are stored in a static dataset file with kilometer values
- Pricing values for RideNova, Ola, Uber, and Rapido are also defined in the dataset
- This keeps the app fast, predictable, and easy to demo without a backend

### 3. Competitor comparison panel
- Compares RideNova against Ola, Uber, and Rapido
- Shows the lowest fare option for the selected trip
- Highlights the savings users receive by choosing RideNova

### 4. Booking flow and live status timeline
- Users can complete a mock booking event
- A live status timeline updates in stages
- Each timeline stage shows a user-friendly message such as:
  - Ride booked successfully! Your driver will be assigned shortly.
  - Driver assigned successfully! Your cab is on the way to your pickup location.
  - Your vehicle is on the way. Please keep your phone nearby for updates.
  - Your driver is very close. Please be ready at the pickup point.

### 5. Animation and modern UI
- Gradient background animation
- Card hover effects
- Animated result reveal
- Smooth status transitions and modern styling
- Mobile-friendly layout

## Project Structure

```text
DEVXAI - Project/
├── index.html
├── style.css
├── script.js
├── dataset.js
├── comparison.js
├── README.md
```

## Files

### index.html
Contains the layout for:
- pickup and drop locations
- vehicle selection buttons
- fare estimate section
- comparison panel
- booking status timeline

### dataset.js
Stores the complete Hyderabad route dataset and is the source of truth for the app.
- location list
- distance matrix between points
- vehicle pricing data
- service colors for comparison cards
- static fare and route values used by the UI

### comparison.js
Builds the fare comparison cards for:
- RideNova
- Ola
- Uber
- Rapido

### script.js
Handles:
- location population
- route distance lookup
- booking and fare calculation
- result rendering
- status timeline updates
- end-to-end demo flow

### style.css
Provides all visual styling and animations for a polished product feel.

## How to Run

### Option 1: Python local server
From the project folder, run:

```bash
py -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

### Option 2: VS Code Live Server
- Open the project in VS Code
- Right-click on index.html
- Select Open with Live Server

## Demo Flow

1. Choose pickup and drop in Hyderabad
2. Select a ride type
3. Click Estimate Fare
4. Review the fare and competitor comparison
5. Click Book Ride
6. Watch the live status timeline update with messages

## Notes

- The app intentionally uses static demo data instead of a backend API
- Distances, locations, and pricing are all pre-defined in a static dataset for valid Hyderabad routes
- The design mirrors RideNova’s product story: transparent pricing, operational clarity, and rider confidence
- This is a front-end prototype built for demonstration and shortlisting purposes, not a production booking system

## Inspiration

The app was designed around the official RideNova brand story and product direction, especially their emphasis on:

- affordable mobility
- transparent ride pricing
- better rider and driver experience
- Hyderabad-focused launch positioning

## Future Improvements

Possible enhancements for a stronger product prototype:

- add a driver card with ETA and vehicle details
- include booking history and rides summary
- add route map visualization
- make the comparison cards interactive
- convert static data to a JSON API for scaling

