export interface TfLArrival {
  id: string;
  operationType: number;
  vehicleId: string;
  naptanId: string;
  stationName: string;
  lineId: string;
  lineName: string;
  platformName: string;
  direction: string;
  bearing: string;
  destinationNaptanId: string;
  destinationName: string;
  timestamp: string;
  timeToStation: number;
  currentLocation: string;
  towards: string;
  expectedArrival: string;
  timeToLive: string;
  modeName: string;
  timing: {
    countdownServerAdjustment: string;
    source: string;
    insert: string;
    read: string;
    sent: string;
    received: string;
  };
}

export interface GroupedArrivals {
  [route: string]: TfLArrival[];
}
