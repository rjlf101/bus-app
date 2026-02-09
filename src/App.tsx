import { useEffect, useState } from 'react';
import { fetchBusArrivals, formatCountdown } from './api';
import { TfLArrival, GroupedArrivals } from './types';
import './App.css';

function App() {
  const [arrivals, setArrivals] = useState<TfLArrival[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stopName, setStopName] = useState<string>('');

  const loadArrivals = async () => {
    try {
      setError(null);
      const data = await fetchBusArrivals();
      setArrivals(data);
      
      // Get stop name from first arrival
      if (data.length > 0) {
        setStopName(data[0].stationName);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load bus arrivals. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    loadArrivals();

    // Auto-refresh every 1 minute (60000ms)
    const interval = setInterval(() => {
      loadArrivals();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Group arrivals by route and limit to 3 per route
  const groupedArrivals: GroupedArrivals = arrivals.reduce((acc, arrival) => {
    const route = arrival.lineName;
    if (!acc[route]) {
      acc[route] = [];
    }
    if (acc[route].length < 3) {
      acc[route].push(arrival);
    }
    return acc;
  }, {} as GroupedArrivals);

  // Create a flat list of arrivals with route info, maintaining order
  const displayArrivals: Array<{ route: string; arrival: TfLArrival }> = [];
  
  Object.keys(groupedArrivals)
    .sort((a, b) => {
      const numA = parseInt(a);
      const numB = parseInt(b);
      
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      
      return a.localeCompare(b);
    })
    .forEach((route) => {
      groupedArrivals[route].forEach((arrival) => {
        displayArrivals.push({ route, arrival });
      });
    });

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading bus arrivals...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
        <button onClick={loadArrivals} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        {stopName && <h1>{stopName}</h1>}
      </header>

      {arrivals.length === 0 ? (
        <div className="no-arrivals">No buses expected at this stop</div>
      ) : (
        <div className="arrivals-container">
          {displayArrivals.map(({ route, arrival }) => (
            <div key={arrival.id} className="arrival-card">
              <div className="route-number">{route}</div>
              <div className="destination">{arrival.destinationName}</div>
              <div className="time-badge">{formatCountdown(arrival.timeToStation)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
