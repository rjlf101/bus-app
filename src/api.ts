import { TfLArrival } from './types';

const API_URL = 'https://api.tfl.gov.uk/StopPoint/490007381ZZ/arrivals';

export async function fetchBusArrivals(): Promise<TfLArrival[]> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: TfLArrival[] = await response.json();
    
    // Sort by time to station (earliest first)
    return data.sort((a, b) => a.timeToStation - b.timeToStation);
  } catch (error) {
    console.error('Error fetching bus arrivals:', error);
    throw error;
  }
}

export function formatCountdown(seconds: number): string {
  if (seconds < 60) {
    return 'Due';
  }
  
  const minutes = Math.floor(seconds / 60);
  
  if (minutes === 1) {
    return '1 min';
  }
  
  return `${minutes} mins`;
}
