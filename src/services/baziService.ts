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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

  try {
    const response = await fetch('https://bafe-production.up.railway.app/calculate/bazi', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullRequest),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}
