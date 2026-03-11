import { BaziRequest, BaziResponse } from '../types';

export async function fetchBaziData(request: BaziRequest): Promise<BaziResponse> {
  const fullRequest = {
    tz: "Europe/Berlin",
    lon: 13.405,
    lat: 52.52,
    standard: ["CIVIL"],
    boundary: ["midnight"],
    ambiguousTime: ["earlier"],
    nonexistentTime: ["error"],
    ...request
  };

  const response = await fetch('https://bafe-production.up.railway.app/calculate/bazi', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fullRequest),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Bazi data');
  }

  return await response.json();
}
