import { useEffect, useState } from 'react';
import { fetchBusArrivals, formatCountdown } from './api';
import { TfLArrival, GroupedArrivals } from './types';
import './App.css';

function App() {
  const [arrivals, setArrivals] = useState<TfLArrival[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [stopName, setStopName] = useState<string>('');

  const loadArrivals = async () => {
    try {
      setError(null);
      const data = await fetchBusArrivals();
      setArrivals(data);
      setLastUpdate(new Date());
      
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

  // Group arrivals by route
  const groupedArrivals: GroupedArrivals = arrivals.reduce((acc, arrival) => {
    const route = arrival.lineName;
    if (!acc[route]) {
      acc[route] = [];
    }
    acc[route].push(arrival);
    return acc;
  }, {} as GroupedArrivals);

  // Sort routes numerically/alphabetically
  const sortedRoutes = Object.keys(groupedArrivals).sort((a, b) => {
    const numA = parseInt(a);
    const numB = parseInt(b);
    
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    
    return a.localeCompare(b);
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
        <h1>Bus Arrivals</h1>
        {stopName && <h2 className="stop-name">{stopName}</h2>}
        {lastUpdate && (
          <p className="last-update">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        )}
      </header>

      {arrivals.length === 0 ? (
        <div className="no-arrivals">No buses expected at this stop</div>
      ) : (
        <div className="arrivals-container">
          {sortedRoutes.map((route) => (
            <div key={route} className="route-group">
              <div className="route-header">
                <span className="route-number">{route}</span>
              </div>
              <div className="arrivals-list">
                {groupedArrivals[route].slice(0, 3).map((arrival) => (
                  <div key={arrival.id} className="arrival-item">
                    <div className="arrival-destination">
                      {arrival.destinationName}
                    </div>
                    <div className="arrival-time">
                      {formatCountdown(arrival.timeToStation)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
